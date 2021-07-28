import React, { Component } from "react";
import store from "../store/store";
import Title from "./title";
import Table from "../detail/table";
import "./table.css";
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
        <Table />
      </div>
    );
  }
}

export default Detail;
