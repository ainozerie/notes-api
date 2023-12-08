const notesService = require('./notesService');

const getAllnotes = (req, res) => {
    const allNotes = notesService.getAllnotes();
    res.status(200).send(allNotes);
};

const getOneNote = (req, res) => {
    const note = notesService.getOneNote();
    res.send('Get one note');
};

const createOneNote = (req, res) => {
    const {body} = req;
    if (!body.content || !body.date) {
        return res.status(400).send({
            status: 'FAILED', data: {error: "One of the properties missing."}
        });
    }

    const newNote = {
        content: body.content,
        date: body.date
    }

    const createdNote = notesService.createOneNote(newNote);
    res.status(201).send({status: 'OK', data: createdNote});
};

const updateOneNote = (req, res) => {
    const updatedNote = notesService.updateOneNote();
    res.send('Update one note');
};

const deleteOneNote = (req, res) => {
    notesService.deleteOneNote();
    res.send('Delete one note');
};

module.exports = {
    getAllnotes,
    getOneNote,
    createOneNote,
    updateOneNote,
    deleteOneNote
}