import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testButton, getNeoData, getFireballData, toggleFireball } from '../actions/actions.js';
import * as Material from 'react-icons/lib/md'
import Fireball from './Fireball.jsx';

class FireballAlert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fireBallData, currentDate, toggleFireball, showFireball } = this.props;
    const { date, energy, impactEnergy } = fireBallData;
    return (
      <Fragment>
     
      {fireBallData[currentDate] &&  <div className="alertContainer" onClick={e => toggleFireball()}>
      <Material.MdWarning className="alert"/>
      </div>}
      { showFireball && <Fireball/>}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    fireBallData: state.fireBallData,
    currentDate: state.currentDate,
    showFireball: state.showFireball,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getNeoData,
    getFireballData,
    toggleFireball,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FireballAlert)