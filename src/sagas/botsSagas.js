import { put, call, all} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {
    createBot,
    getAllBotsForUser,
    getScenariesForManager,
    addNewScenario,
    updateTrigger,
    uploadMedia,
    deleteBot,
    deleteScenario,
    addNewTrigger
} from "../api/rest/restContoller";
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

        const {data} = yield call(createBot, formData);

        if(data.ok) {
            const {data} = yield call(getAllBotsForUser, formData);
            yield put({type: ACTION.BOTS_DATA_RESPONSE, data: data});
        }else {
            yield put({ type: ACTION.BOTS_DATA_ERROR, error: signUpErrors[data.desc] })
        }

    }

}

export function* deleteBotSaga({ deleteBotData }) {


    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.BOTS_DATA_REQUEST});

        Object.assign(deleteBotData,{
            user_token: localStorage.getItem('token')
        });

        const formData = new FormData();
        Object.keys(deleteBotData).forEach(elem => {
            formData.append(elem, deleteBotData[elem])
        });

        const {data} = yield call(deleteBot, formData);

        if(data.ok) {
            const {data} = yield call(getAllBotsForUser, formData);
            yield put({type: ACTION.BOTS_DATA_RESPONSE, data: data});
        }else {
            yield put({ type: ACTION.BOTS_DATA_ERROR, error: signUpErrors[data.desc] })
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


        const {data} = yield call(addNewScenario, formData);

        if(data.ok) {
            const {data} = yield call(getScenariesForManager, formData);
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
        }else {
            yield put({ type: ACTION.SINGLE_BOT_DATA_RESPONSE, error: signUpErrors[data.desc] })
        }

    }
}

export function* deleteScenarioSagas({ scenarioData }) {

    if(localStorage.getItem('token')) {

        yield put({ type: ACTION.SINGLE_BOT_DATA_REQUEST});


        const formData = new FormData();
        formData.append('manager_id', scenarioData.botId);
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('scenario_id', scenarioData.idScenario);


        const {data} = yield call(deleteScenario, formData);

        if(data.ok) {
            const {data} = yield call(getScenariesForManager, formData);
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
        }else {
            yield put({ type: ACTION.SINGLE_BOT_DATA_RESPONSE, error: signUpErrors[data.desc] })
        }

    }
}


export function* addNewTriggerSagas({ triggerData }) {


    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.SINGLE_BOT_DATA_REQUEST});


        const formData = new FormData();
        formData.append('manager_id', triggerData.manager_id);
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('scenario_id', triggerData.scenario_id);
        formData.append('messages', "[]");
        formData.append('social', 'telegram');
        // formData.append('caption', 'Новый тригер');


        const {data} = yield call(addNewTrigger, formData);


        if(data.ok) {
            const {data} = yield call(getScenariesForManager, formData);
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
        }else {
            yield put({ type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc] })
        }

    }
}

export function* updateTriggerSaga({ triggerData, updationData }) {
    const {messages, index, id, caption, botId, changedSlide, type} = triggerData;



    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.SINGLE_BOT_DATA_REQUEST});



        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('trigger_id', id);
        formData.append('caption', caption);
        formData.append('manager_id', botId);

        if(!updationData) {


        }else {
            if(updationData.type === 'text') {
                formData.append('type', updationData.type);
                formData.append('file', updationData.file);
                Object.assign(messages[index], {
                    [updationData.type]: updationData[updationData.type]
                });
            }else {
                formData.append('type', updationData.type);
                formData.append('file', updationData.file);
                const {data} = yield call(uploadMedia, formData);
                if(data.ok) {
                    console.log(changedSlide);
                    if(changedSlide || changedSlide === 0) {
                        // console.log(messages[index][type][changedSlide]);
                        Object.assign(messages[index][type][changedSlide], {
                            photo: data.message[updationData.type].url
                        });
                    }else {
                        Object.assign(messages[index], {
                            [updationData.type]: data.message[updationData.type].url
                        })
                    }
                }
            }

        }


        formData.append('messages', JSON.stringify(messages));
        const {data} = yield call(updateTrigger, formData);

        if(data.ok) {
            const {data} = yield call(getScenariesForManager, formData);
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
        }else {
            yield put({ type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc] })
        }

    }
}


export function* updateSocialInTriggerSagas({ triggerData }) {
    const {id, botId, social} = triggerData;


    if (localStorage.getItem('token')) {
        yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});


        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('trigger_id', id);
        formData.append('manager_id', botId);
        formData.append('social', social);


        const {data} = yield call(updateTrigger, formData);

        if (data.ok) {
            const {data} = yield call(getScenariesForManager, formData);
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
        } else {
            yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc]})
        }

    }
}


