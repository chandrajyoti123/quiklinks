import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import Link from "./Models/Links.js"

dotenv.config()
const app=express()
app.use(express.json())
const connectMongoDB= async()=>{
    const response=await mongoose.connect(process.env.MONGODB_URI)
    if(response){
        console.log('mongo db connected sucessfully')
    }
}
connectMongoDB();
app.post('/links',async(req ,res)=>{
   const {url,slug}=req.body
   const newlink=new Link({
    url:url,
    slug:slug
   })
   try{
    const savedlink=await newlink.save()

    res.json({
        sucess:true,
        Link:savedlink,
        message:"url added successfully"
        
    })
   }
   catch(err){
    res.json({
        sucess:false,
        message:err.message
    })
   }

})

const PORT=5000
app.listen(PORT,()=>{
       console.log(`server runing in port ${PORT}`)

})