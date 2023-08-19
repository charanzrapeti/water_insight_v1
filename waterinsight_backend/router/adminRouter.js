const express = require('express');
const router = express.Router();
const  User  = require('../database/models/User');
const  Ecoli  = require('../database/models/ecoli');
const  DeviceData  = require('../database/models/devicedata');
const Contributions = require("../database/models/Contributions");
const Device = require('../database/models/Device');
const Payment = require("../database/models/Payments");
const Satellite = require("../database/models/Satellite.js");
const auth = require("../middleware/auth")
const crypto = require('crypto');
const mongoose = require("mongoose");


router.post('/device/config', async (req, res) => {
  try {
    // Check if user is admin
    // if (req.user.role !== 'admin') {
    //   return res.status(400).send('You need to be admin to access this route.');
    // }

    // Find user by email
    const user = await User.findOne({ email: req.body.email });

    // Check if user exists
    if (!user) {
      return res.status(400).send('User with this email does not exist.');
    }

    const { deviceId, country, state, testingAreaType, email } = req.body;
    // Validate request body
    if (!deviceId || !country || !state || !testingAreaType || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create new device with owner set to user's _id
    const device = new Device({
      ...req.body,
    });

    // Save device
    await device.save();

    // Send success response
    res.status(201).send({
      status_code: 200,
      message: "Successfully saved the device configuration."
    });
  } catch (e) {
    // Handle error
    res.status(500).send({
      status_code: 500,
      message: "Database error."
    });
  }
});



router.post('/computeHash', auth, async (req, res) => {
  // Get user by ID
  const user = await User.findById(req.user._id);

  // Check if user is admin
  if (user.role !== 'admin') {
    return res.status(400).send('You need to be admin to access this route.');
  }
  const { startDate, endDate, dataType } = req.body;
  const startDateISO = new Date(startDate).toISOString();
  const endDateISO = new Date(endDate).toISOString();
  const verifyId = Math.floor(Math.random() * 9000) + 1000;

  try {
    let records, finalHash;
    if (dataType === 'ecoli') {
      records = await Ecoli.find({ Date: { $gte: startDateISO, $lte: endDateISO }, verifyId: { $exists : false} });
      const hashes = records.map((record) => record.hash);
      finalHash = crypto.createHash('sha256').update(hashes.join('')).digest('hex');
    } else if (dataType === 'devicedata') {
      records = await DeviceData.find({ Date: { $gte: startDateISO, $lte: endDateISO }, verifyId: { $exists : false} });
      const hashes = records.map((record) => record.hash);
      finalHash = crypto.createHash('sha256').update(hashes.join('')).digest('hex');
    }
    else if(dataType === 'satellite') {
      records = await Satellite.find({startDate:{$gte:startDateISO, $lte:endDateISO}, verifyId:{$exists:false}});
      console.log(records);
      
      finalHash = crypto.createHash('sha256').update(JSON.stringify(records)).digest('hex');
    } else {
      return res.status(400).send('Invalid dataType');
    }

    if(!records.length){
      return res.status(200).send({
        status_code:200,
        message:"No Pending Records Found to hash in this period of time"
      })
    }

    // Update all matching records with the generated verifyId
    if (dataType === 'ecoli') {
      await Ecoli.updateMany(
        { Date: { $gte: startDateISO, $lte: endDateISO }, verifyId: { $exists: false } },
        { $set: { verifyId: verifyId } }
      );
    } else if (dataType === 'devicedata') {
      await DeviceData.updateMany(
        { Date: { $gte: startDateISO, $lte: endDateISO }, verifyId: { $exists: false } },
        { $set: { verifyId: verifyId } }
      );
    } else if (dataType === 'satellite') {
      await Satellite.updateMany(
        { startDate: { $gte: startDateISO, $lte: endDateISO }, verifyId: { $exists: false } },
        { $set: { verifyId: verifyId } }
      );
    }

    return res.status(200).send({ hash: finalHash, verifyId , Total:records.length});
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});



router.post('/verify/:verifyId', auth,  async (req, res) => {
  try {
        // Get user by ID
  const user = await User.findById(req.user._id);

  // Check if user is admin
  if (user.role !== 'admin') {
    return res.status(400).send('You need to be admin to access this route.');
  }
    const {  dataType } = req.body;
    let Records, FinalHash;
  
    const verifyIdString = req.params.verifyId.toString();
    if(dataType == 'ecoli'){
      // Compute final hash for Ecoli schema
      Records = await Ecoli.find({ verifyId: verifyIdString });
      const Hashes = Records.map((record) => record.hash);
      FinalHash = crypto.createHash('sha256').update(Hashes.join('')).digest('hex');
    }
    else if(dataType == 'devicedata'){
       // Compute final hash for DeviceData schema
      Records = await DeviceData.find({ verifyId: verifyIdString });
      const Hashes = Records.map((record) => record.hash);
      FinalHash = crypto.createHash('sha256').update(Hashes.join('')).digest('hex');
    }
    else if(dataType == 'satellite'){
       // Compute final hash for DeviceData schema
        Records = await Satellite.find({ verifyId: verifyIdString });
        console.log(Records)
       
        FinalHash = crypto.createHash('sha256').update(JSON.stringify(Records)).digest('hex');
    }
    else {
      return res.status(400).send('Invalid dataType'); 
    }

   
    console.log( Records.length,FinalHash)
    if(!Records.length){
      return res.status(400).send({
        status_code:400,
        message:"No Records found with this verification ID"
      })
    }
    
    // Compare final hashes with the provided hashes in the request body
    return res.status(200).send({ hash: FinalHash, verifyId:verifyIdString , Total:Records.length});
   
    
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }


  });


  
  router.post('/payContributor', async (req, res) => {
    const { startDate, endDate } = req.body;
    const startDateISO = new Date(startDate).toISOString();
    const endDateISO = new Date(endDate).toISOString();
    const paymentMap = {
      ecoli: 10,
      devicedata: 5,
    };
    
    
    const contributions = await Contributions.find({ Date: { $gte: startDateISO, $lte: endDateISO }, paymentId: { $exists : false} });

    // console.log(contributions);
    if(contributions.length === 0) {
      return res.status(200).send({
        status_code:200,
        message:"No Payments are pending in this Date Range"
      })
    }
    //console.log(contributions);

    
    // group the objects by email and dataType
    const groupedData = contributions.reduce((result, current) => {
      const email = current.email;
      const dataType = current.DataType;
    
      if (!result[email]) {
        result[email] = { contributions: [] };
      }
    
      result[email].contributions.push(JSON.stringify(current));
    
      if (!result[email][dataType]) {
        result[email][dataType] = 0;
      }
    
      result[email][dataType]++;
      
      return result;
    }, {});
  
    
  try {
    for(const email in groupedData) {
    
      
      let paymentAmount = 0;
      let paymentId = Math.floor(Math.random() * 100000000) + 1;
    const {contributions, ... dataTypes} = groupedData[email];
    for(const dataType in dataTypes) {
      paymentAmount += groupedData[email][dataType] * paymentMap[dataType]
    }
    const new_payment = new Payment({
      paymentId,
      email,
      paymentAmount,
      DateOfPayment:Date.now()

    })
    await new_payment.save()

    for(const item of contributions){
      const contribution_id = JSON.parse(item)._id;
      const contribution = await Contributions.findById(contribution_id);
      contribution.paymentId = paymentId;
      await contribution.save(); 

    }
    

  }
  res.send({
    status_code:200,
    message:"Payments Updated Succesfully"
  })
  }
  catch(err) {
    console.log(err);
    res.status(500).send({
      status_code:500,
      message:"Server Error"
    })
  }


  });
  

  router.post('/devices', async (req, res) => {
    const { deviceId, country, state, testingAreaType, email } = req.body;
    try {
      // Validate request body
      if (!deviceId || !country || !state || !testingAreaType || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      // Create new device
      const device = new Device({ deviceId, country, state, testingAreaType, email });
      await device.save();
      res.status(201).json({ message: 'Device created successfully', device });
    } catch (err) {
      console.error(err.message);
      if (err.code === 11000) {
        return res.status(400).json({ message: 'Device already exists' });
      }
      res.status(500).json({ message: 'Server Error' });
    }
  });
  



module.exports = router;
