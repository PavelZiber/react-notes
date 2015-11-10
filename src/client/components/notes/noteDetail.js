import * as React from 'react';
import noteStore from '../../stores/noteStore';
import NoteDetailForm from './noteDetailForm';
import {addNote, updateNote} from '../../actions/actions';
import Component from '../../core/component';

export default class NoteDetail extends Component {

  constructor(props) {
    super(props);
    this.ACTION_EDIT = 'edit';
    this.ACTION_ADD = 'add';
  }

  getState(props) {
    if (props.params && props.params.action)
      if (props.params.action === this.ACTION_ADD)
        return this.getDefaultValues(props);
      else if (props.params.action === this.ACTION_EDIT)
        return this.getEditValues(props);
    return this.getEmptyState(props);
  }

  getDefaultValues(props) {
    return {
      en:'',
      cs : '',
      action : props.params.action,
      id : 0
    };
  }

  getEditValues(props) {
    var id = parseInt(props.params.id, 10);
    var note = noteStore.getById(id);
    return {
      en: note ? note.en : '',
      cs : note ? note.cs : '',
      action : props.params.action,
      id : id
    };
  }

  getEmptyState(props) {
    return {
      action : null
    };
  }

  getDetailForm() {
    return (
      <NoteDetailForm params={this.state} onSave={this.onSave.bind(this)} />
    );
  }

  onSave(values) {
    if (this.state.action === this.ACTION_EDIT)
      updateNote(values.id, values.note);
    else addNote(values.note);
  }

  render() {
    if (this.state && this.state.action)
      return (
        <div className="col-md-4" id="note-detail">{this.getDetailForm()}</div>
      );
    else
      return (
        <div></div>
      );
  }

}
