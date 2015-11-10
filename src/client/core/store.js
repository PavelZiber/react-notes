import Dispatcher from './dispatcher';
import state from '../state';
const STATUS_OK = 'OK';

export default class Store {

  constructor() {
    this.disptachToken = Dispatcher.register(this.onDispatch.bind(this));
    this.state = state;
  }

  getState() {
    return this.state.get();
  }

  updateState(data) {
    this.state.set(data);
  }

  isValidResponse(resp) {
    return (resp && resp.status && resp.body && this.isResponseOk(resp));
  }

  isResponseOk(resp) {
    return resp.status === STATUS_OK;
  }

  getLanguage() {
    return this.getState().get('lang');
  }

  getLanguageSet() {
    return this.getState().get('langSet');
  }

  onDispatch(action) {}
}
