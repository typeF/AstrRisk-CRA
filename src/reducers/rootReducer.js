import { combineReducers } from 'redux';
import { 
  testReducer, 
  neoDataReducer, 
  fireBallDataReducer, 
  dateReducer, 
  getSliderReducer, 
  togglePopUpReducer, 
  toggleFireballReducer, 
  annualDataReducer, 
  singleNeoDataReducer, 
  showPopUpReducer, 
  toggleHeatMapReducer, 
  toggleNeoPopUpReducer, 
  toggleDangerBarReducer } from './reducers';

const rootReducer = combineReducers({
  neoData: neoDataReducer,
  fireBallData: fireBallDataReducer,
  currentDate: dateReducer,
  sliderData: getSliderReducer,
  annualData: annualDataReducer,
  showFireball: toggleFireballReducer,
  singleNeoData: singleNeoDataReducer,
  showPopUp: togglePopUpReducer,
  showHeatMap: toggleHeatMapReducer,
  showNeoPopUp: toggleNeoPopUpReducer,
  showDangerBar: toggleDangerBarReducer
})

export default rootReducer;
