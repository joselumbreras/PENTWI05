import Note from './../note';

class NotesController {

    constructor() {
        this.counter = 0;
        this.notes = {};
    }

    createNote(properties) {
        var note = new Note(properties);
        note.id = ++this.counter;
        return note;
    }

    saveNote(note) {
        this.notes[note.id] = note;
    }

    removeNote(id) {
        delete this.notes[id]
    }

}

export default NotesController;