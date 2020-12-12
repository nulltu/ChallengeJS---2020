const db = require("../models");
const Operation = db.operations;
const Op = db.Sequelize.Op;

// Create and Save a new Operation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.concept) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Operation
  const operation = {
    concept: req.body.concept,
    amount: req.body.amount,
    type_operation: req.body.type_operation
  };

  // Save Operation in the database
  Operation.create(operation)
    .then(data => {
      res.send(data);
      console.log(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Operation."
      });
    });
};

exports.findAll = (req, res) => {
  Operation.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding all operations."
      })

    })
}

exports.findOne = (req, res) => {
  const id = req.params.id;

  Operation.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving operation with id=" + id
    })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id;

  Operation.destroy({
    where: {id: id}
  })
  .then(num =>{
    if(num == 1){
      res.send({
        message: "Operation deleted"
      })
    }else {
      res.send({
        message: `Cannot delete operation with id=${id}. Maybe operation was not found`
      })
    }
  })
}

exports.deleteAll = (req, res) => {
  Operation.destroy({
    where: {},
    truncate: false
  })
  .then(nums =>{
    res.send({ message:
       `${nums} Operations were deleted successfully`  
    })
  })
}

exports.updateById = (req, res) => {
  const id = req.params.id;
  
  Operation.update(req.body, {
    where: {id: id}
  })
  .then(num => {
    if(num == 1){
      res.send({
        message: 'Operation was successfully updated.'
      })
    }else {
      res.send({
        message: `Cannot update Operation with id ${id}. Maybe Operation was not found`
      })
    }
  })

}

