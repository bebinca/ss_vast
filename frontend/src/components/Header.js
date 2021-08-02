import store from "../store/store";
import React, { Component } from "react";
import StorageIcon from "@material-ui/icons/Storage";
const Subject = <StorageIcon />;
class Header extends Component {
  componentDidMount() {
    store.registerComponent("Header", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("Header", this);
  }
  render() {
    return (
      <div>
        <div style={{ padding: 2 }}>
          <div
            style={{
              height: 22,
              fontWeight: "bold",
              fontFamily: "sans-serif",
              fontSize: "17px",
              verticalAlign: "middle",
            }}
          >
            <div
              style={{
                display: "inline-block",
              }}
            >
              {Subject}
            </div>
            <div
              style={{
                display: "inline-block",
                position: "absolute",
                height: 25,
                top: 4,
                verticalAlign: "middle",
                left: 27,
              }}
            >
              Dataset: Agavue
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
