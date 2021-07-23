import store from "../store/store";
import React, { Component } from "react";
import Rectangle from "../summary/rectangle";
import Triangle from "../summary/triangle";
class Summary extends Component {
  componentDidMount() {
    store.registerComponent("Summary", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("Summary", this);
  }
  render() {
    return (
      <div>
        <Rectangle name="resize" size={40} />
        <Triangle size={30} />
      </div>
    );
  }
}

export default Summary;
