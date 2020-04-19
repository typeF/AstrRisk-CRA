import * as types from "./actionTypes";

export const getNeoData = date => {
  return (dispatch, getState) => {
    //Usage: year = '1990-02-14' for sample
    fetch(`/api/neo/${date}`)
      .then(res => res.json())
      .then(
        result => {
          dispatch(loadNeoData(result));
          dispatch(getDate(date));
          dispatch(offFireball());
        },
        error => {
          console.log("Error getting data from server: ", error);
        }
      );
  };
};

export const getFireballData = () => {
  return (dispatch, getState) => {
    fetch("/api/fireball")
      .then(res => res.json())
      .then(
        result => {
          dispatch(loadFireballData(result));
        },
        error => {
          console.log("Error getting fireball data from server: ", error);
        }
      );
  };
};

export const getAnnualNeoData = year => {
  return (dispatch, getState) => {
    fetch(`/api/annual/${year}`)
      .then(res => res.json())
      .then(
        result => {
          // console.log(`Received annual data for ${year}`);
          dispatch(getAnnualData(result));
        },
        error => {
          console.log("Error getting annual data from server: ", error);
        }
      );
  };
};

export const toggleFireball = () => ({
  type: types.TOGGLEFIREBALL
});

export const offFireball = () => ({
  type: types.OFFFIREBALL
});

// Pop Up Actions
export const showPopUp = () => ({
  type: types.SHOWPOPUP
});

export const showNeoPopUp = data => ({
  type: types.SHOWNEOPOPUP,
  payload: data
});
export const showHeatMapPopUp = () => ({
  type: types.SHOWHEATMAP
});

export const closePopUp = () => ({
  type: types.CLOSEPOPUP
});

export const togglePopUp = () => ({
  type: types.TOGGLEPOPUP
});

export const getAnnualData = data => ({
  type: types.LOADANNUALDATA,
  payload: data
});

export const getDate = date => ({
  type: types.GETDATE,
  payload: date
});

export const loadFireballData = data => ({
  type: types.LOADFIREBALLDATA,
  payload: data
});

export const loadNeoData = data => ({
  type: types.LOADNEODATA,
  payload: data
});

export const showNeoData = data => ({
  type: types.SHOWNEODATA
});

export const changeSlider = data => ({
  type: types.SLIDERCHANGE,
  payload: data
});

export const toggleDangerBar = () => ({
  type: types.TOGGLEDANGERBAR
});
