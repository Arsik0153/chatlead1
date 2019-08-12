import { combineReducers } from 'redux';
import goodsReducers from './goodsReducers';
import dynamicSearchLocationReducers from './dynamicSearchLocationReducers';
import filterReducers from "./filterReducers";
import simpleGoodsReducer from "./simpleGoodsReducer";
import signUpReducers from "./signUpReducers";
import pageForCabinetReducers from './pageForCabinetReducers';
import userPersonalDataReducer from './userPersonalDataReducers';
import favouriteGoodsReducers from './favouriteGoodsReducers';
import historyOrdersReducers from './historyOrdersReducers';
import goodsBasketReducers from './basketReducers';
import orderReducers from './orderReducers';
import adminOrdersReducers from './adminOrdersReducers';
import dynamicSearchGoodsReducers from './dynamicSearchGoodsReducers';
import createGoodsReducers from './createGoodsReducers';
import {reducer as formReducer} from "redux-form";

const appReducer = combineReducers({
  goodsReducers,
  filterReducers,
  simpleGoodsReducer,
  form: formReducer,
  dynamicSearchLocationReducers,
  signUpReducers,
  pageForCabinetReducers,
  userPersonalDataReducer,
  favouriteGoodsReducers,
  historyOrdersReducers,
  goodsBasketReducers,
  orderReducers,
  adminOrdersReducers,
  dynamicSearchGoodsReducers,
  createGoodsReducers
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
