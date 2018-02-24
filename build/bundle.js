/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _notes = __webpack_require__(2);

var _notes2 = _interopRequireDefault(_notes);

var _table = __webpack_require__(4);

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {

    var $note = {
        title: $('#note-title'),
        author: $('#note-author'),
        tags: $('#note-tags'),
        text: $('#note-text')
    };

    var $button = $('#note-save');
    var $table = $('#notes-table');

    var notesController = new _notes2.default();
    var tableController = new _table2.default($, $table, notesController);

    $button.click(function (event) {
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _note = __webpack_require__(3);

var _note2 = _interopRequireDefault(_note);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotesController = function () {
    function NotesController() {
        _classCallCheck(this, NotesController);

        this.counter = 0;
        this.notes = {};
    }

    _createClass(NotesController, [{
        key: 'createNote',
        value: function createNote(properties) {
            var note = new _note2.default(properties);
            note.id = ++this.counter;
            return note;
        }
    }, {
        key: 'saveNote',
        value: function saveNote(note) {
            this.notes[note.id] = note;
        }
    }, {
        key: 'removeNote',
        value: function removeNote(id) {
            delete this.notes[id];
        }
    }]);

    return NotesController;
}();

exports.default = NotesController;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TAGS_REGEX = /[^,\s][^\,]*[^,\s]*/g;

var Note = function () {
    function Note(properties) {
        _classCallCheck(this, Note);

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

    _createClass(Note, [{
        key: 'getTagList',
        value: function getTagList() {
            return this.tags.match(TAGS_REGEX).join(', ');
        }
    }]);

    return Note;
}();

exports.default = Note;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableController = function () {
    function TableController($, $notesTable, notesController) {
        _classCallCheck(this, TableController);

        this.$ = $;
        this.$notesTable = $notesTable;
        this.notesController = notesController;
    }

    _createClass(TableController, [{
        key: 'onRemoveNote',
        value: function onRemoveNote() {
            var self = this;
            return function () {
                var row = self.$(this).parent().parent();
                var id = self.$(this).data().id;

                self.notesController.removeNote(id);

                row.fadeOut('normal', function () {
                    self.$(this).remove();
                });
            };
        }
    }, {
        key: 'appendRow',
        value: function appendRow(note) {
            var actions = '<td><button class="remove-note" data-id="' + note.id + '">Eliminar</button></td>';

            var values = [note.id, note.title, note.author, note.getTagList(), note.text];

            var row = this.$('<tr><td>' + values.join('</td><td>') + '</td>' + actions + '</tr>');
            row.hide();

            this.$notesTable.find('tbody').append(row);

            row.show('slow');
        }
    }]);

    return TableController;
}();

exports.default = TableController;

/***/ })
/******/ ]);