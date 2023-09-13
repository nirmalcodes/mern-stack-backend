const express = require('express')
const {
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote,
} = require('../controllers/noteController')

const router = express.Router()

// GET all Notes
router.get('/', getNotes)

// GET a single Note
router.get('/:id', getNote)

// POST a new Note
router.post('/', createNote)

// DELETE a Note
router.delete('/:id', deleteNote)

// UPDATE a Note
router.patch('/:id', updateNote)

module.exports = router
