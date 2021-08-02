import store from "../store/store";
import React, { Component } from "react";
import Title from "./title";
import { fetchJsonData } from "../store/api";
import * as d3 from "d3";
import ReactDOM from "react-dom";
// import _ from "lodash";
import "./table.css";
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alldata: { events: null },
      data: [[0, 1]],
      focus: "appInit",
      ss: "select",
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
    let coorss = [];
    let alldata = this.state.alldata;
    if (data.length !== 0) {
      data.reverse();
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

      var res = svg
        .append("g")
        .attr("class", "data")
        .selectAll("point")
        .data(data)
        .enter()
        .append("g");
      res
        .append("circle")
        .attr("class", "point")
        .attr("transform", function (d) {
          console.log("transform", d);
          var coors = line([d]).slice(1).slice(0, -1);
          let coorsa = coors.split(",").map(Number);
          coorss.push(coorsa);
          return "translate(" + coors + ")";
        })
        .attr("r", function (d) {
          return r1(alldata.eventsize[d[0]]);
        })
        .attr("fill", function (d, i) {
          return store.getData.Color(alldata.events[d[0]]);
        })
        .on("click", function (d, i) {
          let index = alldata.dict[alldata.events[i[0]]];
          let newdata = alldata.res[index];
          newdata = newdata.reverse();
          let x = this.parentNode.parentNode.childNodes;

          for (let i = 0; i < x.length; i++) {
            // i = 33, node 0
            d3.select(x[i])
              .select("circle")
              .transition()
              .duration(600)
              .ease(d3.easeElastic)
              .attr("transform", function () {
                var coors = line([newdata[i]]).slice(1).slice(0, -1);
                let coorsa = coors.split(",").map(Number);
                coorss[i] = coorsa;
                return "translate(" + coors + ")";
              })
              .attr("r", function () {
                return r1(alldata.eventsize[newdata[i][0]]);
              });
            d3.select(x[i])
              .select("text")
              .transition()
              .duration(600)
              .ease(d3.easeElastic)
              .attr("y", function () {
                var coors = line([newdata[i]]).slice(1).slice(0, -1);
                coors = coors.split(",").map(Number);
                return coors[1] + 12 + r1(alldata.eventsize[newdata[i][0]]);
              })
              .attr("x", function () {
                var coors = line([newdata[i]]).slice(1).slice(0, -1);
                coors = coors.split(",").map(Number);
                return coors[0];
              })
              .text(function () {
                if (newdata[i][1] > 0.3)
                  return alldata.events[newdata[i][0]].slice(0, 6);
                return null;
              });
          }
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
          if (data[i][1] > 0.3) return alldata.events[d[0]].slice(0, 6);
          return null;
        });
    }
    const brush = d3
      .brush()
      .extent([
        [-width, -height],
        [width, height],
      ])
      .on("end", brushended);

    function brushended(d) {
      let pos = d.selection; // select pos
      let res = [];
      let nodes = this.parentNode.childNodes[2].childNodes;
      if (coorss && pos) {
        for (let x = 0; x < nodes.length; x++) {
          let coor = coorss[x];
          if (
            coor[0] >= pos[0][0] &&
            coor[0] <= pos[1][0] &&
            coor[1] >= pos[0][1] &&
            coor[1] <= pos[1][1]
          ) {
            res.push(alldata.events[33 - x]);
          }
        }
        store.handleChange.Filter(res);
      }
    }
    let hello = () => {
      if (this.state.ss === "select") {
        console.log("here1");
        // eslint-disable-next-line
        this.state.ss = "cancel";
        let svg =
          ReactDOM.findDOMNode(this).childNodes[2].childNodes[0].childNodes[0];
        d3.select(svg).append("g").attr("class", "brush").call(brush);
      } else {
        console.log("here2");
        // eslint-disable-next-line
        this.state.ss = "select";
        let svg =
          ReactDOM.findDOMNode(this).childNodes[2].childNodes[0].childNodes[0];
        svg.removeChild(svg.childNodes[3]);
        store.getComponent("List").setState({
          filter1: false,
          filterData1: [],
        });
        let ori = store.getComponent("Table").state.oripattern;
        store.getComponent("Table").setState({ filter: false, pattern: ori });
      }
    };
    return (
      <div style={{ height: "100%" }}>
        <Title name="Events Filter" />
        <button onClick={hello}>{this.state["ss"]}</button>
        <div ref="filter" style={{ overflow: "hidden" }}></div>
      </div>
    );
  }
}

export default Filter;
