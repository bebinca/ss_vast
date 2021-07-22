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
    console.log(this.props);
    return (
      <div
        style={{
          height: this.calHeight(this.props.size),
          width: 45,
          position: "relative",
          border: "3px solid " + store.getData.Color(this.props.name),
          borderTop: "10px solid " + store.getData.Color(this.props.name),
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div>{this.props.name}</div>
      </div>
    );
  }
}

export default Rectangle;
