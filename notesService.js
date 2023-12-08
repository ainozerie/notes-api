const notes = require('./notes');
const {idGenerator} = require('./utils');

const getAllnotes = () => {
    return {status: 'OK', data: notes};
}
const getOneNote = () => {
    return;
}
const createOneNote = (newNote) => {
    newNote.status = 'new';
    newNote.id = idGenerator();
    console.log(notes)
    const createdNote = notes.push(newNote);
    return createdNote;
}
const updateOneNote = () => {
    return;
}
const deleteOneNote = () => {
    return;
}

module.exports = {
    getAllnotes,
    getOneNote,
    createOneNote,
    updateOneNote,
    deleteOneNote
}