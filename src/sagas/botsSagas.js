import { put, call, all} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {createBot, getAllBotsForUser, getScenariesForManager, addNewScenario} from "../api/rest/restContoller";
import {signUpErrors, authErrors} from "../constants/errors/user";


export function* createBotSaga({ createBotData }) {

    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.BOTS_DATA_REQUEST});

        Object.assign(createBotData,{
            user_token: localStorage.getItem('token')
        });

        const formData = new FormData();
        Object.keys(createBotData).forEach(elem => {
            formData.append(elem, createBotData[elem])
        });

        const [botStatus, allBots] = yield all([
            call(createBot, formData),
            call(getAllBotsForUser, formData)
        ]);

        if(botStatus.ok) {
            yield put({type: ACTION.BOTS_DATA_RESPONSE, data: allBots});
        }else {
            yield put({ type: ACTION.BOTS_DATA_ERROR, error: signUpErrors[botStatus.desc] })
        }


    }

}

export function* getAllBotsSagas() {

    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.BOTS_DATA_REQUEST});


        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));

        const {data} = yield call(getAllBotsForUser, formData);

        console.log(data);

        if(data.ok) {
            yield put({type: ACTION.BOTS_DATA_RESPONSE, data: data});
        }else {
            yield put({ type: ACTION.BOTS_DATA_ERROR, error: signUpErrors[data.desc] })
        }

    }
}

export function* getAllScenariesForBotSaga({ idBot }) {

    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.SINGLE_BOT_DATA_REQUEST});


        const formData = new FormData();
        formData.append('manager_id', idBot);
        formData.append('user_token', localStorage.getItem('token'));


        const {data} = yield call(getScenariesForManager, formData);

        // console.log(data.scenarios);

        console.log(data);


        if(data.ok) {
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
        }else {
            yield put({ type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc] })
        }

    }
}


export function* addNewScenarioSagas({ botId }) {

    if(localStorage.getItem('token')) {

        yield put({ type: ACTION.SINGLE_BOT_DATA_REQUEST});


        const formData = new FormData();
        formData.append('manager_id', botId);
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('trigger_text', 'Безымяная команда');

        const [creationStatus, newData] = yield all([
            call(addNewScenario, formData),
            call(getScenariesForManager, formData)
        ]);

        console.log(creationStatus);


        if(creationStatus.data.ok) {
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: newData.data.scenarios});
        }else {
            yield put({ type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[creationStatus.data.desc] })
        }

    }
}


export function* addNewTrigger({ triggerData }) {

    console.log(triggerData);
    // if(localStorage.getItem('token')) {
    //     yield put({ type: ACTION.SINGLE_BOT_DATA_REQUEST});
    //
    //
    //     const formData = new FormData();
    //     formData.append('manager_id', idBot);
    //     formData.append('user_token', localStorage.getItem('token'));
    //
    //
    //     const {data} = yield call(getScenariesForManager, formData);
    //
    //     // console.log(data.scenarios);
    //
    //
    //     if(data.ok) {
    //         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
    //     }else {
    //         yield put({ type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc] })
    //     }
    //
    // }
}