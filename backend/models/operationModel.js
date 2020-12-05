const sql = require('./db');

//constructor
const Operation = function(operation){
    this.concept = operation.concept;
    this.amount = operation.amount;
    this.date_operation = operation.date_operation;
    this.type_operation = operation.type_operation;
};

/*-------------------- querys SQL ------------------------*/


Operation.create = (newOperation, result) => {
    sql.query("INSERT INTO operations set ?", newOperation, (err, res)=>{
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("created customer: ", {id: res.insertId, ...newOperation});
        result(null, {id: res.insertId, ...newOperation});
    });
};

Operation.getAll = result => {
    sql.query("SELECT *, DATE_FORMAT (date_operation,'%d/%m/%Y') AS formatDate FROM operations ORDER BY id DESC", (err, res) => {
        if(err){
            result(null, err);
            return;
        }
        console.log("operations: ", res);
        result(null, res);
    });
};

// Operation.getLastTen = result => {
//     sql.query(`SELECT *, DATE_FORMAT (date_operation,'%d/%m/%Y') AS formatDate FROM operations ORDER BY id DESC limit 10`, (err, res) => {
//         if(err){
//             console.log("error", err);
//             result(null, err);
//             return;
//         }
//         console.log("operations: ", res);
//         result(null, res);
//     });
// };

Operation.findById = (operationId, result) => {
    sql.query(`SELECT * from operations WHERE id = ${operationId}`, (err, res) => {
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("operations: ", res[0]);
            result(null, res[0]);
            return
        }

        result({ Kind: "not_found"}, null)

    });
};

Operation.remove = (id, result) => {
    sql.query("DELETE FROM operations WHERE id= ?", id, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return
        }

        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return
        }
        console.log("deleted operation with id: ", id);
        result(null, res);
    });
};


Operation.updateById = (id, operation, result) =>{
    sql.query(
        "UPDATE operations SET concept = ?, amount = ?, date_operation = ? where id = ?",
        [operation.concept, operation.amount, operation.date_operation, id],
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(null, err);
                return
            }

            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return
            }
            console.log("update operation with id: ", {id: id, ...operation});
            result(null, {id: id, ...operation});
        }

    )
}




module.exports = Operation;