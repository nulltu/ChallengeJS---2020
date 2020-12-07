module.exports = app =>{
    const operations = require('../controllers/operationController.js');

    //Create a new Operation
    app.post("/operation", operations.create);

    //All Operations
    app.get("/operations", operations.findAll);

    //Find by id
    app.get("/operations/:operationId", operations.findOne)

    //Delete operation with operationId
    app.delete("/operations/:operationId", operations.delete)

    //Update operation with operationId
    app.put("/operations/:operationId", operations.update)
}