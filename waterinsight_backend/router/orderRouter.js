const express = require('express')
const Order = require('../database/models/Order');
const Ecoli = require("../database/models/ecoli");
const DeviceData = require("../database/models/devicedata");
const Satellite = require("../database/models/Satellite");
const auth = require('../middleware/auth')
const nodemailer = require("nodemailer")
const fs = require("fs");
const router = new express.Router()

router.post('/create',auth, async (req,res) => {
    // const { startDate, endDate } = req.body;
    // const startDateISO = new Date(startDate).toISOString();
    // const endDateISO = new Date(endDate).toISOString();
    // const items = await Contributions.find({ Date: { $gte: startDateISO, $lte: endDateISO }, DataType:req.body.dataType });
    // const amount = 10;
    
    try {
        const order = new Order({
          ...req.body,
          owner:req.user._id

      });
        await order.save();
        res.status(201).send({
            status_code:200,
            message:"Order Saved",
            orderId:order.id
        })
    }
    catch(e) {
        console.log(e);
        res.status(500).send({
            status_code:500,
            message:"DataBase Error"
        })
    }
})



router.post('/orders',auth,  async (req, res) => {
    try {
      await req.user.populate('orders');
      res.send({
        status_code: 200,
        data: req.user.orders,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

router.post('/updatestatus/:id',auth,async (req,res) => {
  const {id} = req.params;
  const updates = Object.keys(req.body)
  const allowedUpdates = ['orderStatus']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  
  if(!isValidOperation) {
    return res.status(400).send({
      status_code:400,
      message:"Invalid updates, only orderStatus field is allowed to update"
    })
  }
  const {orderStatus} = req.body;

  try {
    const order = await Order.findByIdAndUpdate(id, { orderStatus });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order status updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }


})

// not finished yet 
router.post('/sendEmail/:id', async (req, res) => {
  try {
    var resultData;
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      port: 465,               // true for 465, false for other ports
      host: "smtp.gmail.com",
        auth: {
              user: 'testmailpush2@gmail.com',
              pass: 'uoroiynjwtwyjwfx',
          },
      secure: true,
      });
      const order = await Order.findById(req.params.id);
   
      if(order.orderStatus == 'paid'){
        if(order.dataType == 'ecoli'){
       
           resultData = await Ecoli.find({
            Date: {$gte: order.startDate, $lte:order.endDate}
          });
         

        }
        else if(order.dataType == 'satellite'){
           resultData = await Satellite.find({
            Date: {$gte: startDate, $lte:endDate}
          });

        }
        else if(order.dataType == 'devicedata'){
           resultData = await DeviceData.find({
            Date: {$gte: startDate, $lte:endDate}
          });

        }
      }
      
   
      if(!resultData) {
        res.status(404).send({
          status:404,
          message:"No Data between these dates!!!"
        })
      }

    
    const filename = 'data.json';

    fs.writeFileSync(filename, JSON.stringify(resultData));
    console.log(resultData)

    const mailOptions = {
      from: 'testmailpush2@gmail.com',
      to: 'testmailpush2@gmail.com',
      subject: 'JSON File Attachment',
      text: 'Please find the attached JSON file.',
      attachments: [{
        filename: filename,
        path: filename
      }]
    };

    await transporter.sendMail(mailOptions);

    // fs.unlinkSync(filename);

    res.status(200).send('Email sent successfully!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error sending email.');
  }
});



module.exports = router