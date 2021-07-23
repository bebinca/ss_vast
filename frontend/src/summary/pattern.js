import React, { Component } from "react";
import store from "../store/store";
import Rectangle from "./rectangle";
import Triangle from "./triangle";
class Pattern extends Component {
  //   componentDidMount() {
  //     store.registerComponent("Pattern", this);
  //   }

  //   componentWillUnmount() {
  //     store.unregisterComponent("Pattern", this);
  //   }
  render() {
    const { data } = this.props;
    console.log(data);
    const rectangle = data.events.map((event) => (
      <Rectangle name={event.name} size={event.freq} />
    ));
    const triangle = data.insert.map((insert, index) => (
      <Triangle size={insert.length} pos={index} />
    ));
    const backgroundColor = this.props.kind ? "#efefef" : "#fff";
    return (
      <div style={{ backgroundColor: backgroundColor }}>
        <div
          style={{
            position: "relative",
            left: 20,
            bottom: 3,
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative" }}>{triangle}</div>
          <div style={{ position: "relative" }}>{rectangle}</div>
        </div>
      </div>
    );
  }
}

export default Pattern;
