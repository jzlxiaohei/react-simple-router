/* eslint-disable react/prop-types, react/no-multi-comp */
import React from 'react';

class Layout1 extends React.Component {

  render() {
    return <div className="layout-1">{this.props.children}</div>;
  }
}

const Layout2 = (props) => {
  return <div className="layout-2">{props.children}</div>;
};

class Layout3 extends React.PureComponent {
  render() {
    return <div className="layout-3">{this.props.children}</div>;
  }
}

export {
  Layout1,
  Layout2,
  Layout3,
};
