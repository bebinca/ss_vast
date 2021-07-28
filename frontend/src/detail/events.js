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
          lineHeight: 0,
          whiteSpace: "nowrap",
        }}
      >
        {circle}
      </div>
    );
  }
}

export default Events;
