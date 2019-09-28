const router = require('express').Router();


router.post('/', (req, res)=>{
    res.send("Register");
})

module.exports = router