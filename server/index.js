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
   const randomSlug = Math.random().toString(36).substring(2, 7);
   const newlink=new Link({
    url:url,
    slug:slug || randomSlug
   })
   
   
   
   try{
         const savedlink=await newlink.save()

return res.json({
        sucess:true,
        Link:{
            url:savedlink.url,
            slug:savedlink.slug,
            link:`${process.env.BASE_URL}/${savedlink.slug}`

        },
        message:"url added successfully"
        
    })
   }
   catch(err){
   return res.json({
        sucess:false,
        message:err.message
    })
   }

})
app.get("/:slug", async (req, res) => {
    const { slug } = req.params;
    const link = await Link.findOne({ slug: slug });
    await Link.updateOne({slug:slug},{$set:{
        clicks:link.clicks+1
    }})
       if (!link) {
        return res.json({
            success: false,
            message: "Link not found"
        })
    }
    res.redirect(link.url);
    
})
app.get('/api/links',async(req,res)=>{

 
        const links = await Link.find({});
    
     res.json({
            success: true,
            data: links
        })


})

const PORT=5000
app.listen(PORT,()=>{
         console.log(`server runing in port ${PORT}`)

})