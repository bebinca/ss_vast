import store from "../store/store";
import React, { Component } from "react";
import List from "../summary/list";
class Summary extends Component {
  componentDidMount() {
    store.registerComponent("Summary", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("Summary", this);
  }
  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        <div>Sequence Clusters</div>
        <List />
      </div>
    );
  }
}

export default Summary;
