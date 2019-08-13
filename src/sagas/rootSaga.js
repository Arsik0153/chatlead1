import { takeLatest } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {signUpSaga, authSaga} from "./userSagas";
import {
  createBotSaga,
  getAllBotsSagas,
  getAllScenariesForBotSaga,
  addNewTrigger,
  addNewScenarioSagas
} from "./botsSagas";

function* rootSaga() {
  yield takeLatest(ACTION.SIGN_UP_ACTION, signUpSaga);
  yield takeLatest(ACTION.AUTH_ACTION, authSaga);
  yield takeLatest(ACTION.CREATE_BOT_ACTION, createBotSaga);
  yield takeLatest(ACTION.GET_ALL_BOTS_ACTION, getAllBotsSagas);
  yield takeLatest(ACTION.GET_ALL_SCENARIES, getAllScenariesForBotSaga);
  yield takeLatest(ACTION.ADD_NEW_TRIGGER, addNewTrigger);
  yield takeLatest(ACTION.ADD_NEW_SCENARIO, addNewScenarioSagas);
}

export default rootSaga;
