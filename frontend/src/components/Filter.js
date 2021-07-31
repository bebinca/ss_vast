import store from "../store/store";
import React, { Component } from "react";
import Title from "./title";
import { fetchJsonData } from "../store/api";
import * as d3 from "d3";
// import _ from "lodash";
import "./table.css";
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alldata: { events: null },
      data: [[0, 1]],
      focus: "appInit",
    };
  }
  componentDidMount() {
    store.registerComponent("Filter", this);
    fetchJsonData("filter_data.json").then((json) => {
      this.setState({ alldata: json });
    });
  }

  componentWillUnmount() {
    store.unregisterComponent("Filter", this);
  }
  render() {
    var width = 450,
      height = 450,
      radius = Math.min(width, height) / 2 - 30;
    var data = [];
    if (this.state.alldata.events != null) {
      let index = this.state.alldata.dict[this.state.focus];
      data = this.state.alldata.res[index];
    }

    var angle = d3
      .scaleLinear()
      .domain([0, 34])
      .range([0, 2 * Math.PI]);

    var r = d3.scaleLinear().domain([1, -0.2]).range([0, radius]);
    var r1 = d3.scaleLinear().domain([4, 2061]).range([5, 15]);

    var svg = null;
    if (data.length !== 0) {
      data.reverse();
      let alldata = this.state.alldata;
      svg = d3
        .select(this.refs.filter)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      var gr = svg
        .append("g")
        .attr("class", "r axis")
        .selectAll("g")
        .data(r.ticks(8).slice(1))
        .enter()
        .append("g");

      gr.append("circle").attr("r", r);

      gr.append("text")
        .attr("y", function (d) {
          return -r(d) - 4;
        })
        .attr("transform", "rotate(0)")
        .style("text-anchor", "middle")
        .text(function (d) {
          if (d === -0.2) return null;
          return d;
        });

      var ga = svg
        .append("g")
        .attr("class", "a axis")
        .selectAll("g")
        .data(d3.range(-90, 270, 45))
        .enter()
        .append("g")
        .attr("transform", function (d) {
          return "rotate(" + d + ")";
        });

      ga.append("line").attr("x2", radius);

      var line = d3
        .lineRadial()
        .angle((d) => {
          return angle(d[0]);
        })
        .radius((d) => {
          return r(d[1]);
        });

      var res = svg.selectAll("point").data(data).enter().append("g");

      res
        .append("circle")
        .attr("class", "point")
        .attr("transform", function (d) {
          var coors = line([d]).slice(1).slice(0, -1);
          return "translate(" + coors + ")";
        })
        .attr("r", function (d, i) {
          return r1(alldata.eventsize[d[0]]);
        })
        .attr("fill", function (d, i) {
          return store.getData.Color(alldata.events[33 - i]);
        })
        .on("click", function (d, i) {
          console.log(i);
          store.handleChange.Changefocus(alldata.events[i[0]]);
          return i;
        })
        .attr("stroke", "white")
        .attr("stroke-width", "2px");

      res
        .append("text")
        .attr("y", function (d, i) {
          var coors = line([d]).slice(1).slice(0, -1);
          coors = coors.split(",").map(Number);
          return coors[1] + 12 + r1(alldata.eventsize[d[0]]);
        })
        .attr("x", function (d, i) {
          var coors = line([d]).slice(1).slice(0, -1);
          coors = coors.split(",").map(Number);
          return coors[0];
        })
        .attr("transform", "rotate(0)")
        .attr("font-size", 14)
        .style("text-anchor", "middle")
        .text(function (d, i) {
          // if (alldata.eventsize[d[0]] > 600)
          if (data[33 - d[0]][1] > 0.3) return alldata.events[d[0]].slice(0, 6);
          return null;
        });
    }

    return (
      <div style={{ height: "100%" }}>
        <Title name="Events Filter" />
        <div ref="filter" style={{ overflow: "hidden" }}></div>
      </div>
    );
  }
}

export default Filter;
