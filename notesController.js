const notes = require('./notes');
const { idGenerator } = require('./utils');
const { isValidDate } = require('./utils');

/* Create an error and passes to errorHandler */
const invokeError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

const getAllnotes = (req, res, next) => {
    res.status(200).send({ status: 'OK', data: notes });
};

const getOneNote = (req, res, next) => {
    const note = notes.find(note => note.id === req.noteId);
    if (note) {
        return res.status(200).send({ status: 'OK', data: { note } });
    }
    next(invokeError(404, 'Note with this id does not exist.'));
};

const createOneNote = (req, res, next) => {
    const { body } = req;
    if (!body.content || !body.date) next(invokeError(400, 'One of the properties missing.'));
    if (!isValidDate(body.date)) next(invokeError(400, 'Date is in invalid format(yyyy-mm-dd).'));

    const newNote = {
        id: idGenerator(),
        content: body.content,
        date: body.date,
        status: 'new'
    }

    notes.push(newNote);
    return res.status(201).send({ status: 'OK', data: newNote });
};

const updateOneNote = (req, res, next) => {
    const { body } = req;
    if (body.content || body.date || body.status) {
        const noteIndex = notes.findIndex(note => note.id === req.noteId);
        if (noteIndex == -1) next(invokeError(404, 'Note with this id does not exist.'));

        if (body.content) notes[noteIndex].content = body.content;
        if (body.date) {
            if (isValidDate(body.date)) {
                notes[noteIndex].date = body.date;
            } else {
                next(invokeError(400, 'Date is invalid (yyyy-mm-dd).'))
            }
        }
        if (body.status == 'new' || body.status == 'finished') {
            notes[noteIndex].status = body.status
        } else {
            next(invokeError(400, 'Status is invalid (new or finished).'));
        }
        return res.status(200).send({ status: 'OK', data: notes[noteIndex] });
    }
    next(invokeError(400, 'Empty body.'));
};

const deleteOneNote = (req, res, next) => {
    const noteIndex = notes.findIndex(note => note.id === req.noteId);
    if (noteIndex == -1) {
        next(invokeError(404, 'Note with this id does not exist.'));
    }
    notes.splice(noteIndex, 1);
    return res.status(204).send({ status: 'OK' });
};

module.exports = {
    getAllnotes,
    getOneNote,
    createOneNote,
    updateOneNote,
    deleteOneNote
}