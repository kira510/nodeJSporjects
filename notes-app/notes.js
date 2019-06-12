const fs = require('fs');

const getNotes = (path) => {
    const result = fs.readFileSync(path, 'utf8');

    return result;
};

module.exports = getNotes;