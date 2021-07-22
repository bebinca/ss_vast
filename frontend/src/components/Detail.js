import React, { Component } from "react";
import store from "../store/store";
class Detail extends Component {
  componentDidMount() {
    store.registerComponent("Detail", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("Detail", this);
  }
  render() {
    return <div></div>;
  }
}

export default Detail;
