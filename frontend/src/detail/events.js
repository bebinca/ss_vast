import React, { Component } from "react";
import Circle from "./circle";
import SmallCircle from "./smallCircle";
class Events extends Component {
  render() {
    const circle = this.props.data.map((event, index) => {
      if (this.props.insert === 1 && index === this.props.left) {
        if (event.pos !== -1) {
          return (
            <div style={{ display: "inline-block" }}>
              <SmallCircle name={"none"} />
              <Circle name={event.name} />
            </div>
          );
        } else {
          return (
            <div style={{ display: "inline-block" }}>
              <SmallCircle name={"none"} />
              <SmallCircle name={event.name} />
            </div>
          );
        }
      } else {
        if (event.pos !== -1) {
          return <Circle name={event.name} />;
        } else {
          return <SmallCircle name={event.name} />;
        }
      }
    });
    // if (this.props.insert === 1 && index === this.props.left) {
    //   return (
    //     <div
    //       style={{
    //         position: "relative",
    //         lineHeight: 0,
    //         whiteSpace: "nowrap",
    //         left: (10 - this.props.left) * 15,
    //       }}
    //     >
    //       {circle}
    //     </div>
    //   );
    // } else
    return (
      <div
        style={{
          position: "relative",
          lineHeight: 0,
          whiteSpace: "nowrap",
          left: this.props.left === -1 ? 0 : (10 - this.props.left) * 15,
        }}
      >
        {circle}
      </div>
    );
  }
}

export default Events;
