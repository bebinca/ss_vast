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
      oripattern: [
        {
          events: [{ name: "haha", freq: 0 }],
          seqs: [0],
          insert: [{ size: 0, data: [] }],
        },
      ],
      pattern: [
        {
          events: [{ name: "haha", freq: 0 }],
          seqs: [0],
          insert: [{ size: 0, data: [] }],
        },
      ],
      align: false,
      aligndata: [],
      alignpos: [],
      alignid: [],
      filter: false,
      filterdata: [],
    };
    this.align = this.align.bind(this);
    this.filter = this.filter.bind(this);
    this.unfilter = this.unfilter.bind(this);
  }
  align = (pos, patterndata, alignid) => {
    this.setState({
      align: true,
      alignpos: pos,
      aligndata: patterndata,
      alignid: alignid,
    });
  };
  unalign = () => {
    this.setState({ align: false });
  };
  filter = (patterndata) => {
    this.setState({ filter: true, pattern: patterndata });
  };
  unfilter = () => {
    this.setState({ filter: false, pattern: this.state.oripattern });
  };
  componentDidMount() {
    store.registerComponent("Table", this);
    fetchJsonData("sequence_data5.json").then((json) => {
      this.setState({ data: json });
    });
    fetchJsonData("pattern_data_sort.json").then((json) => {
      this.setState({ oripattern: json, pattern: json });
    });
  }
  componentWillUnmount() {
    store.unregisterComponent("Table", this);
  }
  render() {
    let data = [];
    let patt = this.state.align ? this.state.aligndata : this.state.pattern;
    for (let j = 0; j < patt.length; j++) {
      let seqs = patt[j].seqs;
      for (let i = 0; i < seqs.length; i++) {
        if (this.state.data[seqs[i]]) data.push(this.state.data[seqs[i]]);
      }
    }
    return (
      <div
        style={{
          overflow: "hidden",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <div
          id="table"
          style={{
            overflow: "auto",
            minHeight: 500,
            maxHeight: 700,
          }}
        >
          <table style={{ transition: "all 1s" }}>
            <tr>
              <th style={{ width: 20 }}>ID</th>
              <th></th>
            </tr>
            <Group
              data={data}
              align={this.state.align}
              alignpos={this.state.alignpos}
              alignid={this.state.alignid}
            />
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
