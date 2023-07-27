const jwt =require('jsonwebtoken'); 
const dotenv=require('dotenv')
dotenv.config()
const tokenGenerator=(Name)=>{
    try {
        const payload={userName:Name}
        const token=jwt.sign(payload,process.env.JWT_KEY,{expiresIn:"45 minutes"})
        return token;
    } catch (error) {
        res.send(error)
    }
}
const tokenValidator=(token)=>{
    const data=jwt.verify(token,process.env.JWT_KEY);
    return data;
}
module.exports={
    tokenGenerator,
    tokenValidator
}
