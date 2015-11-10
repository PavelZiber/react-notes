import * as React from 'react';
import Component from '../../core/component';
import {setLanguage} from '../../actions/actions';
import mainStore from '../../stores/mainStore';
import translator from '../../stores/translator';

export default class Header extends Component {

  getState() {
    return {
      lang: mainStore.getLanguage(),
      langSet: mainStore.getLanguageSet()
    };
  }

  getButtons() {
    return this.state.langSet.map(lang => this.getButton(lang));
  }

  getButton(lang) {
    var selectedClass = 'btn', translateLabel = 'label_';
    if (lang === this.state.lang)
      selectedClass += ' btn-primary';
    else
      selectedClass += ' btn-default';
    return (<button
      key={lang}
      className={selectedClass}
      onClick={this.onButtonClick.bind(this, lang)}>{translator.translate(translateLabel + lang)}</button>
    );
  }

  onButtonClick(lang) {
    setLanguage(lang);
  }

  render() {
    return (
      <div className="col-md-12">
        <h2 className="col-md-8">
          {translator.translate('notes_title')}
        </h2>
        <div className="col-md-4">
          {this.getButtons()}
        </div>
      </div>
    );
  }

}
