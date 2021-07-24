import React, { Component } from "react";
class Triangle extends Component {
  calHeight(size) {
    return size;
  }
  render() {
    let height = this.calHeight(this.props.size);
    let smallHeight = height - 4;
    let leftPos = -height + this.props.pos * 50;
    return (
      <div
        style={{
          verticalAlign: "bottom",
          display: "inline-block",
          width: 2 * height,
          height: height,
        }}
      >
        <div
          style={{
            position: "absolute",
            overflow: "hidden",
            left: leftPos,
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
              bottom: "2px",
              top: "2px",
              right: "4px",
              left: "4px",
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Triangle;
