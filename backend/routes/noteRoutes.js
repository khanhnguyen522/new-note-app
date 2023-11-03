const express = require("express");
const middlewareController = require("../controllers/middlewareController");
const noteController = require("../controllers/noteController");

const router = express.Router();

router.get("/", middlewareController.verifyToken, noteController.getNotes);
router.post(
  "/create",
  middlewareController.verifyToken,
  noteController.createNote
);
router.get("/:id", noteController.getNoteById);
router.put("/:id", middlewareController.verifyToken, noteController.updateNote);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  noteController.deleteNote
);

module.exports = router;
