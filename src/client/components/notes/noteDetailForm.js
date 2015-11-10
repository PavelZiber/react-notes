import * as React from 'react';
import translator from '../../stores/translator';
import Router from '../../router/router';
import Component from '../../core/component';

export default class NoteDetailForm extends Component {

  getState(props) {
    return {
      en : props.params.en,
      cs : props.params.cs,
      action : props.params.action,
      id : props.params.id ? props.params.id : 0,
      error : {}
    };
  }

  isEmpty(el) {
    return el.value.length === 0;
  }

  hasError(name) {
    return this.state.error.hasOwnProperty(name);
  }

  onChange(e) {
    var el = e.target;
    var name = el.getAttribute('name');
    var newState = this.state;
    newState[name] = el.value;
    if (this.isEmpty(el))
      newState.error[name] = true;
    if (this.isEmpty(el) === false && this.hasError(name))
      delete newState.error[name];
    this.setState(newState);
  }

  getError(name) {
    if (this.hasError(name)) {
      var errorText = translator.translate('invalid_input');
      return (<p className="text-danger">{errorText}</p>);
    }else return (<div></div>);
  }

  isValidForm() {
    return (this.state.cs.length > 0 && this.state.en.length > 0);
  }

  onSave(e) {
    e.preventDefault();
    if (this.isValidForm() === false)
      return;
    var data = {};
    data.id = this.state.id;
    data.note = {
      en: this.state.en,
      cs : this.state.cs
    };
    this.props.onSave(data);
  }

  render() {
    return (
      <form className="clearfix">
         <div className='form-group'>
            <label>
              {this.getError('en')}
              {translator.translate('label_en')}
            </label>
            <textarea name='en'
              placeholder={translator.translate('fill_note')}
              onBlur={this.onChange.bind(this)}
              onChange={this.onChange.bind(this)}
              value={this.state.en}>
            </textarea>
         </div>
         <div className='form-group'>
            <label>
              {this.getError('cs')}
              {translator.translate('label_cs')}
            </label>
            <textarea name='cs'
            placeholder={translator.translate('fill_note')}
            onBlur={this.onChange.bind(this)}
            onChange={this.onChange.bind(this)}
            value={this.state.cs}>
            </textarea>
         </div>

            <div className="pull-left">
              <button className="btn btn-success" onClick={this.onSave.bind(this)}>
                {translator.translate('save_note')}
              </button>
            </div>
            <div className="pull-right">
              <a href={Router().makeHref('/')} className="btn btn-danger">
                {translator.translate('cancel')}
              </a>
            </div>
      </form>
    );
  }

}

NoteDetailForm.propTypes = {
  onSave: React.PropTypes.func
};

NoteDetailForm.defaultProps = {
  onSave: function() {}
};
