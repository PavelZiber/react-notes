import * as React from 'react';

export default class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getState(nextProps));
  }

  getState(props) {
    return {};
  }
}
