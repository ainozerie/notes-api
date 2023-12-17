const { isValidDate } = require('./utils');
const Note = require('./Note');

/* Creates an error and passes to errorHandler */
const invokeError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

const getAllnotes = async (req, res, next) => {
    try {
        const notes = await Note.find();
        return res.status(200).send({ status: 'OK', data: notes });
    } catch (error) {
        console.log(error.message);
        next(invokeError(500, 'Database error.'));
    }
};

const getOneNote = async (req, res, next) => {
    try {
        const note = await Note.findOne({_id: req.noteId});
        return res.status(200).send({ status: 'OK', data: note });
    } catch (error) {
        console.log(error.message);
        next(invokeError(404, 'Note with this id does not exist.'));
    }
};

const createOneNote = async (req, res, next) => {
    try {
        const { body } = req;
        if (!body.content || !body.date) return next(invokeError(400, 'One of the properties missing.'));
        if (!isValidDate(body.date)) return next(invokeError(400, 'Date is in invalid format(yyyy-mm-dd).'));
        
        const newNote = new Note({
            content: body.content,
            date: body.date
        });

        const createdNote = await newNote.save();
        return res.status(201).send({ status: 'OK', data: createdNote });
    } catch (error) {
        console.log(error.message);
        next(invokeError(500, 'Database error.'));
    }
};

const updateOneNote = async (req, res, next) => {
    try {
        const { body } = req;
        if (body.content || body.date || body.status) {
            const note = await Note.findOne({_id: req.noteId});
            if (body.content) note.content = body.content;
            if (body.date) {
                if (isValidDate(body.date)) {
                    note.date = body.date;
                } else {
                    next(invokeError(400, 'Date is invalid (yyyy-mm-dd).'))
                }
            }
            if (body.status) {
                if (body.status == 'new' || body.status == 'finished') {
                    note.status = body.status;
                } else {
                    next(invokeError(400, 'Status is invalid (new or finished).'));
                }
            }
    
            await note.save();
            return res.status(200).send({ status: 'OK', data: note });
        } else {
            next(invokeError(400, 'Empty body.'));
        }
    } catch (error) {
        console.log(error.message);
        next(invokeError(404, 'Note with this id does not exist.'));
    }
};

const deleteOneNote = async (req, res, next) => {
    try {
        const deleted = await Note.deleteOne({_id: req.noteId});
        if (deleted.deletedCount === 1) {
            return res.status(204).send();
        } else {
            next(invokeError(404, 'Note with this id does not exist anymore.'));
        }
    } catch (error) {
        console.log(error.message);
        next(invokeError(404, 'Note with this id does not exist.'));
    }
};

const deleteAll = async (req, res, next) => {
    try {
        await Note.deleteMany({});
        return res.status(204).send();
    } catch (error) {
        console.log(error.message);
        next(invokeError(500, 'Database error.'));
    }
}

module.exports = {
    getAllnotes,
    getOneNote,
    createOneNote,
    updateOneNote,
    deleteOneNote,
    deleteAll
}