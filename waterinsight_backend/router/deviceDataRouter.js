const path = require("path");
require("dotenv").config({path: path.resolve(__dirname,'../config/.env')});
const fs = require("fs");
const {Router} = require('express');
const axios = require("axios");
const ImageDB = require("../database/models/devicedata");
const refreshMail = require("../helpers/getMail.js");
const auth = require("../middleware/auth")

const router = new Router();

router.post("/refresh/:email",   async (req,res) => {
  const email = req.params.email;
  await refreshMail(email);
  res.status(201).send({
    status_code: 201,
    message: "Succesfully Updated ImageDB"
  });

})

router.post("/results",  async (req,res) => {
  var count = 0;
  const imgDir = process.env.IMAGES_DIR
  const imgPaths = await fs.promises.readdir(imgDir);
  let responseData = []
  for (const imgPath of imgPaths) {
    const data = JSON.stringify({ img_path: imgDir + imgPath });
    const mlConfig = {
      method: "post",
      url: process.env.PYTHON_SERVER_URL,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
   

    try {
      const response = await axios(mlConfig);
      const imageDetails = await ImageDB.findOne({ fileName: imgPath });
      
      if (!imageDetails) {
        console.log(imgPath)
        console.log("No Data, Please Refresh");
        continue;
        
      }
    
      
      imageDetails.K_mean_RG = response.data["K_mean_RG"];
      imageDetails.CDOM = response.data["CDOM"];
      imageDetails.SD = response.data["SD"];
      imageDetails.TSM = response.data["TSM"];
      imageDetails.Turb = response.data["Turb"];
      imageDetails.cdom_ratio = response.data["cdom_ratio"]
      await imageDetails.save();
      // // console.log(response.data["Secchi_Depth"], response.data["Turbidity"])
 
      const updatedDetails = {
        ...imageDetails.toObject(),
        // ...{
        //   K_mean_RG: response.data["K_mean_RG"],
        //   Secchi_Depth: response.data["Secchi_Depth"],
        //   Turbidity: response.data["Turbidity"],
        // },
      };
      responseData.push(updatedDetails);
      
      // // console.log(`Processed image: ${imgPath}`);
     
    } catch (error) {
    
      // res.status(400).send({
      //   status_code:400,
      //   message:`Error processing image ${imgPath}: ${error}`
      // })
      // console.log(`Error processing image ${imgPath}: ${error}`);
 
      continue 
    }
    
  }
  res.status(201).send({
    status_code:201,
    data:responseData
  })
})

router.post("/getresults", async (req,res) => {
  try {
    const data = await ImageDB.find({});
    res.status(200).send({data})
  } catch (error) {
    res.status(500).send("Error" + error)
  }
})

module.exports = router;


// email: igcatisb@gmail.com