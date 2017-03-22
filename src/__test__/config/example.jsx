import React from 'react';

class Comp1 extends React.Component {

  render() {
    return <div className="comp-1">111</div>;
  }
}

const Comp2 = () => {
  return <div className="comp-2">2222</div>;
};

export {
  Comp1,
  Comp2,
};
