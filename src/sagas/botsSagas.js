import { put, call, all} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {createBot, getAllBotsForUser} from "../api/rest/restContoller";
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