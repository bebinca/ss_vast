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
    return (
      <div
        style={{
          height: this.calHeight(this.props.size),
          width: 43,
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

export default Triangle;