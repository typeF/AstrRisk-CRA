import React, { Component, Fragment } from "react";
import Earth from "./Earth.jsx";
import Neo from "./Neo.jsx";
import Fireball from "./Fireball.jsx";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FireballAlert from "./FireballAlert.jsx";
import { showHeatMapPopUp } from "../actions/actions.js";

class Orbit extends Component {
  constructor(props) {
    super(props);
    this.state = { marsmars: false, moon: false };
  }

  componentDidMount() {}

  marsSwitcher() {
    this.setState({ marsmars: !this.state.marsmars });
  }

  moonSwitcher() {
    this.setState({ moon: !this.state.moon });
  }

  render() {
    return (
      <Fragment>
        <div className="moon-orbit">
          <div className="moon">
            <img
              src="../assets/images/moon.svg"
              className="moonimage"
              onMouseEnter={(e) => {
                this.moonSwitcher();
              }}
              onMouseLeave={(e) => {
                this.moonSwitcher();
              }}
            />
            <div className={this.state.moon ? "" : "hidden"} id={"moonpopup"}>
              Moon
            </div>
          </div>
        </div>
        <div className="orbit">
          <img
            src="../assets/images/mars.svg"
            className="mars"
            onClick={this.handleClick}
            onMouseEnter={(e) => {
              this.marsSwitcher();
            }}
            onMouseLeave={(e) => {
              this.marsSwitcher();
            }}
          />
          <div className={this.state.marsmars ? "" : "hidden"} id={"marspopup"}>
            Mars
          </div>
        </div>
        <FireballAlert />
        {this.props.neoData.map((neo, i) => {
          const distance = neo.close_approach_data[0].miss_distance.kilometers;
          const avgDiameter = Math.floor(
            (neo.estimated_diameter.meters.estimated_diameter_min +
              neo.estimated_diameter.meters.estimated_diameter_max) /
              2
          );
          const speed =
            neo.close_approach_data[0].relative_velocity.kilometers_per_second;
          const name = neo.name;
          const hazard = neo.is_potentially_hazardous_asteroid ? "Yes" : "No";
          return (
            <Neo
              key={i}
              name={name}
              distance={distance}
              avgDiameter={avgDiameter}
              speed={speed}
              hazard={hazard}
            ></Neo>
          );
        })}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      showHeatMapPopUp,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Orbit);
