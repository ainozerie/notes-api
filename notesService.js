const notes = require('./notes');
const {idGenerator} = require('./utils');
const {isValidDate} = require('./utils');

const getAllnotes = () => {
    return notes;
}
const getOneNote = (id) => {
    const note = notes.find(note => note.id === id);
    return note;
}
const createOneNote = (newNote) => {
    newNote.status = 'new';
    newNote.id = idGenerator();
    notes.push(newNote);
    return newNote;
}
const updateOneNote = (id, newProperties) => {
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex == -1) {
        return undefined;
    }
    if (newProperties.content) notes[noteIndex].content = newProperties.content;
    if (isValidDate(newProperties.date)) notes[noteIndex].date = newProperties.date;
    if (newProperties.status == 'new' || newProperties.status == 'finished') notes[noteIndex].status = newProperties.status;
    
    return notes[noteIndex];
}
const deleteOneNote = (id) => {
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex == -1) {
        return undefined;
    }
    const deletedNote = notes.splice(noteIndex, 1);
    return deletedNote;
}

module.exports = {
    getAllnotes,
    getOneNote,
    createOneNote,
    updateOneNote,
    deleteOneNote
}