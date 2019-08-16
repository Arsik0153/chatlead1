import { takeLatest } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {signUpSaga, authSaga} from "./userSagas";
import {
  createBotSaga,
  getAllBotsSagas,
  getAllScenariesForBotSaga,
  addNewTrigger,
  addNewScenarioSagas,
  updateTriggerSaga,
    updateSocialInTriggerSagas
} from "./botsSagas";

function* rootSaga() {
  yield takeLatest(ACTION.SIGN_UP_ACTION, signUpSaga);
  yield takeLatest(ACTION.AUTH_ACTION, authSaga);
  yield takeLatest(ACTION.CREATE_BOT_ACTION, createBotSaga);
  yield takeLatest(ACTION.GET_ALL_BOTS_ACTION, getAllBotsSagas);
  yield takeLatest(ACTION.GET_ALL_SCENARIES, getAllScenariesForBotSaga);
  yield takeLatest(ACTION.ADD_NEW_TRIGGER, addNewTrigger);
  yield takeLatest(ACTION.ADD_NEW_SCENARIO, addNewScenarioSagas);
  yield takeLatest(ACTION.UPDATE_TRIGGER, updateTriggerSaga);
  yield takeLatest(ACTION.UPDATE_SOCIAL_IN_TRIGGER, updateSocialInTriggerSagas);
}

export default rootSaga;
