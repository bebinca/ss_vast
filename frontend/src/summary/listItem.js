import React, { Component } from "react";
import Pattern from "./pattern";
class ListItem extends Component {
  render() {
    const { data } = this.props;
    const backgroundColor = this.props.kind ? "#efefef" : "#fff";
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            position: "relative",
            padding: 3,
            paddingLeft: 20,
            display: "table",
            whiteSpace: "nowrap",
            width: "100%",
            backgroundColor: backgroundColor,
          }}
        >
          <Pattern data={data} />
        </div>
      </div>
    );
  }
}

export default ListItem;
