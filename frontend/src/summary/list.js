import store from "../store/store";
import React, { Component } from "react";
import Pattern from "./pattern";
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
    };
  }
  componentDidMount() {
    store.handleChange.PatternDataInit();
    store.registerComponent("List", this);
    fetchJsonData("pattern_data.json").then((json) => {
      console.log(json);
      this.setState({ data: json });
    });
  }
  componentWillUnmount() {
    store.unregisterComponent("List", this);
  }
  render() {
    let data = [
      {
        events: [
          { name: "appInit", freq: 50 },
          { name: "create", freq: 29 },
          { name: "resize", freq: 20 },
          { name: "toolTip", freq: 17 },
        ],
        seqs: [
          14, 16, 22, 25, 26, 29, 39, 46, 52, 55, 57, 63, 64, 66, 73, 74, 83,
        ],
        insert: [
          {
            size: 10,
            data: [
              { name: "appInit", freq: 10 },
              { name: "appInit", freq: 10 },
            ],
          },
          {
            size: 30,
            data: [
              { name: "appInit", freq: 10 },
              { name: "appInit", freq: 10 },
            ],
          },
          {
            size: 5,
            data: [
              { name: "appInit", freq: 10 },
              { name: "appInit", freq: 10 },
            ],
          },
          {
            size: 10,
            data: [],
          },
          {
            size: 10,
            data: [
              { name: "appInit", freq: 20 },
              { name: "resize", freq: 0 },
            ],
          },
        ],
      },
    ];
    console.log(this.state.data);
    const listitem = this.state.data.map((item, index) => (
      <ListItem data={item} kind={index % 2} />
    ));
    return (
      <div
        style={{
          overflow: "auto",
          minHeight: 500,
          maxHeight: 700,
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        {listitem}
        {/* <ListItem data={data} kind={0} />
        <ListItem data={data} kind={1} />
        <ListItem data={data} kind={0} />
        <ListItem data={data} kind={1} />
        <ListItem data={data} kind={0} />
        <ListItem data={data} kind={1} />
        <ListItem data={data} kind={0} />
        <ListItem data={data} kind={1} />
        <ListItem data={data} kind={0} />
        <ListItem data={data} kind={1} />
        <ListItem data={data} kind={0} /> */}
      </div>
    );
  }
}

export default List;
