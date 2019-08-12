import { combineReducers } from 'redux';
import {reducer as formReducer} from "redux-form";
import userReducers from '../reducers/userReducers';
import botsReducers from '../reducers/botsReducers';

const appReducer = combineReducers({
  userReducers,
  form: formReducer,
  botsReducers
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
