import React, { Component } from "react";
import store from "../store/store";
import Title from "./title";
import Circle from "../detail/circle";
class Detail extends Component {
  componentDidMount() {
    store.registerComponent("Detail", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("Detail", this);
  }
  render() {
    return (
      <div>
        <Title name="Data" />
        <Circle name="appInit" />
        <Circle name="appInit" />
        <Circle name="appInit" />
        <Circle name="appInit" />
      </div>
    );
  }
}

export default Detail;
