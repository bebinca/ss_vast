// need props: name, size
// TODO: modify calHeight function
// TODO: position
import React, { Component } from "react";
import store from "../store/store";
class Rectangle extends Component {
  //   componentDidMount() {
  //     store.registerComponent("Rectangle", this);
  //   }

  //   componentWillUnmount() {
  //     store.unregisterComponent("Rectangle", this);
  //   }
  calHeight(size) {
    return size;
  }
  render() {
    const { classes } = this.props;
    let name = this.props.name;
    let size = this.calHeight(this.props.size);
    let color = store.getData.Color(name);
    let border = size === 0 ? "0px" : "2px solid " + color;
    let width = size === 0 ? 46 : 42;
    return (
      <div
        style={{
          display: "inline-block",
          paddingRight: 4,
          verticalAlign: "top",
        }}
      >
        <div
          style={{
            height: size,
            width: width,
            position: "relative",
            border: border,
            borderTop: "10px solid " + color,
            borderRadius: "1px",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <div>{name}</div>
        </div>
      </div>
    );
  }
}

export default Rectangle;