module.exports = (app) => {
  const notes = require("../controllers/notes.controller.js");

  var router = require("express").Router();

  router.post("/", notes.create);
  router.get("/", notes.findAll);
  router.put("/:id", notes.update);
  router.delete("/:id", notes.delete);

  app.use("/api/notes", router);
};
