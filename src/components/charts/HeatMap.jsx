import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getAnnualNeoData,
  getNeoData,
  closePopUp,
  changeSlider,
} from "../../actions/actions";
import * as d3 from "d3";
import moment from "moment";

class HeatMap extends Component {
  componentDidMount() {
    this.makeHeatMap(this.props.annualData);
  }

  componentWillReceiveProps({ annualData }) {
    this.makeHeatMap(annualData);
  }

  shouldComponentUpdate() {
    return false;
  }

  makeHeatMap(data2) {
    // Margin for the graph
    const marginAll = 100;
    const margin = {
        top: marginAll,
        right: marginAll,
        bottom: marginAll,
        left: marginAll,
      },
      width = 1400 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    // Provides node for D3 to hook onto
    const heatMapNode = this.refs.heatMap;
    const g = d3.select(heatMapNode);

    const gridSize = Math.floor(width / 31),
      colors = [
        "#3288bd",
        "#66c2a5",
        "#abdda4",
        "#e6f598",
        "#fee08b",
        "#fdae61",
        "#f46d43",
        "#d53e4f",
      ], // red green and blue
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      days = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
      ],
      legendLabels = [
        "0-1",
        "2-3",
        "4-5",
        "6-7",
        "8-9",
        "10-11",
        "12-13",
        "14+",
      ];

    // Scaler for assigning values to a color
    const colorScale = d3.scaleQuantile().domain([0, 14]).range(colors);

    // Generate Y-Axis
    g.selectAll(".heatmap-yAxis")
      .data(months)
      .enter()
      .append("text")
      .text((d) => {
        return d;
      })
      .attr("x", 0)
      .attr("y", (d, i) => {
        return i * (gridSize + 3);
      })
      .attr("transform", "translate(" + -10 + "," + 25 + ")")
      .attr("class", "heatmap-axis");

    // Generate X-Axis
    g.selectAll(".heatmap-xAxis")
      .data(days)
      .enter()
      .append("text")
      .text((d) => {
        return d;
      })
      .attr("x", (d, i) => {
        return i * (gridSize + 3);
      })
      .attr("y", 0)
      .attr("transform", "translate(" + 20 + "," + -8 + ")")
      .attr("class", "heatmap-axis heatmap-xAxis");

    // Legend node for d3
    const legendNode = d3.select(heatMapNode);

    // Generates legend labels
    legendNode
      .selectAll(".heatmap-legend")
      .data(legendLabels)
      .enter()
      .append("text")
      .text((d) => {
        return d;
      })
      .attr("x", (d, i) => {
        return gridSize * 2 * i;
      })
      .attr("y", 0)
      .attr("transform", "translate(" + 38 + "," + height + ")")
      .attr("class", "heatmap-legend-text");

    // Generates the legend description
    d3.select(heatMapNode)
      .append("text")
      .text("Number of NEOs near Earth")
      .attr("transform", "translate(" + 120 + "," + (height - 50) + ")")
      .attr("class", "heatmap-legend-text");

    // Generates the legend bars
    const legendBars = d3.select(heatMapNode);
    legendBars
      .selectAll(".heatmap-legend-bar")
      .data(colors)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        return gridSize * 2 * i;
      })
      .attr("y", height - 40)
      .attr("width", gridSize * 2)
      .attr("height", gridSize / 2)
      .style("fill", (d) => {
        return d;
      })
      .attr("class", "heatmap-legend-bar");

    // Generates a heat map
    const heatMapChart = (data) => {
      // Heatmap tiles
      const tiles = g.selectAll(".day").data(data, (d) => {
        return d.month + ":" + d.day;
      });

      // Heatmap tooltip
      const tooltip = d3
        .select(".heatmap-tooltip-node")
        .append("div")
        .style("opacity", 0)
        .attr("class", "heatmap-tooltip");

      // Heatmap Date div
      const heatMapDate = d3
        .select(".heatmap-date")
        .append("div")
        .style("opacity", 0)
        .attr("class", "heatmap-date-text");

      // Heatmap neo count div
      const heatMapNeoCount = d3
        .select(".heatmap-neo-count")
        .append("div")
        .style("opacity", 0)
        .attr("class", "heatmap-neo-count-text");

      // Creates heat map tiles based on data
      tiles
        .enter()
        .append("rect")
        .attr("x", (d) => {
          return (d.day - 1) * (gridSize + 3);
        })
        .attr("y", (d) => {
          return (d.month - 1) * (gridSize + 3);
        })
        .attr("rx", 4) // rectangle radius
        .attr("ry", 4)
        .attr("class", "grid-border")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", colors[0])

        // click handler that selects the new date
        .on("click", (d) => {
          const target = d3.select(`.S${d.date}`);
          target.attr("width", gridSize).attr("height", gridSize);
          d3.selectAll(`.heatmap-squares`)
            .transition()
            .duration(1500)
            .ease(d3.easeCubic)
            .style("fill", "black");
          d3.selectAll(`.heatmap-legend-bar`)
            .transition()
            .duration(1500)
            .ease(d3.easeCubic)
            .style("fill", "black");
          setTimeout(() => {
            this.props.getNeoData(d.date);
            this.props.closePopUp();
            this.props.changeSlider(moment(d.date).dayOfYear());
          }, 1175);
        })
        .attr("class", (d) => {
          return `heatmap-squares S${d.date}`;
        })

        // Transition effects for mouseover that adds a tooltip popup with current date
        .on("mouseover", (d) => {
          const target = d3.select(`.S${d.date}`);
          target
            .transition()
            .duration(300)
            .attr("width", gridSize * 0.9)
            .attr("height", gridSize * 0.9)
            .style("fill", "white");
          tooltip.transition().duration(200).style("opacity", 1);
          tooltip
            .html(`${d.value}`)
            .style("left", d.day * (gridSize + 3) + -4 + "px")
            .style("top", (d.month - 1) * (gridSize + 3) + 40 + "px");
          heatMapDate.transition().duration(200).style("opacity", 1);
          heatMapDate
            .html(moment(d.date).format("dddd, MMMM Do YYYY"))
            .style("left", width / 2 + "px")
            .style("top", -gridSize * 2 + "px");
          heatMapNeoCount.transition().duration(200).style("opacity", 1);
          heatMapNeoCount.html(`${d.value}`);
        })
        .on("mouseout", (d) => {
          const target = d3.select(`.S${d.date}`);
          target
            .transition()
            .duration(1400)
            .attr("width", gridSize)
            .attr("height", gridSize)
            .style("fill", (d) => {
              return colorScale(d.value);
            });
          tooltip.transition().duration(300).style("opacity", 0);
          heatMapDate.transition().duration(2000).style("opacity", 0);
          heatMapNeoCount.transition().duration(2000).style("opacity", 0);
        })
        .transition()
        .duration(1300)
        .ease(d3.easeCubic)
        .style("fill", (d) => {
          return colorScale(d.value);
        });

      tiles.exit().remove();
    };
    heatMapChart(this.props.annualData);
  }
  render() {
    const marginAll = 50;
    const margin = {
        top: marginAll,
        right: marginAll,
        bottom: marginAll,
        left: marginAll,
      },
      width = 1400 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    return (
      <Fragment>
        <div className="heatmap">
          <div className="heatmap-date"></div>
          <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
          >
            <g
              className="heatmap"
              ref="heatMap"
              transform={"translate(" + margin.left + "," + 30 + ")"}
            ></g>
          </svg>
          <div className="heatmap-tooltip-node"></div>
          <div className="heatmap-neo-count">
            <div className="heatmap-neo-count-title">Neo count:</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    annualData: state.annualData,
    currentDate: state.currentDate,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAnnualNeoData,
      getNeoData,
      closePopUp,
      changeSlider,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HeatMap);
