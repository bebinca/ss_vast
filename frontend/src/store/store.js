import { Component } from "react";
// import { instanceOf } from "prop-types";

// function fetchJsonData(filePath) {
//   return fetch(filePath)
//     .then((res) => res.json())
//     .catch((e) => console.error(e));
// }

class Store {
  //region Data
  count = 0;
  select = -1;
  eventColor = {
    create: "rgb(146,156,171)",
    readBoundData: "rgb(146,173,94)",
    toolTip: "rgb(206,148,178)",
    resize: "rgb(110,152,142)",
    treeStats: "rgb(229,189,53)",
    appInit: "rgb(232,141,94)",
    bindFromPrompt: "rgb(204,181,147)",
    none: "transparent",
  };
  patternData = [
    {
      events: [{ name: "haha", freq: 0 }],
      seqs: [],
      insert: [{ size: 0, data: [] }],
    },
  ];
  sequenceData = [
    {
      id: "",
      events: [],
    },
  ];
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
    SequenceData: () => {
      return this.sequenceData;
    },
    Select: () => {
      return this.select;
    },
  };
  //endregion

  //region Modify
  handleChange = {
    Select: (num) => {
      this.select = num;
      this.getComponent("Group").update(num);
      this.refreshComponent("List");
      this.refreshComponent("Group");
    },
    Add: () => {
      this.count++;
      this.refreshComponent("App");
    },
    Sub: () => {
      this.count--;
      this.refreshComponent("App");
    },
    PatternData: (data) => {
      this.patternData = data;
    },
    SequenceData: (data) => {
      this.sequenceData = data;
    },
    MouseOver: (name, pattern) => {
      this.getComponent("List").mouseover(name, pattern);
    },
    MouseOut: () => {
      this.getComponent("List").mouseout();
    },
    Dbclick: (name, pos, pattern) => {
      this.select = -1;
      this.getComponent("List").filter(name, pos, pattern);
      this.getComponent("List").mouseout();
      // this.getComponent("Group").scrolltop();
      // this.refreshComponent("Group");
      this.refreshComponent("List");
    },
    Dbclickdetail: (pos, patterndata, alignid) => {
      this.getComponent("Table").align(pos, patterndata, alignid);
      this.refreshComponent("Table");
      this.getComponent("Group").scrolltop();
      this.refreshComponent("Group");
    },
    Unfilter: () => {
      this.getComponent("Table").unalign();
      this.refreshComponent("Table");
    },
    Changefocus: (focus) => {
      this.getComponent("Filter").setState({ focus: focus, data: [[0, 1]] });
    },
  };
  //endregion

  //region Refresh
  components = {};
  getComponent(str) {
    return this.components[str];
  }
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
