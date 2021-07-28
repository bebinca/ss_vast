// need props: name, size
// TODO: modify calHeight function
// TODO: position
import React, { Component } from "react";
import store from "../../store/store";
class Rectangle extends Component {
  calHeight(size) {
    if (size <= 3) return 0;
    else return size + 14;
  }
  render() {
    let name = this.props.name;
    let size = this.calHeight(this.props.size);
    let color = store.getData.Color(name);
    let border = size === 0 ? "0px" : "2px solid " + color;
    let width = size === 0 ? 50 : 46;
    return (
      <div
        style={{
          paddingTop: 4,
          paddingLeft: 4,
          verticalAlign: "top",
        }}
      >
        <div
          style={{
            height: size,
            width: width,
            position: "relative",
            left: 0,
            border: border,
            borderTop: "10px solid " + color,
            borderRadius: "1px",
            overflow: "hidden",
            backgroundColor: "#fff",
            userSelect: "none",
            lineHeight: "110%",
            fontSize: "13px",
          }}
        >
          <div>{name}</div>
        </div>
      </div>
    );
  }
}

export default Rectangle;
