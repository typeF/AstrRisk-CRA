import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getFireballData } from "../actions/actions.js";

class Fireball extends Component {
  render() {
    return (
      <Fragment>
        <div className="fireball-path">
          <img alt="neo" src="../assets/images/neo.svg" className="fireball" />
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
