import React, { Component } from "react";
import Circle from "./circle";
import SmallCircle from "./smallCircle";
class Events extends Component {
  render() {
    const circle = this.props.data.map((event, index) => {
      if (event.pos !== -1) {
        return <Circle name={event.name} />;
      } else {
        return <SmallCircle name={event.name} />;
      }
    });
    return (
      <div
        style={{
          position: "relative",
          lineHeight: 0,
          whiteSpace: "nowrap",
          left: this.props.left,
        }}
      >
        {circle}
      </div>
    );
  }
}

export default Events;
