const TAGS_REGEX = /[^,\s][^\,]*[^,\s]*/g;

class Note {

    constructor(properties) {
        if (!properties.title || (properties.title = properties.title.trim()).length == 0) {
            throw 'Debe ingresar un título para la nota';
        }

        if (!properties.author || (properties.author = properties.author.trim()).length == 0) {
            throw 'Debe ingresar un autor para la nota';
        }

        if (!properties.tags || !TAGS_REGEX.test(properties.tags)) {
            throw 'Debe ingresar al menos una etiqueta (separadas por coma)';
        }

        if (!properties.text || (properties.text = properties.text.trim()).length == 0) {
            throw 'Debe ingresar contenido a la nota';
        }

        this.title = properties.title;
        this.author = properties.author;
        this.tags = properties.tags;
        this.text = properties.text;
    }

    getTagList() {
        return this.tags.match(TAGS_REGEX).join(', ');
    }

}

export default Note;