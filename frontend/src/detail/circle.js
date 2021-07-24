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
          paddingRight: 2,
          verticalAlign: "top",
        }}
      >
        <div
          style={{
            height: 10,
            width: 10,
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
