const Operation = require('../models/operationModel');


//Create and save a new Operation
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    //Create a Operation
    const operation = new Operation({
        concept: req.body.concept,
        amount: req.body.amount,
        date_operation: req.body.date_operation,
        type_operation: req.body.type_operation
    });

    //Save Operation in the database
    Operation.create(operation, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while creating the operation."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Operation.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving operations"
            });
        else res.send(data);
    })
};

exports.lastTen = (req, res) => {

    Operation.getLastTen((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving operations"
            });
        else res.send(data);
    })
};

exports.findOne = (req, res) => {
    Operation.findById(req.params.operationId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found operation ${req.params.operationId}`
                });
            } else {
                res.status(500).send({
                    message: "error retrieving operation with id " + req.params.operationId
                });
            }
        } else res.send(data);
    })
};

exports.delete = (req, res) => {
    Operation.remove(req.params.operationId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found operation with id ${req.params.operationId}`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete operation with id" + req.params.operationId
                });
            }
        } else res.send({ message: `Operation was deleted successfully` });
    })
};

exports.update = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    Operation.updateById(
        req.params.operationId,
        new Operation(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message: `Not found operation with id ${req.params.operationId}`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating operation with id" + req.params.operationId
                    });
                }
            } else res.send(data)
        }
    )

}






