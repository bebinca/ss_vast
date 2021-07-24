import React, { Component } from "react";
import { withStyles, Button } from "@material-ui/core";
import clsx from "clsx";
import store from "../store/store";
import Detail from "./Detail";
import Filter from "./Filter";
import Summary from "./Summary";
import Header from "./Header";

const styles = {
  root: {
    width: "100%",
    backgroundColor: "#ededed",
    position: "relative",
    width: "100vw",
    height: "100vh",
  },
  count: {
    fontSize: "40px",
    textAlign: "center",
  },
  view: {
    //border: "0.5px solid #eaeaea",
    borderRadius: "2px",
    backgroundColor: "#fff",
    boxShadow:
      "0 1px 1px 0 rgba(0, 0, 0, 0.19), 0 1px 1px 0 rgba(0, 0, 0, 0.19)",
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 30,
  },
  filter: {
    position: "absolute",
    top: 40,
    bottom: 40,
    left: 8,
    width: 450,
  },
  summary: {
    position: "relative",
    top: 40,
    bottom: 40,
    left: 468,
    width: 650,
  },
  detail: {
    position: "absolute",
    top: 40,
    bottom: 40,
    left: 1128,
    right: 8,
  },
};

class App extends Component {
  componentDidMount() {
    store.registerComponent("App", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("App", this);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {/* <div className={classes.count}>{store.getData.Count()}</div>
        <Button onClick={store.handleChange.Add}>Add 1</Button>
        <Button onClick={store.handleChange.Sub}>Sub 1</Button> */}
        <div className={clsx(classes.view, classes.header)}>
          <Header />
        </div>
        <div className={clsx(classes.view, classes.filter)}>
          <Filter />
        </div>
        <div className={clsx(classes.view, classes.summary)}>
          <Summary />
        </div>
        <div className={clsx(classes.view, classes.detail)}>
          <Detail />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
