import { combineReducers } from 'redux';
import { GlobalReducer } from './slices/globalSlice';
import checkUserLoginReducer from './slices/checkUserLoginSlice';

const rootReducer = combineReducers({
  GlobalReducer,
  checkUserLoginReducer
});

export default rootReducer;
