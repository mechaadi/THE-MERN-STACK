const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


//VALIDATION



require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true}).then((val)=>{
    console.log("done");
}).catch((e)=>{
    console.log(e);
});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connected");
});

const exerciseRouter = require('./routes/exercise')
const userRouter = require('./routes/users')
const register = require('./routes/auth')

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);
app.use('/register', register);

app.listen(port, ()=>{
    console.log(`server is running on port : ${port}`);
});