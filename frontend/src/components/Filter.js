import store from "../store/store";
import React, { Component } from "react";
import Title from "./title";
import * as d3 from "d3";
// import _ from "lodash";
import "./table.css";
class Filter extends Component {
  componentDidMount() {
    store.registerComponent("Filter", this);
  }

  componentWillUnmount() {
    store.unregisterComponent("Filter", this);
  }
  render() {
    var width = 450,
      height = 450,
      radius = Math.min(width, height) / 2 - 30;
    var data = [
      [0, 1],
      [6, 0.2],
      [0, 0], // direction, size
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
      [Math.random() * 34, Math.random()],
    ];

    var angle = d3
      .scaleLinear()
      .domain([0, 34])
      .range([0, 2 * Math.PI]);

    var r = d3.scaleLinear().domain([1, -0.2]).range([0, radius]);

    var svg = d3
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
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var line = d3
      .lineRadial()
      .angle((d) => {
        return angle(d[0]);
      })
      .radius((d) => {
        return r(d[1]);
      });
    svg
      .selectAll("point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("transform", function (d) {
        var coors = line([d]).slice(1).slice(0, -1);
        return "translate(" + coors + ")";
      })
      .attr("r", 8)
      .attr("fill", function (d, i) {
        return color(i);
      })
      .on("click", function (d, i) {
        console.log(i);
        return i;
      })
      .attr("stroke", "white")
      .attr("stroke-width", "2px");
    return (
      <div style={{ height: "100%" }}>
        <Title name="Events Filter" />
        <div ref="filter"></div>
      </div>
    );
  }
}

export default Filter;
