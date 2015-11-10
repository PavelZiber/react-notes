import * as React from 'react';
import Component from '../core/component';
import '../css/main.less';
import {initData} from '../actions/actions';
import mainStore from '../stores/mainStore';
import Header from './header/header';
import {RouteHandler} from 'react-router';

export default class Main extends Component {

  componentDidMount() {
    initData();
  }

  getState() {
    return {
      isLoading: mainStore.isLoading()
    };
  }

  getPage() {
    return (
      <div className="col-md-12">
        <Header />
        <RouteHandler />
      </div>
    );
  }

  render() {
    if (this.state.isLoading)
      return (<div className="spinner-loader">Loading…</div>);
    else
      return this.getPage();
  }
}

