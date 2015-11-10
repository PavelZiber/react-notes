import * as React from 'react';
import {Route, DefaultRoute} from 'react-router';
import Main from '../components/main';
import NoteList from '../components/notes/noteList';

export default (
  <Route handler={Main} path='/'>
    <DefaultRoute handler={NoteList} />
    <Route handler={NoteList} path='detail/:action/:id?' />
  </Route>
);
