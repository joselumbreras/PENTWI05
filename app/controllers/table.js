class TableController {

    constructor($, $notesTable, notesController) {
        this.$ = $;
        this.$notesTable = $notesTable;
        this.notesController = notesController;
    }

    onRemoveNote() {
        var self = this;
        return function() {
            var row = self.$(this).parent().parent();
            var id = self.$(this).data().id;

            self.notesController.removeNote(id);

            row.fadeOut('normal', function() {
                self.$(this).remove();
            });
        }
    }

    appendRow(note) {
        var actions = `<td><button class="remove-note" data-id="${note.id}">Eliminar</button></td>`;

        var values = [
            note.id,
            note.title,
            note.author,
            note.getTagList(),
            note.text
        ];

        var row = this.$(`<tr><td>${values.join('</td><td>')}</td>${actions}</tr>`);
        row.hide();

        this.$notesTable.find('tbody').append(row);

        row.show('slow');
    }

}

export default TableController;