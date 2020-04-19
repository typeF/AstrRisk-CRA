import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getNeoData,
  getFireballData,
  changeSlider,
  getAnnualNeoData,
} from "../actions/actions.js";
import moment from "moment";
import { extendMoment } from "moment-range";
import { spring, Motion } from "react-motion";
import FireballNotification from "./FireballNotification.jsx";
import * as FontAwesome from "react-icons/lib/fa";
import * as MdIconPack from "react-icons/lib/md";
import uuid from "uuid/v1";

const momentRange = extendMoment(moment);

class SliderBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSelector: false,
      selectorClassName: "range-hidden",
    };
  }

  componentDidMount() {
    this.props.getNeoData(this.props.currentDate);
  }

  // updates the slider range max value
  updateRange() {
    const startDate = new Date(this.getCurrentYear(), 0, 1);
    const endDate = new Date(this.getCurrentYear(), 11, 31);
    const range = momentRange.range(startDate, endDate).diff("days") + 1;
    return range;
  }

  // updates the range slider with the current value tranlated to a date
  changeRange(e) {
    this.props.changeSlider(Number(e.currentTarget.value));
    this.props.getNeoData(
      moment()
        .year(this.getCurrentYear())
        .dayOfYear(e.currentTarget.value)
        .format("YYYY-MM-DD")
    );
  }

  // goes back one day in the current year timeline and updates the range slider value
  goBackOneDay() {
    if (this.props.currentDate !== `${this.getCurrentYear()}-01-01`) {
      this.props.changeSlider(Number(this.props.sliderData - 1));
      this.props.getNeoData(
        moment(this.props.currentDate)
          .subtract("1", "days")
          .format("YYYY-MM-DD")
      );
    }
  }
  // goes forward one day in the current year timeline and updates the range slider value
  goForwardOneDay() {
    if (this.props.currentDate !== `${this.getCurrentYear()}-12-31`) {
      this.props.changeSlider(Number(this.props.sliderData + 1));
      this.props.getNeoData(
        moment(this.props.currentDate).add("1", "days").format("YYYY-MM-DD")
      );
    }
  }
  // returns only the Year of the current date
  getCurrentYear() {
    return Number(moment(this.props.currentDate).format("YYYY"));
  }

  // value change for the select year dropdown menu
  changeYear(e) {
    const date = `${e.currentTarget.textContent}-01-01`;
    this.props.getNeoData(date);
    this.props.changeSlider(1);
    this.props.getAnnualNeoData(e.currentTarget.textContent);
  }

  // renders the datepicker
  renderDates(startYear, endYear, e) {
    let options = [];
    for (let i = startYear; i <= endYear; i++) {
      if (i + 1 === this.getCurrentYear()) {
        options.push(
          <div
            key={uuid()}
            value={i}
            id="current"
            onClick={(e) => {
              this.classChanger();
              this.changeYear(e);
            }}
          >
            {i}
          </div>
        );
      } else {
        options.push(
          <div
            key={uuid()}
            value={i}
            onClick={(e) => {
              this.classChanger();
              this.changeYear(e);
            }}
          >
            {i}
          </div>
        );
      }
    }
    return <Fragment>{options}</Fragment>;
  }

  // changes the class state for hidden divs
  classChanger() {
    this.setState({ showSelector: !this.state.showSelector });
  }

  render() {
    const startYear = 1900;
    const endYear = 2200;

    const makeSlider = () => {
      return (
        <Fragment>
          <div className="range-slider">
            <div className="range-slider-date">
              <div className="range-button">
                <MdIconPack.MdArrowBack
                  size={70}
                  onClick={(e) => this.goBackOneDay()}
                />
              </div>
              <div></div>
              <div
                className={
                  this.state.showSelector ? "range-hidden" : "range-text-link"
                }
                onClick={(e) => this.classChanger()}
              >
                <a href="#current">{this.getCurrentYear()}</a>
              </div>

              <div
                className={
                  this.state.showSelector ? "range-year-picker" : "range-hidden"
                }
              >
                <div
                  onChange={(e) => this.changeYear(e)}
                  defaultValue={this.getCurrentYear()}
                >
                  {this.renderDates(startYear, endYear)}
                </div>
              </div>
              <FontAwesome.FaExpand
                className={
                  this.state.showSelector ? "dropdown-icon" : "range-hidden"
                }
                size={"30px"}
              />
              <div className="range-text">
                <Motion
                  defaultStyle={{
                    date: moment(
                      this.props.neoData[0].close_approach_data[0]
                        .close_approach_date
                    ).valueOf(),
                  }}
                  style={{
                    date: spring(
                      moment(
                        this.props.neoData[0].close_approach_data[0]
                          .close_approach_date
                      ).valueOf(),
                      { stiffness: 230, damping: 70, precision: 1000000000 }
                    ),
                  }}
                >
                  {(value) => (
                    <div className="range-text">
                      {moment(Math.floor(value.date)).format("dddd, MMMM Do")}
                    </div>
                  )}
                </Motion>
              </div>
              <div className="range-button">
                <MdIconPack.MdArrowForward
                  size={70}
                  onClick={(e) => this.goForwardOneDay()}
                />
              </div>
            </div>

            <ul className="range-slider-months">
              <li>Jan</li>
              <li>Feb</li>
              <li>Mar</li>
              <li>Apr</li>
              <li>May</li>
              <li>Jun</li>
              <li>Jul</li>
              <li>Aug</li>
              <li>Sep</li>
              <li>Oct</li>
              <li>Nov</li>
              <li>Dec</li>
            </ul>

            <input
              ref="sliderRef"
              type="range"
              min="1"
              max={this.updateRange()}
              step="1"
              value={this.props.sliderData}
              className="slider"
              onChange={(e) => this.changeRange(e)}
            ></input>
          </div>
        </Fragment>
      );
    };

    const rangeSlider = makeSlider();

    return (
      <Fragment>
        {rangeSlider}
        <FireballNotification />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    fireBallData: state.fireBallData,
    currentDate: state.currentDate,
    sliderData: state.sliderData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getNeoData, //Usage: getNeoData(YYYY-MM-DD) use 1990-01-01 to 1990-03-05
      getFireballData,
      changeSlider,
      getAnnualNeoData,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderBar);
