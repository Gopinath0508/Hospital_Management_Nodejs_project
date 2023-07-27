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
   
    Isues:{
        type:String      
    },
    Doctor_id:
    {
        type:String
    },
    Nurse_id:
    {
        type:String
    },
    active:
    {
        type:Boolean,
        default:true
    }
})
const Patent= mongoose.model('Patent',userSchema);
module.exports=Patent;