/* Notes endpoints */
const notesController = require('./notesController');
const express = require('express');
const notesRouter = express.Router();

const getNoteId = (req, res, next) => {
    const noteId = req.params.noteId;
    req.noteId = noteId;
    next();
}

const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).send({ status: 'FAILED', data: { error: err.message || 'Internal error.' } })
}

/* Get all notes */
notesRouter.get('/', notesController.getAllnotes);

/* Get one note */
notesRouter.get('/:noteId', getNoteId, notesController.getOneNote);

/* Create new note */
notesRouter.post('/', notesController.createOneNote);

/* Updete note */
notesRouter.put('/:noteId', getNoteId, notesController.updateOneNote);

/* Delete note*/
notesRouter.delete('/:noteId', getNoteId, notesController.deleteOneNote);

notesRouter.use(errorHandler);

module.exports = notesRouter;