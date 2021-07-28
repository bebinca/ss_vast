import React, { Component } from "react";
import Rectangle from "./rectangle";
class Insert extends Component {
  render() {
    const data = this.props.data;
    const rectangle = data.map((event, index) => (
      <Rectangle name={event.name} size={event.freq} pos={index} />
    ));
    return (
      <div
        style={{
          position: "relative",
          margin: 0,
          userSelect: "none",
          width: 100,
          maxHeight: 100,
          overflow: "auto",
          //border: "1px solid gray",
          backgroundColor: "white",
        }}
      >
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

export default Insert;
