import * as Immutable from 'immutable';
class State {
  constructor() {
    this.data = Immutable.fromJS({
      'notes': [],
      'dictionary': {},
      'isLoading': true,
      'lang': 'en',
      'langSet': ['en', 'cs']
    });
  }

  get() {
    return this.data;
  }

  set(data) {
    this.data = data;
  }
}


export default new State;
