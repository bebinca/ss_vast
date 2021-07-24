import React, { Component } from "react";
import Rectangle from "./rectangle";
import Triangle from "./triangle";
class Pattern extends Component {
  render() {
    const { data } = this.props;
    console.log(data);
    const rectangle = data.events.map((event, index) => (
      <Rectangle name={event.name} size={event.freq} pos={index} />
    ));
    const triangle = data.insert.map((insert, index) => (
      <Triangle size={insert.size} pos={index} item={insert.data} />
    ));
    return (
      <div
        style={{
          display: "inline-block",
          position: "relative",
          margin: 0,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "table",
            whiteSpace: "nowrap",
          }}
        >
          {triangle}
        </div>
        <div
          style={{
            position: "relative",
            display: "table",
            whiteSpace: "nowrap",
          }}
        >
          {rectangle}
        </div>
      </div>
    );
  }
}

export default Pattern;
