const Notes = require("../models/note.model")

// @desc Get All Notes
// @route GET /notes/all
// @access Private
const getAllNotes = async (req, res) => {
  const allNotes = await Notes.find().lean()

  if (allNotes.length === 0) {
    return res
      .status(400)
      .json({
        success: false,
        msg: "There are no notes available at the moment!",
      })
  }

  res.status(200).json({ success: true, notes: allNotes })
}

// @desc Get all notes for a single User
// @route GET /notes/userId
// @access Private
const getUserNotes = async (req, res) => {
  const { userId } = req.params

  const allNotes = await Notes.find({ user: userId }).lean().exec()

  if (allNotes.length === 0) {
    return res
      .status(400)
      .json({ success: false, msg: "There is no notes for this user." })
  }

  res.status(200).json({ success: true, notes: allNotes }).lean().exec()
}

// @desc Get Single Note
// @route GET /notes/userId/noteId
// @access Private
const getSingleNote = async (req, res) => {
  const { userId, noteId } = req.params

  const note = await Notes.findOne({ _id: noteId, user: userId }).lean().exec()

  if (!note) {
    return res
      .status(400)
      .json({
        success: false,
        msg: `There is no note with id ${noteId} in the database.`,
      })
  }

  res.status(200).json({ success: true, note })
}

// @desc create note
// @route POST /notes
// @access Private
const createNote = async (req, res) => {
  // going to store the userId in the req.
  const { title, text } = req.body

  const noteObject = {
    user: req.userId,
    title,
    text,
  }

  const note = await Notes.create(noteObject)

  if (note) {
    res
      .status(201)
      .json({
        success: true,
        msg: `A note with title ${title} has been created.`,
      })
  } else {
    res
      .status(400)
      .json({
        success: false,
        msg: "Invalid note data received, please try again.",
      })
  }
}

// @desc updated note
// @route PATCH /notes
// @access Private
const updateNote = async (req, res) => {
  const { id, title, text, completed } = req.body

  await Notes.findByIdAndUpdate(id, {
    $set: { title, text, completed },
  }).orFail(() =>
    res
      .status(400)
      .json({ success: false, msg: `There is no notes with the id ${id}` })
    )
    
    res.status(200).json({success: true, msg: `Note updated successfully.`})
}

// @desc delete note
// @route DELETE /notes/noteId
// @access Private
const deleteNote = async (req, res) => {
    const { noteId } = req.body 

    await Notes.findByIdAndDelete(noteId).orFail(() => res.status(400).json({ success: false, msg: `There is no note with the id ${noteId}` }))
    
    res.status(200).json({success: true, msg: `A note with id ${noteId} was deleted successfully.`})
}


module.exports = {
    getAllNotes,
    getSingleNote,
    getUserNotes,
    createNote,
    updateNote,
    deleteNote
}