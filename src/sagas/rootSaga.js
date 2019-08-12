import { takeLatest, throttle, delay } from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {
  getGoodsByGroup,
  getSimpleGoodById,
  appendFavouriteGood,
    getFavouritesGoods,
    deleteFavouriteGood,
    updateBasketGoodsData,
    toIssueOrder,
    dynamicSearchGoodsSaga,
    getElementsForFilter
} from './goodsSaga';
import {appendFilterSettings} from "./filterSaga";
import {getLocationDynamicSearch} from "./dynamicSearchLocationSaga";
import {
  signUpSaga,
  authSaga,
  checkAuthUser,
  setPageForCabinet,
  getPersonalData,
  updatePersonalDataUser,
  getUserOrders,
  deleteOrders,
  logout,
  forgotPassword
} from "./accountSagas";

import {
  getAllOrdersForAdmin,
  deleteOrdersAdmin,
  appendOrdersAdmin,
  updateOrderAdmin,
  updateGoodsAttribute,
    deletePictureInGoodsAttribute,
    adminUpdateGoods,
    adminDeleteGoods,
    appendPictureInAttribute,
    goodsAttributesDelete,
} from "./adminSagas";

function* rootSaga() {
  yield throttle(1000, ACTION.GOODS_BY_GROUP_ACTION, getGoodsByGroup);
  yield takeLatest(ACTION.FILTER_APPEND_ACTION, appendFilterSettings);
  yield takeLatest(ACTION.SIMPLE_GOODS_BY_ID_ACTION, getSimpleGoodById);
  yield throttle(1000, ACTION.DYNAMIC_SEARCH_LOCATION_ACTION, getLocationDynamicSearch);
  yield takeLatest(ACTION.SIGN_UP_ACTION, signUpSaga);
  yield takeLatest(ACTION.USER_AUTH_ACTION, authSaga);
  yield takeLatest(ACTION.FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(ACTION.CHECK_AUTH_USER_ACTION, checkAuthUser);
  yield takeLatest(ACTION.PAGE_FOR_CABINET_ACTION, setPageForCabinet);
  yield takeLatest(ACTION.PERSONAL_DATA_ACTION, getPersonalData);
  yield takeLatest(ACTION.UPDATE_PERSONAL_DATA_ACTION, updatePersonalDataUser);
  yield takeLatest(ACTION.APPEND_FAVOURITE_GOODS, appendFavouriteGood);
  yield takeLatest(ACTION.GET_FAVOURITE_GOODS, getFavouritesGoods);
  yield takeLatest(ACTION.DELETE_FAVOURITE_GOODS, deleteFavouriteGood);
  yield takeLatest(ACTION.GET_HISTORY_ORDERS, getUserOrders);
  yield takeLatest(ACTION.DELETE_ORDER, deleteOrders);
  yield takeLatest(ACTION.LOGOUT_ACTION, logout);
  yield takeLatest(ACTION.GOODS_BASKET_ACTION, updateBasketGoodsData);
  yield takeLatest(ACTION.ISSUE_ORDER_ACTION, toIssueOrder);
  yield throttle(1000, ACTION.ADMIN_GET_ORDERS, getAllOrdersForAdmin);
  yield takeLatest(ACTION.ADMIN_DELETE_ORDERS, deleteOrdersAdmin);
  yield throttle(1000, ACTION.DYNAMIC_SEARCH_GOODS_ACTION, dynamicSearchGoodsSaga);
  yield takeLatest(ACTION.ADMIN_APPEND_ORDERS, appendOrdersAdmin);
  yield takeLatest(ACTION.ADMIN_UPDATE_ORDERS, updateOrderAdmin);
  yield takeLatest(ACTION.ADMIN_UPDATE_GOODS_ATTRIBUTE, updateGoodsAttribute);
  // yield takeLatest(ACTION.ADMIN_AUTOFILL_GOODS_ACTION, autofillOnGoodsRedactor);
  yield takeLatest(ACTION.ADMIN_UPDATE_GOODS, adminUpdateGoods);
  yield takeLatest(ACTION.ADMIN_DELETE_GOODS, adminDeleteGoods);
  yield takeLatest(ACTION.ADMIN_APPEND_PICTURE_IN_ATTRIBUTE, appendPictureInAttribute);
  yield takeLatest(ACTION.ADMIN_DELETE_PICTURE_IN_ATTRIBUTES, deletePictureInGoodsAttribute);
  yield takeLatest(ACTION.ADMIN_DELETE_GOODS_ATTRIBUTES, goodsAttributesDelete);
  yield takeLatest(ACTION.FILTER_ELEMENTS_ACTION, getElementsForFilter);
}

export default rootSaga;
