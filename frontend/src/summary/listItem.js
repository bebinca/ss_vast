import React, { Component } from "react";
import Pattern from "./pattern";
class ListItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <div
            style={{
              whiteSpace: "nowrap",
            }}
          >
            <Pattern
              data={data}
              overname={this.props.overname}
              cancel={this.props.cancel}
              left={this.props.left}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ListItem;
