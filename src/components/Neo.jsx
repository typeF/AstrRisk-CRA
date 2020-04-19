import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as d3 from "d3";
import RadarChart from "./charts/RadarChart.jsx";
import BarChart from "./charts/BarChart.jsx";
import * as MdIconPack from "react-icons/lib/md";
import { showPopUp, showNeoPopUp } from "../actions/actions.js";

class Neo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlighted: false,
    };
  }

  highlightOrbit() {
    this.setState({ highlighted: !this.state.highlighted });
  }

  render() {
    const { distance, avgDiameter, speed, hazard } = this.props;
    let { name } = this.props;
    const neoName = name;
    const volume = (4 / 3) * Math.PI * Math.pow(avgDiameter / 2, 3);
    const mass = Math.floor(2 * volume);
    const ke = 0.5 * mass * Math.pow(speed, 2);
    const mt = +(ke * 0.00000000023901).toFixed(3);
    const tScale = d3.scaleLinear().domain([0, 20000]).range([50, 8]);
    const time = tScale(speed);
    name = "A" + name.replace(/\s/g, "").replace(/[{()}]/g, "");
    const dScale = d3.scaleLinear().domain([6371, 54600000]).range([280, 1400]);
    const sizeScale = d3.scaleLinear().domain([]);
    const scaledDistance = Math.floor(dScale(distance));
    const randomDeg = Math.pow(avgDiameter, 2);
    // const plusOrMinus = avgDiameter < 200 ? -1 : 1;
    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const keyframes = `@keyframes ${name} {
        0% {
            transform: rotate(${randomDeg}deg) translateX(${
      scaledDistance / 2
    }px) translateY(${600 * plusOrMinus}px);
            opacity: 0;

        }
        100% {
            transform: rotate(${randomDeg}deg) translateX(${
      scaledDistance / 2
    }px) translateY(0px);
            opacity: 1;
        }
      }`;

    const newclass = `.${name} {
        position: absolute;
        width: 80px;
        height: 80px;
        left: 660px;
        top: 660px;
        animation-name: ${name};
        animation-duration: 4s;
        transform-origin: 40px 40px;
        transform: rotate(${randomDeg}deg) translateX(${
      scaledDistance / 2
    }px) translateY(0px);
      }`;
    // animation-fill-mode: forwards;

    // set size of the NEO based of average diameter
    function setSize() {
      let sizeString = "height: 80px; width: 80px;";
      if (name === "ATesla") return "height: 240px; width: 240px;";
      if (avgDiameter <= 50) {
        sizeString = "height: 70px; width: 70px;";
      } else if (avgDiameter > 50 && avgDiameter < 300) {
        sizeString = "height: 80px; width: 80px;";
      } else if (avgDiameter > 300 && avgDiameter < 700) {
        sizeString = "height: 100px; width: 100px;";
      } else {
        sizeString = "height: 120px; width: 120px;";
      }
      return sizeString;
    }

    const imgClass = `.${name + 1} {
      transform: rotate(${-randomDeg}deg) rotateY(57deg) rotate(${randomDeg}deg);
      ${setSize()}
      cursor: pointer;
    }`;

    const orbitStyle = {
      borderRadius: "50%",
      position: "absolute",
      left: `${700 - scaledDistance / 2}px`,
      top: `${700 - scaledDistance / 2}px`,
      width: `${scaledDistance}px`,
      height: `${scaledDistance}px`,
      border: "solid 0px rgba(222, 222, 222, 0.0)",
      marginLeft: "auto",
      marginRight: "auto",
      boxShadow: "inset 0px 2px 0px 3px #734172FF",
      transition: ".5s ease",
      zIndex: "-40",
    };

    // create image scale to base images on
    function randomImage() {
      if (name === "ATesla") return "../assets/images/tesla.svg";
      let image = "../assets/images/meteor2.svg";
      const imageScale = d3.scaleLinear().domain([3, 35]).range([1, 5]);
      if (speed <= 5) {
        image = "../assets/images/meteor2.svg";
      } else if (speed > 5 && speed < 8) {
        image = "../assets/images/meteor.svg";
      } else if (speed > 8 && speed < 11) {
        image = "../assets/images/meteor3.svg";
      } else if (speed > 11 && speed < 14) {
        image = "../assets/images/meteor4.svg";
      } else if (speed > 14 && speed < 18) {
        image = "../assets/images/meteor5.svg";
      }

      return image;
    }

    const createNeo = () => {
      const singleNeoData = {
        distance,
        avgDiameter,
        speed,
        hazard,
        mt,
        mass,
        neoName,
        hazard,
      };
      const classNames = `${name + 1}`;
      return (
        <Fragment>
          <div
            style={orbitStyle}
            className={this.state.highlighted ? "orbit-highlight" : ""}
          ></div>
          <div className={name}>
            <div className="neo">
              <img
                src={randomImage()}
                onClick={(e) => {
                  this.props.showNeoPopUp(singleNeoData);
                }}
                className={classNames}
                onMouseOver={(e) => {
                  this.highlightOrbit();
                }}
                onMouseOut={(e) => {
                  this.highlightOrbit();
                }}
              />
            </div>
          </div>
        </Fragment>
      );
    };

    const nearEarthObject = createNeo();

    function insertStyles() {
      try {
        document.styleSheets[0].insertRule(
          keyframes,
          document.styleSheets[0].cssRules.length
        );
        document.styleSheets[0].insertRule(
          newclass,
          document.styleSheets[0].cssRules.length
        );
        document.styleSheets[0].insertRule(
          imgClass,
          document.styleSheets[0].cssRules.length
        );
      } catch (e) {
        console.log(e.message);
      }
    }
    insertStyles();
    return <Fragment>{nearEarthObject}</Fragment>;
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showNeoPopUp }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Neo);
