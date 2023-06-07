const { Router } = require("express");
const posts = Router();
const Post = require("../models/post.model");
const User = require("../models/user.model");

posts.get("/",async(req,res)=>{
    try{
       const postsDocument=await Post.find({})
    
       res.status(200).send({mesg:"ok",postsDocument:postsDocument})
    }
    catch(err){
        console.log("Error from get post route Error is :",err)
        res.status(500).send({mesg:"Internal server error !"})
    }
 
})

posts.post("/",async(req,res)=>{
    try{
        const {email,content}=req.body;

        const document=await User.findOne({email:email})

        if(!document){
         res.status(404).send({mesg:"User not found, please signup !"})
        }
        else{
            const payload={
               user_id:document._id,
               content:content,

            }

            const newPost=new Post(payload);
            await newPost.save()

            res.status(200).send({mesg:"Post created successfully !"})
        }
    
    }
    catch(err){
        console.log("Error from create post route Error is :",err)
        res.status(500).send({mesg:"Internal server error !"})
    }
 
})



posts.get("/:id",async(req,res)=>{

    try{
        const postData=await Post.findOne({_id:req.params.id});

        const userData=await User.findOne({_id:postData.user_id})

        res.status(200).send({mesg:`Get post by id and id is ${req.params.id}`,postData:postData,userData:userData})
    }
    catch(err){
        console.log("Error from get post by id route Error is :",err)
        res.status(500).send({mesg:"Internal server error !"})
    }
})




posts.put("/:id",async(req,res)=>{ 
    try{
        await Post.findOneAndUpdate({_id:req.params.id},req.body)
        res.status(200).send({mesg:"Updated successfully !"})
    }
    catch(err){
        console.log("Error from update post route Error is :",err)
        res.status(500).send({mesg:"Internal server error !"}) 
    }
   
})

posts.delete("/:id",async(req,res)=>{
    try{
        await Post.findOneAndDelete({_id:req.params.id})

        res.status(200).send({mesg:"Post deleted successfully !"})
    }
    catch(err){
        console.log("Error from delete post route Error is :",err)
        res.status(500).send({mesg:"Internal server error !"}) 
    }
   
    
})



posts.post("/:id/like",async(req,res)=>{
 
 
    try{
        await Post.findOneAndUpdate({_id:req.params.id},{likes:req.body.currentLikes})

        res.status(200).send({mesg:"Increment like count"})
    }
    catch(err){
        console.log("Error from like post route Error is :",err)
        res.status(500).send({mesg:"Internal server error !"})  
    }
})

posts.post("/:id/unlike",async(req,res)=>{

   
    try{
        await Post.findOneAndUpdate({_id:req.params.id},{likes:req.body.currentLikes})
        res.status(200).send({mesg:`Decrement like count, id is ${req.params.id}`})
    }
    catch(err){
        console.log("Error from unlike post route Error is :",err)
        res.status(500).send({mesg:"Internal server error !"}) 
    }
})




module.exports = posts;
