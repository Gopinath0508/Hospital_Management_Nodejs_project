const mongoose=require('mongoose');
const{v4:uuidv4}=require('uuid');
const uuid=uuidv4;
console.log(uuid);
const userSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:uuid
    },
    name:{
        type:String
    },
    phoneno:
    {
        type:Number
    },
    Address:
    {
        type:String
    },
    Shifttime:{
        type:String      
    },
    Doctor_id:
    {
        type:String
    },
    active:{
        type:Boolean,
        default:true
    }
})

const Nurse= mongoose.model('Nurse',userSchema);
module.exports=Nurse;