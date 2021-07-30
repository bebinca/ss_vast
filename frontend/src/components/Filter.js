import store from "../store/store";
import React, { Component } from "react";
import Title from "./title";
import * as d3 from "d3";
class Filter extends Component {
  componentDidMount() {
    store.registerComponent("Filter", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("Filter", this);
  }
  render() {
    return (
      <div>
        <Title name="Events Filter" />
      </div>
    );
  }
}

export default Filter;
