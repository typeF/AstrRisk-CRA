import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
import { toggleDangerBar } from '../../actions/actions';
import * as d3 from 'd3';

class RadarChart extends Component {
  constructor() {
    super()

    this.state = {
      showDangerPrompt: false
    }
  }

  render() {
    const { speed, distance, diameter, mt, mass } = this.props;

    const distanceScale = d3.scaleLinear().domain([0, 55000000]).range([1, 0]);
    const diameterScale = d3.scaleLinear().domain([0, 800]).range([0, 1]);
    const massScale = d3.scaleLinear().domain([0, 9100000000]).range([0, 1]);
    const velocityScale = d3.scaleLinear().domain([0, 17000]).range([0, 1]);
    const energyScale = d3.scaleLinear().domain([0, 100]).range([0, 1]);

    const data = [
      [
        { axis: 'Distance', value: valueParser(distanceScale(distance)) },
        { axis: 'Diameter', value: valueParser(diameterScale(diameter)) },
        { axis: 'Mass', value: valueParser(massScale(mass)) },
        { axis: 'Relative Velocity', value: valueParser(velocityScale(speed * 1000)) },
        { axis: 'Energy (megatons)', value: valueParser(energyScale(mt)) }
      ]
    ]

    const nukeData = [
      [
        { axis: 'Null', value: 0.1},
        { axis: 'Null', value: 0.1},
        { axis: 'Null', value: 0.1},
        { axis: 'Null', value: 0.1},
        { axis: 'Tsar Bomba', value: valueParser(energyScale(50))}
      ],
      [
        { axis: 'Null', value: 0.1},
        { axis: 'Null', value: 0.1},
        { axis: 'Null', value: 0.1},
        { axis: 'Null', value: 0.1},
        { axis: 'Little Boy', value: valueParser(energyScale(18))}
      ]
      
    ]
    
    function valueParser (value) {
      if (value > 1) return 1
      if (value < 0.1) return 0.1
      else return value
    }

    const color = d3.scaleOrdinal(d3['schemeCategory20'])

    const margin = {top: 100, bottom: 100, left: 100, right: 100 },
           width = 600 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom,
          radius = Math.min(width, height) / 2;

    const angleSlice = Math.PI * 2 / 5;

    const rScale = d3.scaleLinear().domain([0, 1]).range([0, radius]);

    const cx = (value, i) => { return rScale(value) * Math.cos(angleSlice * i - Math.PI / 2) };
    const cy = (value, i) => { return rScale(value) * Math.sin(angleSlice * i - Math.PI / 2) };
    const lx = (value, i) => { return rScale(value) * Math.cos(angleSlice * i * 2 - Math.PI / 2) };
    const ly = (value, i) => { return rScale(value) * Math.sin(angleSlice * i * 2 - Math.PI / 2) };

    // Renders data blob
    var radarLine = d3.lineRadial()
      .curve(d3.curveCardinalClosed)
      .radius(d => { return rScale(d.value) })
      .angle((d, i) => { return i * angleSlice });

    // Neo Data
    const radarDataPath = radarLine(data[0])
    //Tsar Bomba
    const tsarBomba = radarLine(nukeData[0])
    //Little boy
    const littleBoy = radarLine(nukeData[1])


    // Datablob discrete points
    const dataDots = (
      data[0].map((item, i) => (
        <circle cx={cx(item.value, i)} cy={cy(item.value, i)} r={4} key={Math.floor(Math.random() * 800)} stroke={color(16)} fill={color(16)} />
      ))
    )

    // Generates circular grid
    const graphGrid = (
      [1, 2, 3].map((item, i) => (
        <circle cx={0} cy={0} r={radius * (i + 1) / 3} key={Math.floor(Math.random() * 800)} stroke={"#42f498"} strokeOpacity={0.5} fill={'#42f498'} fillOpacity={0.075} />
      ))
    )

    // Generates grid lines radiating from center
    const gridLines = d3.lineRadial()
      .curve(d3.curveCardinalClosed)
      .radius(d => { return rScale(d.value) })
      .angle((d, i) => { return i * angleSlice });
      

    // Axis line generator
    const axisLines = d3.line()
    .x(d => { return d.x })
    .y(d => { return d.y })
    
    // Generates axis path
    const graphAxis = (
      [1, 2, 3, 4, 5].map((item, i) => (
        axisLines([{ x: 0, y: 0 }, { x: lx(1, i), y: ly(1, i) }])
      ))
    )

    return (
      <Fragment>
        <div className="radar-chart">
          <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
            <g transform={"translate(" + (width + margin.left + margin.right) / 2 + "," + (height + margin.top) / 2 + ")"}>
              <filter id="blurMe">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
              </filter>
              {graphGrid}
              <path stroke={'#CDCDCD'} key={19090} d={graphAxis} strokeOpacity={0.5} fillOpacity={0.2}/>
              {dataDots}
              <text x={-40} y={-(radius + 20)} fill="white" fontFamily="Roboto Mono" fontSize="16">Proximity</text>
              <text x={lx(1.1, 1) - 5} y={ly(1.1, 1) + 10} fill="white" fontFamily="Roboto Mono" fontSize="16">Mass</text>
              <text x={lx(1.40, 2)} y={ly(1.40, 2) + 20} fill="white" fontFamily="Roboto Mono" fontSize="16">Energy</text>
              <text x={lx(1.1, 3)} y={ly(1.1, 3)} fill="white" fontFamily="Roboto Mono" fontSize="16">Diameter</text>
              <text x={lx(1.2, 4) - 40} y={ly(1.2, 4)} fill="white" fontFamily="Roboto Mono" fontSize="16">Velocity</text>
              <g id="radar-chart-data-blob" onClick={e => this.props.toggleDangerBar()} onMouseEnter={e => this.setState({ showDangerPrompt: true })} onMouseLeave={e => this.setState({ showDangerPrompt: false })}>
                <path key={267229} d={radarDataPath} />
              </g>
              <path id={"radar-blob-outline"} key={299933} stroke={'#4fd4fd'} d={radarDataPath} strokeWidth={"3px"} fill={'none'} filter={'url(#blurMe)'} />
            </g>
          </svg>
          <div className="radar-chart-toggle-danger-bar"> 
            {this.state.showDangerPrompt && <span>Click to show danger level</span>}
          </div>
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleDangerBar,  
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RadarChart);


