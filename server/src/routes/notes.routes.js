const { Router } = require("express")
const {
  getAllNotes,
  getUserNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  createNote,
} = require("../controllers/notes.controller")

const router = Router()

router.route("/").patch(updateNote).delete(deleteNote).post(createNote)
router.route("/:userId").get(getUserNotes)
router.route("/:userId/:noteId").get(getSingleNote)
router.route("/all").get(getAllNotes)

module.exports = router
