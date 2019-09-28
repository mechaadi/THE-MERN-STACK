const router = require('express').Router();

const joi = require('@hapi/joi');



let User = require('../models/user.model');

router.route('/').get((req, res)=>{
    // sending a get request using the model class user.model
    User.find()
    .then(users=>res.json(users))
    .catch(err=>res.status(400).json('Error: '+err));
});


router.route('/add').post((req, res)=>{
    const schema = {
        username : joi.string().min(6).required(),
        email : joi.string().min(6).required().email(),
        firstname: joi.string().min(3).required(),
        lastname : joi.string().min(3).required(),
        password : joi.string().min(6).required(),
    }
    
    // req.body.username from rest api
    const { error } = joi.validate(req.body, schema);
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password
    //creating the user model here.
    const newUser = new User({username, firstname, lastname, password, email});

    // saving the user to db
    newUser.save()
    .then(()=>res.json('User added'))
    .catch(err=>res.status(400).json('Error: '+err));
});

module.exports = router;

