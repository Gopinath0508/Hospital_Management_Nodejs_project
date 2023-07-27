const mongoose=require('mongoose');
const {v4:uuidv4}=require('uuid');
const uuid=uuidv4;
const userSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:uuid
    },
    admin_Id:{
        type:String
    },
    active:{
        type:Boolean,
        default:true
    },
    admin_Token:{
        type:String
    }
})
const Token=mongoose.model('Token',userSchema);
module.exports=Token;