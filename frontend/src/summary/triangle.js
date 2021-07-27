import React, { Component } from "react";
import Insert from "./insert/insert";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
class Triangle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "none",
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  calHeight(size) {
    return size;
  }
  handleOpen() {
    this.setState((prevState) => ({
      display: "block",
    }));
  }
  handleClose() {
    this.setState((prevState) => ({
      display: "none",
    }));
  }
  render() {
    let height = this.calHeight(this.props.size);
    let smallHeight = height - 4;
    let leftPos = -height + this.props.pos * 54;
    let item = this.props.item;
    return (
      <div
        style={{
          verticalAlign: "bottom",
          display: "inline-block",
          width: 2 * height,
          height: height,
          lineHeight: 0,
          fontSize: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            overflow: "hidden",
            left: leftPos,
          }}
          onDoubleClick={this.handleOpen}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: height + "px solid transparent",
              borderRight: height + "px solid transparent",
              borderTop: height + "px solid grey",
              position: "relative",
            }}
          ></div>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: smallHeight + "px solid transparent",
              borderRight: smallHeight + "px solid transparent",
              borderTop: smallHeight + "px solid white",
              position: "absolute",
              bottom: "2px",
              top: "2px",
              right: "4px",
              left: "4px",
            }}
          ></div>
        </div>
        <div
          style={{
            position: "absolute",
            width: 100,
            border: "1px solid gray",
            left: leftPos + height,
            bottom: -127,
            backgroundColor: "white",
            //overflow: "auto",
            display: this.state.display,
            zIndex: 999,
            borderRadius: "3px",
          }}
        >
          <div style={{ position: "relative", right: 0, textAlign: "right" }}>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={this.handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
          <Insert data={item} />
        </div>
      </div>
    );
  }
}

export default Triangle;
