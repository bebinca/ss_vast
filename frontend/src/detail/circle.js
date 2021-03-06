// need props: name
import React, { Component } from "react";
import store from "../store/store";
class Circle extends Component {
  render() {
    let name = this.props.name;
    let color = store.getData.Color(name);
    return (
      <div
        style={{
          display: "inline-block",
          padding: 1,
          verticalAlign: "middle",
        }}
      >
        <div
          style={{
            height: 11,
            width: 11,
            position: "relative",
            borderRadius: "50%",
            backgroundColor: color,
            border: "1px solid black",
          }}
        ></div>
      </div>
    );
  }
}

export default Circle;
