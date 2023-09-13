const Note = require('../models/noteModule')
const mongoose = require('mongoose')

// get all notes
const getNotes = async (req, res) => {
    // here we use "-1" for sort result in descending order
    const notes = await Note.find({}).sort({ createdAt: -1 })
    res.status(200).json(notes)
}

// get a single note
const getNote = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such note' })
    }

    const note = await Note.findById(id)

    if (!note) {
        return res.status(404).json({ error: 'No such note' })
    }

    res.status(200).json(note)
}

// create a new workout
const createNote = async (req, res) => {
    const { title, content } = req.body

    // add doc to db
    try {
        const note = await Note.create({ title, content })
        res.status(200).json(note)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a note
const deleteNote = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such note' })
    }

    const note = await Note.findOneAndDelete({ _id: id })

    if (!note) {
        return res.status(404).json({ error: 'No such note' })
    }

    res.status(200).json(note)
}

// update a note
const updateNote = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such note' })
    }

    const note = await Note.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!note) {
        return res.status(404).json({ error: 'No such note' })
    }

    res.status(200).json(note)
}

module.exports = {
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote,
}
