import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { testButton, getNeoData, getFireballData } from "../actions/actions.js";
import * as d3 from "d3";
import moment from "moment";

class Fireball extends Component {
  render() {
    const { fireBallData, currentDate } = this.props;
    const { date, energy, impactEnergy } = fireBallData;

    return (
      <Fragment>
        <div className="fireball-path">
          <img src="../assets/images/neo.svg" className="fireball" />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    fireBallData: state.fireBallData,
    currentDate: state.currentDate,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getFireballData,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Fireball);
