import store from "../store/store";
import React, { Component } from "react";
import { fetchJsonData } from "../store/api";
import Group from "./group";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: "",
          events: [],
        },
      ],
      pattern: [
        {
          events: [{ name: "haha", freq: 0 }],
          seqs: [0],
          insert: [{ size: 0, data: [] }],
        },
      ],
    };
  }
  componentDidMount() {
    store.registerComponent("Table", this);
    fetchJsonData("sequence_data.json").then((json) => {
      this.setState({ data: json });
    });
    fetchJsonData("pattern_data.json").then((json) => {
      this.setState({ pattern: json });
    });
  }
  componentWillUnmount() {
    store.unregisterComponent("Table", this);
  }
  render() {
    let data = [];
    for (let j = 0; j < this.state.pattern.length; j++) {
      let seqs = this.state.pattern[j].seqs;
      for (let i = 0; i < seqs.length; i++) {
        if (this.state.data[seqs[i]]) data.push(this.state.data[seqs[i]]);
      }
    }
    return (
      <div
        id="table"
        style={{
          overflow: "auto",
          paddingLeft: 3,
          paddingRight: 3,
          minHeight: 500,
          maxHeight: 700,
        }}
      >
        <table>
          <tr>
            <th style={{ width: 20 }}>ID</th>
            <th></th>
          </tr>
          <Group data={data} />
        </table>
      </div>
    );
  }
}

export default Table;
