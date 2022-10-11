import React, { Component } from "react";
import "../css/animated.css";
import { Animated } from "react-animated-css";

class AnimationCreator extends Component {
  state = {};
  render() {
    return (
      <div className="animated-view">
        <Animated
          animationIn="slideInLeft"
          animationOutDuration ="2000"
          animationOut="bounceOut"
          isVisible={true}
        >
          <div>hello world ;)</div>
        </Animated>
      </div>
    );
  }
}

export default AnimationCreator;
