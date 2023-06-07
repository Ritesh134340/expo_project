const { Router } = require("express");
const users = Router();
const User = require("../models/user.model");



users.post("/",async(req,res)=>{
   try{
      const {name,email,bio}=req.body
      const check=await User.findOne({email:email})
      if(check){
         res.status(409).send({mesg:"User already exists !"})
      }
      else{
        
         const newUser=new User({name:name,email:email,bio:bio})
         await newUser.save()

         res.status(200).send({mesg:"User created successfully !"})
      }
     
   }
   catch(err){
      console.log("Error from create user route Error is :",err)
      res.status(500).send({mesg:"Internal server error !"})
   }
  
})


users.get("/",async(req,res)=>{
    try{
      const usersDocument=await User.find({})
      res.status(200).send({mesg:"Ok",usersDocument:usersDocument})
    }
    catch(err){
      console.log("Error from get all user route Error is :",err)
      res.status(500).send({mesg:"Internal server error !"})
    }
})


users.get("/:id",async(req,res)=>{
   try{
      const userData=await User.findOne({_id:req.params.id})
      res.status(200).send({mesg:"Ok",userData:userData})

   }
   catch(err){
     console.log("Error from get user by id route Error is :",err)
     res.status(500).send({mesg:"Internal server error !"})
   }
})

users.put("/:id",async(req,res)=>{
   try{
      await User.findOneAndUpdate({_id:req.params.id},req.body);
      res.status(200).send({mesg:"User updated successfully !"})
   }
   catch(err){
     console.log("Error from update user route Error is :",err)
     res.status(500).send({mesg:"Internal server error !"})
   }
})

users.delete("/:id",async(req,res)=>{
   try{
       await User.findOneAndDelete({_id:req.params.id})
       res.status(200).send({mesg:"User deleted successfully !"})
   }
   catch(err){
     console.log("Error from get delete user route Error is :",err)
     res.status(500).send({mesg:"Internal server error !"})
   }
})









module.exports = users;

