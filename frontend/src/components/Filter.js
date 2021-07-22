import store from "../store/store";
import React, { Component } from "react";
class Filter extends Component {
  componentDidMount() {
    store.registerComponent("Filter", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("Filter", this);
  }
  render() {
    return <div></div>;
  }
}

export default Filter;
