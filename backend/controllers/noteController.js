const Note = require("../models/noteModel");

const noteController = {
  getNotes: async (req, res) => {
    try {
      const notes = await Note.find({ user: req.user.id });
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createNote: async (req, res) => {
    try {
      const { title, content, category } = req.body;

      if (!title || !content || !category) {
        return res.status(400).json("Please fill all the fields");
      } else {
        const note = await new Note({
          user: req.user.id,
          title,
          content,
          category,
        });
        const createdNote = await note.save();
        res.status(200).json(createdNote);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getNoteById: async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateNote: async (req, res) => {
    try {
      const { title, content, category } = req.body;
      // const noteId = new mongoose.Types.ObjectId(req.params.id);

      // if (!mongoose.Types.ObjectId.isValid(noteId)) {
      //   return res.status(400).json("Invalid note ID");
      // }

      const note = await Note.findById(req.params.id);

      if (!note) {
        return res.status(404).json("Note not found");
      }
      if (note.user.toString() !== req.user.id.toString()) {
        res.status(401).json("You can't perform this action");
      }

      note.title = title || note.title;
      note.content = content || note.content;
      note.category = category || note.category;

      const updatedNote = await note.save();
      res.status(200).json(updatedNote);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  deleteNote: async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      console.log(note);
      if (!note) {
        return res.status(404).json("Note not found");
      }

      if (note.user.toString() !== req.user.id.toString()) {
        res.status(401).json("You can't perform this action");
      }
      try {
        await Note.deleteOne({ _id: note._id });
        res.status(200).json({ message: "Note removed" });
      } catch (err) {
        res
          .status(500)
          .json({ error: "An error occurred while removing the note" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = noteController;
