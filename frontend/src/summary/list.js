import store from "../store/store";
import React, { Component } from "react";
import Pattern from "./pattern";
import ListItem from "./listItem";
class List extends Component {
  componentDidMount() {
    store.registerComponent("List", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("List", this);
  }
  render() {
    let data = {
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
          size: 1,
          data: [
            { name: "appInit", freq: 10 },
            { name: "appInit", freq: 10 },
          ],
        },
        {
          size: 10,
          data: [
            { name: "appInit", freq: 10 },
            { name: "appInit", freq: 10 },
          ],
        },
      ],
    };
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
        <ListItem data={data} kind={0} />
        <ListItem data={data} kind={1} />
        <ListItem data={data} kind={0} />
        <ListItem data={data} kind={1} />
        <ListItem data={data} kind={0} />
        <ListItem data={data} kind={1} />
        <ListItem data={data} kind={0} />
        <ListItem data={data} kind={1} />
        <ListItem data={data} kind={0} />
        <ListItem data={data} kind={1} />
        <ListItem data={data} kind={0} />
      </div>
    );
  }
}

export default List;
