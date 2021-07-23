import store from "../store/store";
import React, { Component } from "react";
import Rectangle from "../apis/rectangle";
import Triangle from "../apis/triangle";
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
        <Rectangle name="appInit" size={40} />
        <Triangle size={30} />
      </div>
    );
  }
}

export default Summary;
