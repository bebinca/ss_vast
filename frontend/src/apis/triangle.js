import React, { Component } from "react";
import store from "../store/store";
class Triangle extends Component {
  //   componentDidMount() {
  //     store.registerComponent("Triangle", this);
  //   }
  //   componentWillUnmount() {
  //     store.unregisterComponent("Triangle", this);
  //   }
  calHeight(size) {
    return size;
  }
  render() {
    const { classes } = this.props;
    console.log(this.props);
    let height = this.calHeight(this.props.size);
    let smallHeight = height - 4;
    return (
      <div
        style={{
          width: 2 * height,
          height: height,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: height + "px solid transparent",
            borderRight: height + "px solid transparent",
            borderTop: height + "px solid grey",
            position: "relative",
          }}
        ></div>
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: smallHeight + "px solid transparent",
            borderRight: smallHeight + "px solid transparent",
            borderTop: smallHeight + "px solid white",
            position: "absolute",
            top: "2px",
            left: "4px",
          }}
        ></div>
      </div>
    );
  }
}

export default Triangle;
