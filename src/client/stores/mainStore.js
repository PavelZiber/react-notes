import Store from '../core/store';
import actionType from '../actions/actionType';
class MainStore extends Store {

  onDispatch(action) {
    switch (action.type) {
      case actionType.INIT_DATA:
        this.onInitData(action.data);
        break;
      case actionType.SET_LANG:
        this.setLanguage(action.data);
        break;
    }
  }

  onInitData(resp) {
    if (this.isValidResponse(resp)) {
      var mergeData = resp.body, newState;
      mergeData.isLoading = false;
      newState = this.getState().mergeDeep(mergeData);
      this.updateState(newState);
    }
  }

  isLoading() {
    return this.getState().get('isLoading');
  }

  setLanguage(lang) {
    var newState = this.getState().set('lang', lang);
    this.updateState(newState);
  }

}

export default new MainStore();
