import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getNeoData,
  getFireballData,
  showHeatMapPopUp,
} from "../actions/actions.js";

class Earth extends Component {
  constructor() {
    super();
    this.state = { tagOn: false };
  }

  tagSwitcher() {
    this.setState({ tagOn: !this.state.tagOn });
  }

  render() {
    return (
      <Fragment>
        <img
          alt="earth"
          src="../assets/images/earth.svg"
          className="earth"
          onMouseEnter={(e) => {
            this.tagSwitcher();
          }}
          onMouseLeave={(e) => {
            this.tagSwitcher();
          }}
          onClick={(e) => this.props.showHeatMapPopUp()}
        />
        <div className={this.state.tagOn ? "" : "hidden"} id={"earthpopup"}>
          Earth
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    fireBallData: state.fireBallData,
    currentYear: state.currentYear,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getNeoData,
      getFireballData,
      showHeatMapPopUp,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Earth);
