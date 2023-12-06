const notesController = require('./notesController');
const express = require('express');
const notesRouter = express.Router();

/* Get all notes */
notesRouter.get('/', notesController.getAllnotes);

/* Get one note */
notesRouter.get('/:noteId', notesController.getOneNote);

/* Create new note */
notesRouter.post('/', notesController.createOneNote);

/* Updete note */
notesRouter.put('/:noteId', notesController.updateOneNote);

/* Delete note*/
notesRouter.delete('/:noteId', notesController.deleteOneNote);

module.exports = notesRouter;