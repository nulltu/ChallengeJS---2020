const User = require('../models/userModel');

//Create and save new user
exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    
    User.create(user, (err, data) => {
        if(err)
            res.status(500).send({
                message: 
                err.message || "Some error occurred while retrieving user"
            });
            else res.send(data);
        })
    
}

