const db = require('../app/models');
// const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username already exists",
            });
            return
        }

        //email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }
            next();
        });
    });
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail:checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp