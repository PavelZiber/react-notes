import actionType from './actionType';
import Router from '../router/router';
import redirect from '../router/redirect';
import http from '../core/http';
import Dispatcher from '../core/dispatcher';

const apiUrl = 'http://localhost:9000/api/';

function handleError(err) {
  /*eslint-disable */
  console.log(err.stack);
  /*eslint-enable */
}

export function initData() {
  http.get(apiUrl + 'init').then((resp) => {
    Dispatcher.dispatch({
      type: actionType.INIT_DATA,
      data: resp
    });
    Router().refresh();
  }).catch(handleError);
}

export function setLanguage(lang) {
  Dispatcher.dispatch({
      type: actionType.SET_LANG,
      data: lang
  });
  Router().refresh();
}

export function noteList() {
  http.get(apiUrl + 'notes').then((resp) => {
    Dispatcher.dispatch({
      type: actionType.NOTE_LIST,
      data: resp
    });
    Router().refresh();
  }).catch(handleError);
}

export function deleteNote(id) {
  http.delete(apiUrl + 'notes/' + id).then((resp) => {
    Dispatcher.dispatch({
      type: actionType.NOTE_DELETE,
      data: id
    });
    redirect('/');
  }).catch(handleError);
}

export function updateNote(id, note) {
  http.put(apiUrl + 'notes/' + id, note).then((resp) => {
    Dispatcher.dispatch({
      type: actionType.NOTE_UPDATE,
      data: {
        id:id,
        note:note
      }
    });
    redirect('/');
  }).catch(handleError);
}

export function addNote(note) {
  http.post(apiUrl + 'notes/', note).then((resp) => {
    Dispatcher.dispatch({
      type: actionType.NOTE_ADD,
      data: {
        note:note
      }
    });
    redirect('/');
  }).catch(handleError);
}
