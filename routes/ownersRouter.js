const express = require("express");
const router = express.Router();
const ownerModel=require("../model/owners-model");
router.get('/',(req,res)=>{
    res.send("Hey its working");
});

if(process.env.NODE_ENV === 'development')
{
router.post('/create',async (req,res)=>{
    let owners=await ownerModel.find();
    if(owners.length>0) return res.status(503).send("You Don't have permission to create a new owner");
    let {fullname,email,password}=req.body;
    await ownerModel.create({
        fullname,
        email,
        password,
    });
    res.status(201).send("createdOwner");
});
}

module.exports = router;
