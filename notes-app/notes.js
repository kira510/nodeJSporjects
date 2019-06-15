const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    try {
        var result = fs.readFileSync('notes.json');
        result = result.toString();

        return JSON.parse(result);
    } catch (e) {
        return [];
    }
};

const addNote = (title, body) => {
    debugger
    const data = getNotes();
    const duplicateNotes = data.find(item => {
        return item.title === title;
    });

    if (!duplicateNotes) {
        data.push({
            title: title,
            body: body
        })

        saveNotes(data);
        console.log(chalk.green('New note added'))
    } else {
        console.log(chalk.red('Note with same title already present'));
    }
}

const listNotes = () => {
    const data = getNotes();

    console.log(chalk.green.inverse('Your notes are:'));
    data.map(note => {
        console.log(chalk.blue(note.title));
    })
}

const readNote = (title) => {
    const data = getNotes();

    const note = data.find(note => {
        return note.title === title;
    });

    if (note) {
        console.log(chalk.inverse.green(note.title));
        console.log(chalk.green(note.body), '\n');
    } else {
        console.log(chalk.bold.red('Note not found'));
    }
}

const removeNote = (title) => {
    const data = getNotes();

    const updatedData = data.filter(item => {
        return item.title !== title;
    });

    if (updatedData.length !== data.length) {
        saveNotes(updatedData);
        console.log(chalk.green('Notes updated'));
    } else {
        console.log(chalk.red(`Item with ${title} not present`));
    }
}

const saveNotes = (data) => {
    const dataStr = JSON.stringify(data);
    fs.writeFileSync('notes.json', dataStr);
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};