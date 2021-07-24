// need props: name
import React, { Component } from "react";
import SubjectIcon from "@material-ui/icons/Subject";
import AppsIcon from "@material-ui/icons/Apps";
import SelectAllIcon from "@material-ui/icons/SelectAll";
import Rectangle from "../summary/rectangle";
const GridOn = <AppsIcon />;
const SelectAll = <SelectAllIcon />;
const Subject = <SubjectIcon />;
class Title extends Component {
  render() {
    const icon =
      this.props.name === "Data"
        ? GridOn
        : this.props.name === "Events Filter"
        ? SelectAll
        : Subject;
    return (
      <div style={{ padding: 2 }}>
        <div
          style={{
            height: 22,
            borderBottom: "2px solid #aaaaaa",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            fontSize: "15px",
            verticalAlign: "middle",
          }}
        >
          <div
            style={{
              display: "inline-block",
            }}
          >
            {icon}
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
            {this.props.name}
          </div>
        </div>
      </div>
    );
  }
}

export default Title;
