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
    if (num !== -1) {
      for (let i = 0; i < this.props.data.length; i++) {
        if (this.props.data[i].belong === num) {
          x = i;
          break;
        }
      }
    }
    document
      .getElementById("table")
      .scrollTo({ top: 19.71 * x, behavior: "smooth" });
    console.log(x);
  }
  scrolltop() {
    this.setState({ select: -1 });
    document.getElementById("table").scrollTo({ top: 0, behavior: "auto" });
  }
  componentDidMount() {
    store.registerComponent("Group", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("Group", this);
  }
  render() {
    // console.log(this.props.alignid);
    // console.log(this.props.alignpos);
    const tableitem = this.props.data.map((item, index) => {
      let left = -1;
      let insert = 0;
      if (item) {
        if (this.props.align) {
          let temp =
            this.props.alignid[item.belong] >= 0
              ? this.props.alignpos[this.props.alignid[item.belong]]
              : -1;
          let i = 0;
          for (i = 0; i < item.events.length; i++) {
            if (item.events[i].pos === temp) {
              left = i;
              break;
            }
            if (item.events[i].pos > temp) {
              left = i;
              insert = 1;
              break;
            }
          }
          if (i === item.events.length) {
            left = i;
            insert = 1;
          }
        }
        return (
          <tr
            style={{
              width: "100%",
              backgroundColor:
                item.belong === this.state.select ? "rgb(215,228,234)" : null,
            }}
          >
            <td style={{ paddingRight: 15 }}>{item.id}</td>
            <td style={{ padding: 2, overflow: "hidden", minWidth: 590 }}>
              {/* click=0 no align click=1 align pos click =2 align name*/}
              <Events data={item.events} left={left} insert={insert} />
            </td>
          </tr>
        );
      } else return null;
    });
    return <div style={{ width: "100%" }}>{tableitem}</div>;
  }
}

export default Group;
