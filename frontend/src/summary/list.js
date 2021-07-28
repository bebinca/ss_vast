import store from "../store/store";
import React, { Component } from "react";
import { fetchJsonData } from "../store/api";
import ListItem from "./listItem";
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          events: [{ name: "haha", freq: 0 }],
          seqs: [],
          insert: [{ size: 0, data: [] }],
        },
      ],
      select: -1,
    };
    this.handlePatternClick = this.handlePatternClick.bind(this);
  }
  componentDidMount() {
    store.registerComponent("List", this);
    fetchJsonData("pattern_data.json").then((json) => {
      this.setState({ data: json });
      store.handleChange.PatternData(json);
    });
  }
  componentWillUnmount() {
    store.unregisterComponent("List", this);
  }
  handlePatternClick = (id) => {
    this.setState({ select: id });
    store.handleChange.Select(id);
  };
  render() {
    let color = "rgb(215,228,234)";
    const listitem = this.state.data.map((item, index) => {
      return (
        <tr
          style={{ width: "100%", zIndex: 9 }}
          onClick={this.handlePatternClick.bind(this, item.id)}
        >
          <td
            style={{
              padding: 3,
              paddingLeft: 20,
              paddingRight: 100,
              backgroundColor: item.id === this.state.select ? color : null,
            }}
          >
            <ListItem data={item} />
          </td>
        </tr>
      );
    });
    return (
      <div
        id="list"
        style={{
          overflow: "auto",
          minHeight: 500,
          maxHeight: 700,
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        <table>{listitem}</table>
      </div>
    );
  }
}

export default List;
