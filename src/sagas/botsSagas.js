import { put, call, all} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {
    createBot,
    getAllBotsForUser,
    getScenariesForManager,
    addNewScenario,
    updateTrigger,
    uploadMedia
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

export function* updateTriggerSaga({ triggerData, updationData }) {
    const {messages, index, id, caption, botId, changedSlide} = triggerData;



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
                // console.log(data);
                if(data.ok) {
                    if(changedSlide || changedSlide === 0) {
                        Object.assign(messages[index].card[changedSlide], {
                            photo: data.message[updationData.type].url
                        });
                        console.log(messages);
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