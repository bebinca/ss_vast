import React, { Component } from "react";
import Events from "./events";
import store from "../store/store";
class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: -1,
    };
  }
  update(num) {
    this.setState({ select: num });
    let x = 0;
    for (let i = 0; i < this.props.data.length; i++) {
      if (this.props.data[i].belong === num) {
        x = i;
        break;
      }
    }
    document
      .getElementById("table")
      .scrollTo({ top: 19.71 * x, behavior: "smooth" });
  }
  componentDidMount() {
    store.registerComponent("Group", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("Group", this);
  }
  render() {
    const tableitem = this.props.data.map((item, index) => {
      if (item) {
        return (
          <tr
            style={{
              width: "100%",
              backgroundColor:
                item.belong === this.state.select ? "rgb(215,228,234)" : null,
            }}
          >
            <td>{item.id}</td>
            <td style={{ padding: 2, paddingLeft: 15 }}>
              <Events data={item.events} />
            </td>
          </tr>
        );
      } else return null;
    });
    return <div>{tableitem}</div>;
  }
}

export default Group;
