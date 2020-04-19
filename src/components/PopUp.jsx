import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import RadarChart from './charts/RadarChart.jsx';
import BarChart from './charts/BarChart.jsx';
import * as MdIconPack from 'react-icons/lib/md'
import { closePopUp, showNeoPopUp  } from '../actions/actions.js'
import HeatMap from './charts/HeatMap.jsx';
import NeoPopUp from './NeoPopUp.jsx';


class PopUp extends Component {

  render() {
    const { showNeoPopUp, showHeatMap } = this.props;

    return (
      <Fragment>
        <div className="info-bg">
          <div className="infoPopupContainer">
            <div className="infoPopup-infoHolder">
              <div className="x-button">
                <MdIconPack.MdClear size={80} onClick={e => this.props.closePopUp()} />
              </div>
              <div className="neo-popup-container">
                {showNeoPopUp && <NeoPopUp />}
              </div>
              {showHeatMap && <HeatMap />}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    showNeoPopUp: state.showNeoPopUp,
    showHeatMap: state.showHeatMap
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closePopUp
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
