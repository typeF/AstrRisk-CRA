import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
import { getAnnualNeoData } from '../../actions/actions';
import * as d3 from 'd3';
import moment from 'moment';

class BarChart extends Component {

  componentDidMount() {
    this.makeAxis();
  }

  componentDidUpdate() {
    this.makeAxis();
  }

  makeAxis() {
    // Margin for the graph
    const marginAll = 100;
    const margin = { top: marginAll, right: marginAll, bottom: marginAll, left: marginAll },
      width = 1400 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    const axisTicks = ["", 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Scales x-axis & y-axis to the width and height
    const xScale = d3.scaleTime().domain([new Date('2018-01-01'), new Date('2018-12-31')]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 20]).range([height, 0]);

    const xNode = this.refs.xAxis;
    const yNode = this.refs.yAxis;

    const xAxis = d3.select(xNode)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b')))
      .selectAll("text")
      .attr('stroke', '#fff')
      .attr('class', 'axis')
      .attr('transform', 'translate(50, 0)');

    const yAxis = d3.select(yNode)
      .call(d3.axisLeft(yScale).ticks(4))
      .selectAll("text")
      .attr('class', 'y-axis')
      .attr('stroke', '#fff')
  }

  printData() {
    console.log('result: ', moment('2015-03-03').dayOfYear());
  }

  render() {
    const { annualData } = this.props;

    // Margin for the graph
    const marginAll = 100;
    const margin = { top: marginAll, right: marginAll, bottom: marginAll, left: marginAll },
      width = 1400 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    var color = d3.scaleOrdinal(d3['schemeCategory20'])

    // Scales points along y-axis
    const barScale = d3.scaleLinear().domain([0, 20]).range([0, height]);
    // Scales points along the x-axis
    const horizontalScale = d3.scaleLinear().domain([1,365]).range([0, width])
    const bars = (
        annualData.map((day, i) => (
        <rect onClick={e => console.log('hello')} width={1} height={barScale(day.length)} y={10 - barScale(day.length)} x={horizontalScale(day.dayOfYear)} stroke={'#fff'} fill={'#fff'} fillOpacity={0.5} strokeOpacity={1} />
      ))
    )

    // Generates connected chart line 
    const chartLine = d3.line()
                        .y(d => { return (barScale(d.length) * -1) })
                        .x((d, i) => { return horizontalScale(d.dayOfYear)})
                        .curve(d3.curveBasis)

    // Generates area chart path
    const chartArea = d3.area()
                        .y1(d => { return (barScale(d.length) * -1) })
                        .y0(d => { return height / 50})
                        .x((d, i) => { return horizontalScale(d.dayOfYear) })
                        .curve(d3.curveBasis)

    const lineGraphPath = chartLine(annualData);
    const areaGraphPath = chartArea(annualData);

    return (
      <Fragment>
        <div className="infoPopupContainer">
          <div className="chart barchart-annual-data">
            <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
              <g transform={"translate(" + (margin.left + 1) + "," + (height - 10 + margin.bottom) + ")"}>
                {/* <path transform={"translate(" + 0 + "," + 0 + ")"} stroke={'#f4e842'} fill={'#f4e842'} key={24219} d={areaGraphPath} strokeOpacity={0.9}/> */}
                {/* <path transform={"translate(" + 0 + "," + -300 + ")"} stroke={'#f4e842'} fill={'none'} key={24219} d={lineGraphPath} strokeOpacity={0.9}/> */}
                {bars}
              </g>
              <g className="x-axis" ref="xAxis" transform={"translate(" + margin.left + "," + (height + margin.bottom) + ")"}></g>
              <g className="y-axis" ref="yAxis" transform={"translate(" + margin.left + "," + margin.bottom + ")"}></g>
            </svg>
          </div>
        </div>
        {/* <button onClick={e => this.changeDataSet()}>Change dataset</button> */}
        {/* <button onClick={e => this.printData()}>Reload Data</button> */}
      </Fragment>
    )


  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    testState: state.testReducer,
    annualData: state.annualData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnualNeoData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);


