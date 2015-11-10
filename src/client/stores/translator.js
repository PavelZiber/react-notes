import Store from '../core/store';


class Translator extends Store{

  translate(key) {
    var dict = this.getState().get('dictionary');
    var lang = this.getState().get('lang');
    if (dict.has(key)) {
      var word = dict.get(key);
      return word.get(lang);
    }else
    return key;
  }
}

export default new Translator();
