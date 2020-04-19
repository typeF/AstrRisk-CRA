import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as d3 from "d3";

class LineBar extends Component {
  render() {
    const marginAll = 30;
    const margin = {
        top: marginAll,
        bottom: marginAll,
        left: marginAll,
        right: marginAll,
      },
      height = 300 - margin.top - margin.bottom,
      width = 700 - margin.left - margin.right;

    const { mt } = this.props.singleNeoData;
    const dinosaurKiller = 23900573613766.73;
    const tsarBomba = 50.19120458891013;
    const fatMan = 0.02198852772466539;
    const dinosaurEnergyScale = d3
      .scaleLog()
      .domain([0.001, dinosaurKiller])
      .range([1, width]);
    const dinoFormat = dinosaurKiller.toLocaleString("en");
    return (
      <Fragment>
        <div className="infoText-line-bar">
          <span>DANGER LEVEL:</span>
        </div>
        <div className="line-bar-container">
          <img
            alt="line-bar-asteroid"
            className="line-bar-asteroid"
            src="../assets/images/meteor.svg"
            style={{ marginLeft: dinosaurEnergyScale(mt) }}
            width={60}
            height={60}
          />
          <div
            className="line-bar-image"
            style={{ marginLeft: dinosaurEnergyScale(tsarBomba) }}
          >
            <img
              alt="tsar-bomba"
              src="../assets/images/tsar.svg"
              width={70}
              height={50}
            />
            <p>Tsar Bomba Nuke</p>
            <p>(50 Mt)</p>
          </div>
          <div
            className="line-bar-image"
            style={{ marginLeft: dinosaurEnergyScale(fatMan) }}
          >
            <img
              alt="fman"
              src="../assets/images/fman.svg"
              width={50}
              height={50}
            />
            <p>Fat Man Atomic Bomb</p>
            <p>(0.021 Mt)</p>
          </div>
          <div
            className="line-bar-image"
            style={{ marginLeft: dinosaurEnergyScale(dinosaurKiller) }}
          >
            <img
              alt="extinction"
              src="../assets/images/extinction.svg"
              width={50}
              height={50}
            />
            <p>Dinosaur Extinction Event</p>
            <p className="dino-text">({dinoFormat} Mt)</p>
          </div>

          <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
          >
            <filter id="blurMe">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
            </filter>
            <rect className="line-bar-initial" width="645" y="75" height="5" />
            <rect
              y={"35"}
              className="asteroid-line"
              width={dinosaurEnergyScale(mt) + 10}
              height={15}
              style={{ fill: "red" }}
              fillOpacity={0.6}
              filter={"url(#blurMe)"}
            />
            <rect
              y={"80"}
              className="line-bar-dino"
              x={dinosaurEnergyScale(tsarBomba)}
              width={5}
              height={15}
            />
            <rect
              y={"80"}
              className="line-bar-dino"
              x={dinosaurEnergyScale(fatMan)}
              width={5}
              height={15}
            />
            <rect
              y={"80"}
              className="line-bar-dino"
              x={dinosaurEnergyScale(dinosaurKiller)}
              width={5}
              height={15}
            />
          </svg>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    singleNeoData: state.singleNeoData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LineBar);
