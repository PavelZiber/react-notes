import * as React from 'react';
import Component from '../../core/component';
import {noteList} from '../../actions/actions';
import noteStore from '../../stores/noteStore';
import NoteListItem from './noteListItem';
import NoteDetail from './noteDetail';
import translator from '../../stores/translator';
import Router from '../../router/router';
import {deleteNote} from '../../actions/actions';

export default class NoteList extends Component {

  componentDidMount() {
    noteList();
  }

  getState() {
    return {
      noteList: noteStore.getNoteList(),
      lang: noteStore.getLanguage()
    };
  }

  getNotes() {
    return this.state.noteList.map((note, i) => this.getNote(note, i));
  }

  getNote(note, index) {
    return (
      <NoteListItem
        note={note.get(this.state.lang)}
        key={index}
        onDelete={this.onDelete}
        index={index}/>
      );
  }

  onDelete(id) {
    deleteNote(id);
  }

  getAddNoteButton() {
    return (
      <div className="text-center add-note-button">
        <a className="btn btn-warning" id="add-note" href={Router().makeHref('/detail/add/')}>
          {translator.translate('add_note')}
        </a>
      </div>
    );
  }

  render() {
    return (
      <div className="col-md-12 text-center">
        <div className="col-md-7">
          {this.getAddNoteButton()}
          <table className="table table-striped table-hover">
            <tbody>
              {this.getNotes()}
            </tbody>
          </table>
        </div>
        <div className="col-md-5">
          <NoteDetail {...this.props} />
        </div>
      </div>
    );
  }

}
