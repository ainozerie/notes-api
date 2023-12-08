const dateRegex = /^(?:19|20)\d{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)$/;

const idGenerator = () => {
    return (new Date()).getTime().toString();
}
const isValidDate = (date) => {
    return dateRegex.test(date);
}

module.exports = {
    idGenerator,
    isValidDate
}