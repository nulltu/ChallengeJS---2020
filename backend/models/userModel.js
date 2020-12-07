const sql = require('./db');

//constructor
const User = function(user){
    this.email = user.email;
    this.password = user.password;
};

/*-------------------- querys SQL ------------------------*/

User.create = (newUser, result) => {
    sql.query("INSERT INTO users set ?", newUser, (err, res)=>{
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("created user: ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser});
    });
};
