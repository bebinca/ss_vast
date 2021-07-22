import store from "../store/store";
import React, { Component } from "react";
class Header extends Component {
  componentDidMount() {
    store.registerComponent("Header", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("Header", this);
  }
  render() {
    return <div></div>;
  }
}

export default Header;
