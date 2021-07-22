import store from "../store/store";
import React, { Component } from "react";
import Rectangle from "../apis/rectangle";
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
      </div>
    );
  }
}

export default Summary;
