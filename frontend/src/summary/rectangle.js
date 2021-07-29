// need props: name, size
// TODO: modify calHeight function
// TODO: position
import React, { Component } from "react";
import store from "../store/store";
class Rectangle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseover: this.props.over ? true : false,
    };
    this.mouseover = this.mouseover.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.dbclick = this.dbclick.bind(this);
  }
  componentDidMount() {
    this.setState({ mouseover: this.props.over ? true : false });
  }
  calHeight(size) {
    if (size <= 5) return 0;
    else return size + 14;
  }
  mouseover() {
    this.setState({ mouseover: true });
    store.handleChange.MouseOver(this.props.name, this.props.pattern);
  }
  mouseout() {
    this.setState({ mouseover: false });
    store.handleChange.MouseOut();
  }
  dbclick() {
    store.handleChange.Dbclick(
      this.props.name,
      this.props.pos,
      this.props.pattern
    );
  }
  render() {
    let name = this.props.name;
    let size = this.calHeight(this.props.size);
    let color = store.getData.Color(name);
    let border = size === 0 ? "0px" : "2px solid " + color;
    let width = size === 0 ? 50 : 46;
    return (
      <div
        style={{
          display: "inline-block",
          paddingRight: 4,
          verticalAlign: "top",
        }}
      >
        <div
          style={{
            height: size,
            width: width,
            position: "relative",
            borderLeft: border,
            borderRight: border,
            borderBottom: border,
            borderTop: "10px solid " + color,
            borderRadius: "1px",
            overflow: "hidden",
            backgroundColor: "#fff",
            userSelect: "none",
            lineHeight: "110%",
            fontSize: "13px",
            zIndex: 700,
            outlineStyle:
              this.props.over || this.state.mouseover ? "solid" : null,
            outlineWidth: "2px",
          }}
          onMouseOver={this.mouseover}
          onMouseOut={this.mouseout}
          onDoubleClick={this.dbclick}
        >
          <div>{name}</div>
        </div>
      </div>
    );
  }
}

export default Rectangle;
