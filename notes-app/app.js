const yargs=  require('yargs');
const notesOperation = require('./notes');

//console.log(process.argv);

yargs.version("1.1.0");
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler:(argv) => {
        notesOperation.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command:'remove',
    describe:'Removes a note',
    builder: {
        title: {
            describe: 'title',
            demandOption: 'true',
            type: "string"
        }
    },
    handler:(argv) => {
        notesOperation.removeNote(argv.title);
    }
});

yargs.command({
    command:'list',
    describe:'Lists all note',
    handler: () => {
        notesOperation.listNotes();
    }
});

yargs.command({
    command:'read',
    describe:'Reads a note',
    builder: {
        title: {
            type: 'string',
            description: 'Title of note to access',
            demandOption: 'true'
        }
    },
    handler: (argv) => {
        notesOperation.readNote(argv.title);
    }
});

yargs.parse();
//console.log(yargs.argv);
/**  your code did not work before cause you need to access yargs.argv at the end
to tell node to do something with them (extremely lame)
use yargs.parse() instead */