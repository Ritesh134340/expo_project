const {Router}=require("express");
const analytics=Router();
const User=require("../models/user.model")
const Post=require("../models/post.model")


analytics.get("/users",async(req,res)=>{
  try{
    const userDocument=await User.find({})

    const totalUsers=userDocument.length;
    res.status(200).send({mesg:"Ok",total:totalUsers})
  }
  catch(err){
    console.log("Error from user analytics route Error is :",err)
    res.status(500).send({mesg:"Internal server error !"})
  }
})


analytics.get("/users/top-active",async(req,res)=>{
    
    try{
      
      const activeUsers=await Post.aggregate([
  {
    $group: {
      _id: "$user_id",
      count: { $sum: 1 }
    }
  },
  {
    $sort: {
      count: -1
    }
  },
  {
    $limit: 5
  }
]);

res.status(200).send({mesg:"Ok",active:activeUsers})
    }
    catch(err){
      console.log("Error from user analytics route Error is :",err)
      res.status(500).send({mesg:"Internal server error !"})
    }
})


analytics.get("/posts",async(req,res)=>{
 
  try{
    const postDocument=await Post.find({})
    const documentLength=postDocument.length;
    res.status(200).send({mesg:"Ok",total:documentLength})
  }
  catch(err){
    console.log("Error from post analytics route Error is :",err)
    res.status(500).send({mesg:"Internal server error !"})
  }
})


analytics.get("/posts/top-liked",async(req,res)=>{
 
  try{
    const result = await Post.find()
    .sort({ likes: -1 })
    .limit(5)
    .exec();
  
    res.status(200).send({mesg:"Ok",topLiked:result})
  }
  catch(err){
    console.log("Error from post analytics route Error is :",err)
    res.status(500).send({mesg:"Internal server error !"})
  }
})


module.exports=analytics;