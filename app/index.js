import NotesController from './controllers/notes';
import TableController from './controllers/table';

$(function() {

    var $note = {
        title: $('#note-title'),
        author: $('#note-author'),
        tags: $('#note-tags'),
        text: $('#note-text')
    };

    var $button = $('#note-save');
    var $table = $('#notes-table');

    var notesController = new NotesController();
    var tableController = new TableController($, $table, notesController);

    $button.click(function(event) {
        try {
            event.preventDefault();

            var properties = {
                title: $note.title.val(),
                author: $note.author.val(),
                tags: $note.tags.val(),
                text: $note.text.val()
            };

            var note = notesController.createNote(properties);

            notesController.saveNote(note);
            tableController.appendRow(note);

            clearFields();
        } catch (error) {
            alert(error);
        }        
    });

    $table.on('click', 'button.remove-note', tableController.onRemoveNote());

    function clearFields() {
        $note.title.val('');
        $note.author.val('');
        $note.tags.val('');
        $note.text.val('');
        $note.title.focus();
    }

});