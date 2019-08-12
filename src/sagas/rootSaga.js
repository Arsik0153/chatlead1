import { takeLatest } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {signUpSaga, authSaga} from "./userSagas";
import {createBotSaga, getAllBotsSagas} from "./botsSagas";

function* rootSaga() {
  yield takeLatest(ACTION.SIGN_UP_ACTION, signUpSaga);
  yield takeLatest(ACTION.AUTH_ACTION, authSaga);
  yield takeLatest(ACTION.CREATE_BOT_ACTION, createBotSaga);
  yield takeLatest(ACTION.GET_ALL_BOTS_ACTION, getAllBotsSagas);
}

export default rootSaga;
