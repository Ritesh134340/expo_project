const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
 name:{type:String,minlength: 1, maxlength:50},
 email:{type:String,required:true,unique:true},
 bio:{type:String,maxlength:200},
},{timestamps:true})

const User=mongoose.model("user",userSchema);

module.exports=User;