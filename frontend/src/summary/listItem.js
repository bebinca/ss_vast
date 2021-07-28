import React, { Component } from "react";
import Pattern from "./pattern";
class ListItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            whiteSpace: "nowrap",
          }}
        >
          <Pattern data={data} />
        </div>
      </div>
    );
  }
}

export default ListItem;
