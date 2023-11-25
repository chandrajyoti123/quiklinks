import { Schema,model } from "mongoose";
const linkschma=new Schema({
    url:{
        type:"String",
        required:true,
        
    },
    slug:{
        type:"String",
        
    }
}
,{
    timestamps:true
})

const Link=model('Link',linkschma)
export default Link;