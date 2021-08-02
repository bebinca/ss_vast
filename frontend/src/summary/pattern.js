import React, { Component } from "react";
import Rectangle from "./rectangle";
import Triangle from "./triangle";
class Pattern extends Component {
  render() {
    const { data } = this.props;
    let over = null;
    let out = null;
    if (this.props.overname && !this.props.cancel) over = this.props.overname;
    else if (this.props.overname && this.props.cancel)
      out = this.props.overname;
    for (let i = 0; i < data.events.length; i++) {
      if (data.events[i].name === over) {
        over = i;
        break;
      } else if (data.events[i].name === out) {
        out = i;
        break;
      }
    }
    const rectangle = data.events.map((event, index) => (
      <Rectangle
        name={event.name}
        size={event.freq}
        pos={index}
        pattern={data.id}
        out={index === out ? true : false}
        over={index === over ? true : false}
      />
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
          height: "100%",
          lineHeight: 0,
          left: this.props.left, ///////////////
          transition: "all 1s ease 0s",
        }}
      >
        <div
          style={{
            position: "relative",
            whiteSpace: "nowrap",
            display: "table",
            height: "100%",
          }}
        >
          {triangle}
        </div>
        <div
          style={{
            position: "relative",
            display: "table",
            whiteSpace: "nowrap",
            height: "100%",
          }}
        >
          {rectangle}
        </div>
      </div>
    );
  }
}

export default Pattern;
