import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Portal.css'

const portalRoot = document.getElementById('portal');

class Portal extends Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div')
  }

  componentDidMount() {

    portalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    portalRoot.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

export default Portal;