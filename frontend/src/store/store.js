import { Component } from "react";
import { instanceOf } from "prop-types";

function fetchJsonData(filePath) {
  return fetch(filePath)
    .then((res) => res.json())
    .catch((e) => console.error(e));
}

class Store {
  //region Data
  count = 0;
  eventColor = {
    create: "rgb(146,156,171)",
    readBoundData: "rgb(146,173,94)",
    toolTip: "rgb(206,148,178)",
    resize: "rgb(110,152,142)",
    treeStats: "rgb(229,189,53)",
    appInit: "rgb(232,141,94)",
    bindFromPrompt: "rgb(204,181,147)",
  };
  patternData = [];
  //endregion

  //region GetData
  getData = {
    Count: () => {
      return this.count;
    },
    Color: (name) => {
      if (this.eventColor[name]) return this.eventColor[name];
      else return "rgb(204,204,204)";
    },
    PatternData: () => {
      return this.patternData;
    },
  };
  //endregion

  //region Modify
  handleChange = {
    Add: () => {
      this.count++;
      this.refreshComponent("App");
    },
    Sub: () => {
      this.count--;
      this.refreshComponent("App");
    },
    PatternDataInit: () => {
      fetchJsonData("pattern_data.json").then((json) => {
        this.patternData = json;
      });
    },
  };
  //endregion

  //region Refresh
  components = {};

  registerComponent(str, component) {
    if (!(component instanceof Component) || !(typeof str === "string")) return;
    this.components[str] = component;
    if (!component.state || !component.state.storeAutoRefresh)
      component.setState({ storeAutoRefresh: true });
  }

  unregisterComponent(str, component) {
    if (!(component instanceof Component) || !(typeof str === "string")) return;
    if (this.components[str] === component) this.components[str] = undefined;
  }

  refreshComponent(str) {
    if (!(typeof str === "string")) return;
    if (this.components.hasOwnProperty(str))
      this.components[str].setState((state) => ({
        storeAutoRefresh: !state.storeAutoRefresh,
      }));
  }

  //endregion
}

const store = new Store();

export default store;
