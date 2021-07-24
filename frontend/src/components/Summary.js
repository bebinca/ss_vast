import store from "../store/store";
import React, { Component } from "react";
import List from "../summary/list";
import Title from "./title";
class Summary extends Component {
  componentDidMount() {
    store.registerComponent("Summary", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("Summary", this);
  }
  render() {
    return (
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <Title name="Sequence Clusters" />
        <List />
      </div>
    );
  }
}

export default Summary;
