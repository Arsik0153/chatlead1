import { combineReducers } from 'redux';
import {reducer as formReducer} from "redux-form";
import userReducers from '../reducers/userReducers';
import botsReducers from '../reducers/botsReducers';
import singleBotReducers from '../reducers/singleBotReducers';

const appReducer = combineReducers({
  userReducers,
  form: formReducer,
  botsReducers,
  singleBotReducers
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
