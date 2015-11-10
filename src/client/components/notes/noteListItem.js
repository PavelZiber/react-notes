import * as React from 'react';
import translator from '../../stores/translator';
import Router from '../../router/router';

export default class NoteListItem extends React.Component {
  onDelete(id, e) {
    e.preventDefault();
    /*eslint-disable no-alert, no-console */
    if (confirm(translator.translate('confirm_delete')))
      this.props.onDelete(id);
    /*eslint-enable no-alert, no-console */
  }

  render() {
    return (
      <tr>
        <td>{this.props.note}</td>
        <td><a className="btn btn-warning" href={Router().makeHref('/detail/edit/' + this.props.index)}>{translator.translate('edit_note')}</a></td>
        <td><button className="btn btn-danger" onClick={this.onDelete.bind(this, this.props.index)}>{translator.translate('delete_note')}</button></td>
      </tr>
    );
  }
}

NoteListItem.propTypes = {
  index : React.PropTypes.number,
  note: React.PropTypes.string,
  onDelete: React.PropTypes.func
};

NoteListItem.defaultProps = {
  note: '',
  onDelete: function() {}
};
