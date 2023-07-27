const {tokenValidator}=require("./token")
const authverify=async(req,res,next)=>{
    //const {jwt}=req.cookie;
    const valid=await tokenValidator(req);
    if(valid){
        next();
    }
    else{
        res.send("Access Denide");
    }
}
module.exports= {
    authverify 
}

