const notesService = require('./notesService');

const getAllnotes = (req, res) => {
    const notes = notesService.getAllnotes();
    res.status(200).send({status: 'OK', data: notes});
};

const getOneNote = (req, res) => {
    const noteId = req.params.noteId;
    const note = notesService.getOneNote(noteId);
    if (note) {
        return res.status(200).send({status: 'OK', data: {note}});
    }
    return res.status(404).send({status: 'FAILED', data: {error: 'Note with this id does not exist.'}});
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
    const noteId = req.params.noteId;
    const {body} = req;
    if (body.content || body.date || body.status) {
        const updatedNote = notesService.updateOneNote(noteId, body);
        if (updatedNote) {
            return res.status(200).send({status: 'OK', data: updatedNote});    
        }
        return res.status(404).send({status: 'FAILED', data: {error: 'Note with this id does not exist.'}});
    }
    return res.status(400).send({status: 'FAILED', data: {error: 'No properties to update.'}});
};

const deleteOneNote = (req, res) => {
    const noteId = req.params.noteId;
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