const mongoose =  require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('MongoDb is sucessfully connected with Node.js')
}).catch((error)=>{
    console.log(error)
})