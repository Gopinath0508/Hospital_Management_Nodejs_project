const mongoose=require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>
{
    console.log('Connected to MongoDB');
})
.catch((error)=>
{
    console.error('Failed to connect to Mongodb', error);
});
module.exports=mongoose.connection;