const yargs=  require('yargs');

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
    handler:function (argv) {
        console.log("Title :", argv.title);
        console.log("Body :", argv.body);
    }
});

yargs.command({
    command:'remove',
    describe:'Removes a note',
    handler:function(){
        console.log("Removing a  note");
    }
});

yargs.command({
    command:'list',
    describe:'Lists all note',
    handler:function(){
        console.log("Listing all notes");
    }
});

yargs.command({
    command:'read',
    describe:'Reads a note',
    handler:function(){
        console.log("Reading a  note");
    }
});

yargs.parse();
//console.log(yargs.argv);
/**  your code did not work before cause you need to access yargs.argv at the end
to tell node to do something with them (extremely lame)
use yargs.parse() instead */