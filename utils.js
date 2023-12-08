const idGenerator = () => {
    return (new Date()).getTime().toString();
}

module.exports = {
    idGenerator
}