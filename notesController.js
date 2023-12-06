const getAllnotes = (req, res) => {
    res.send('Get all notes');
}
const getOneNote = (req, res) => {
    res.send('Get one note');
}
const createOneNote = (req, res) => {
    res.send('Create new note');
}
const updateOneNote = (req, res) => {
    res.send('Update one note');
}
const deleteOneNote = (req, res) => {
    res.send('Delete one note');
}

module.exports = {
    getAllnotes,
    getOneNote,
    createOneNote,
    updateOneNote,
    deleteOneNote
}