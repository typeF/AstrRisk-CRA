import React, { Component, Fragment } from "react";
import EarthSystem from "./components/EarthSystem.jsx";
import SliderBar from "./components/SliderBar.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  testButton,
  getNeoData,
  getFireballData,
  getAnnualNeoData,
} from "./actions/actions.js";
import BarChart from "./components/charts/BarChart.jsx";
import PopUp from "./components/PopUp.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getFireballData();
    this.props.getNeoData(this.props.currentDate);
    this.props.getAnnualNeoData(this.props.currentDate);
    // document.getElementById("loader").className += " hidden";
  }

  render() {
    const margin = { top: 100, bottom: 100, left: 100, right: 100 },
      width = 600 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom,
      radius = Math.min(width, height) / 2;

    return (
      <Fragment>
        <EarthSystem />
        <SliderBar />
        {this.props.showPopUp && <PopUp />}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    testState: state.testReducer,
    fireBallData: state.fireBallData,
    currentDate: state.currentDate,
    annualData: state.annualData,
    showPopUp: state.showPopUp,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getNeoData,
      getFireballData,
      getAnnualNeoData,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// import React from "react";
// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
