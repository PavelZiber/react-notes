import Store from '../core/store';
import actionType from '../actions/actionType';
import * as Immutable from 'immutable';

class NoteStore extends Store {
  onDispatch(action) {
    switch (action.type) {
      case actionType.NOTE_LIST:
        this.onNoteList(action.data);
        break;
      case actionType.NOTE_DELETE:
        this.deleteNote(action.data);
        break;
      case actionType.NOTE_UPDATE:
        this.updateNote(action.data);
        break;
      case actionType.NOTE_ADD:
        this.addNote(action.data);
        break;
    }
  }

  onNoteList(resp) {
    if (this.isValidResponse(resp)) {
      var mergeData, newState;
      mergeData = {notes : resp.body};
      newState = this.getState().mergeDeep(mergeData);
      this.updateState(newState);
    }
  }

  getNoteList() {
    return this.getState().get('notes');
  }

  deleteNote(id) {
    var list = this.getNoteList();
    if (list.has(id)) {
      var newState = this.getState().update('notes', (notes) => {return notes.delete(id); });
      this.updateState(newState);
    }
  }

  updateNote(data) {
    var list = this.getNoteList();
    var id = data.id;
    var note = Immutable.fromJS(data.note);
    if (list.has(id)) {
      var newState = this.getState().update('notes', (notes) => {return notes.set(id, note); });
      this.updateState(newState);
    }
  }

  addNote(data) {
    var note = Immutable.fromJS(data.note);
    var newState = this.getState().update('notes', (notes) => {return notes.push(note); });
    this.updateState(newState);
  }

  getById(id) {
    var list = this.getNoteList();
    if (list.has(id))
      return list.get(id).toJS();
    else
      return null;
  }
}



export default new NoteStore();
