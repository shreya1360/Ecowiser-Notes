const db = require("../models");
const Notes = db.notes;

exports.create =(req, res) => {
  
      // Create a Notes
      const notes = new Notes({
        title: req.body.title,
        description: req.body.description,
        pinned: req.body.pinned ? req.body.pinned : false
      });
    
      notes
        .save(notes)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        });

}

exports.findAll = (req, res)=>{

    const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Notes.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving note."
      });
    });

};

exports.update = (req, res) =>{

    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }

    const id = req.params.id;

  Notes.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Note with id=${id}. Maybe Note was not found!`
        });
      } else res.send({ message: "Note was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Note with id=" + id
      });
    });

};
exports.delete = (req, res) => {
  const id = req.params.id;

  Notes.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Note with id=${id}. Maybe Note was not found!`
        });
      } else {
        res.send({
          message: "Note was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Note with id=" + id
      });
    });
};