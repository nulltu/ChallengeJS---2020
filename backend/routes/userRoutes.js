module.exports = app => {
    const users = require('../controllers/userController')

    //create a new user
    app.post("/users", users.create);

}