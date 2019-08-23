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
    addNewTrigger,
    getAllAutorides,
    addNewAutoride,
    getAllBroadCasts,
    updateBroadCasts
} from "../api/rest/restContoller";
import {signUpErrors, authErrors} from "../constants/errors/user";
import {destinationScenario} from "../constants/defaultValues";


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

        // console.log(data);


        if(data.ok) {
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
        }else {
            yield put({ type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc] })
        }

    }
}


export function* addNewScenarioSagas({ botId, destination, trigger_text }) {

    if(localStorage.getItem('token')) {

        yield put({ type: ACTION.SINGLE_BOT_DATA_REQUEST});


        const formData = new FormData();
        formData.append('manager_id', botId);
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('trigger_text', trigger_text);
        formData.append('destination', destination);



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
                    // console.log(changedSlide);
                    if(changedSlide || changedSlide === 0) {
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

export function* getAllAutoridesSagas({ botId }) {


    if (localStorage.getItem('token')) {
        yield put({type: ACTION.AUTORIDE_REQUEST});


        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', botId);


        const allAutorides = yield call(getAllAutorides, formData);


        if (allAutorides.data.ok) {
            yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesData: allAutorides.data.auto_rides});

            const allScenaries = yield call(getScenariesForManager, formData);
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});

        } else {
            yield put({type: ACTION.AUTORIDE_ERROR, error: signUpErrors[allAutorides.data.desc]})
        }


    }
}

export function* appendNewAutorideSagas({ managerId, trigger_text }) {


    if (localStorage.getItem('token')) {
        yield put({type: ACTION.AUTORIDE_REQUEST});


        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', managerId);
        formData.append('trigger_text', trigger_text);
        formData.append('destination', destinationScenario.autoride);


        const createScenarioStatus = yield call(addNewScenario, formData);


        if(createScenarioStatus.data.ok) {
            formData.append('trigger_text', trigger_text);
            formData.append('scenario_id', createScenarioStatus.data.scenario.id);

            const [createAutorideStatus, allScenaries, allAutorides] = yield all([
                call(addNewAutoride, formData),
                call(getScenariesForManager, formData),
                call(getAllAutorides, formData)
            ]);

            if(createAutorideStatus.data.ok) {
                yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});
                yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesData: allAutorides.data.auto_rides});
            }

            // const createAutorideStatus = yield call(addNewAutoride, formData);
            //
            // if(createAutorideStatus.data.ok) {
            //     const allScenaries = yield call(getScenariesForManager, formData);
            //     yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});
            //     const allAutorides = yield call(getAllAutorides, formData);
            //     yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesData: allAutorides.data.auto_rides});
            // }

        }else {
            yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, dataScenarios: createScenarioStatus.data.desc});
        }

    }
}

export function* getAllBroadCastSagas({ managerId }) {



    if (localStorage.getItem('token')) {
        yield put({type: ACTION.BROADCAST_REQUEST});


        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', managerId);

        const [allBroadcast, allScenaries] = yield all([
            call(getAllBroadCasts, formData),
            call(getScenariesForManager, formData),
        ]);

        //
        if (allBroadcast.data.ok) {
            yield put({type: ACTION.BROADCAST_RESPONSE, broadCastData: allBroadcast.data.broadcasts});

            if(allScenaries.data.ok) {
                yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});

            }

        } else {
            yield put({type: ACTION.BROADCAST_ERROR, error: signUpErrors[allBroadcast.data.desc]})
        }


    }
}

export function* updateBroadCastSagas({ broadCastData }) {


    if (localStorage.getItem('token')) {
        yield put({type: ACTION.BROADCAST_REQUEST});



        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', broadCastData.managerId);
        formData.append('broadcast_id', broadCastData.id);
        formData.append('tag', broadCastData.tag);
        formData.append('time', broadCastData.time.toFixed(0));
        if(broadCastData.sent) {
            formData.append('sent', broadCastData.sent);
        }


        const [updateStatus, allScenaries] = yield all([
            call(updateBroadCasts, formData),
            call(getScenariesForManager, formData),
        ]);

        const allBroadcast = yield call(getAllBroadCasts, formData);

        if (updateStatus.data.ok) {
            if(allBroadcast.data.ok) {
                yield put({type: ACTION.BROADCAST_RESPONSE, broadCastData: allBroadcast.data.broadcasts});
            }

            if(allScenaries.data.ok) {
                yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});

            }

        } else {
            yield put({type: ACTION.BROADCAST_ERROR, error: signUpErrors[allBroadcast.data.desc]})
        }


    }
}

export function* copyScenarioSagas({ scenarioData }) {


    if (localStorage.getItem('token')) {
        yield put({type: ACTION.BROADCAST_REQUEST});



        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', scenarioData.managerId);
        formData.append('trigger_text', scenarioData.trigger_text);
        formData.append('destination', scenarioData.destination);
        // formData.append('tag', broadCastData.tag);
        // formData.append('time', broadCastData.time.toFixed(0));
        // if(broadCastData.sent) {
        //     formData.append('sent', broadCastData.sent);
        // }
        //
        //
        // const [updateStatus, allScenaries] = yield all([
        //     call(updateBroadCasts, formData),
        //     call(getScenariesForManager, formData),
        // ]);
        //
        const copyScenarioStatus = yield call(addNewScenario, formData);



        if(copyScenarioStatus.data.ok) {
            formData.append('scenario_id', copyScenarioStatus.data.scenario.id);
            const result = yield all(
                scenarioData.triggers.forEach(elem => {
                    formData.append('messages', elem.messages);
                    formData.append('caption', elem.caption);
                    call(addNewTrigger, formData);
                })
            );

            console.log(result, '>>>');
            // const allScenaries = yield call(getScenariesForManager, formData);
            //
            // yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});


            // const {data} = yield call(addNewTrigger, formData);

            // copyScenarioStatus.data.scenario.id
        }else {
            yield put({ type: ACTION.SINGLE_BOT_DATA_RESPONSE, error: signUpErrors[copyScenarioStatus.data.desc] })
        }

        // if (updateStatus.data.ok) {
        //     if(allBroadcast.data.ok) {
        //         yield put({type: ACTION.BROADCAST_RESPONSE, broadCastData: allBroadcast.data.broadcasts});
        //     }
        //
        //     if(allScenaries.data.ok) {
        //         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});
        //
        //     }
        //
        // } else {
        //     yield put({type: ACTION.BROADCAST_ERROR, error: signUpErrors[allBroadcast.data.desc]})
        // }


    }
}

export function* appendBroadCastSagas({ broadCastData }) {

    console.log(broadCastData);


    // if (localStorage.getItem('token')) {
    //     yield put({type: ACTION.BROADCAST_REQUEST});
    //
    //
    //
    //     const formData = new FormData();
    //     formData.append('user_token', localStorage.getItem('token'));
    //     formData.append('manager_id', broadCastData.managerId);
    //     formData.append('broadcast_id', broadCastData.id);
    //     formData.append('tag', broadCastData.tag);
    //     formData.append('time', broadCastData.time.toFixed(0));
    //     if(broadCastData.sent) {
    //         formData.append('sent', broadCastData.sent);
    //     }
    //
    //
    //     const [updateStatus, allScenaries] = yield all([
    //         call(updateBroadCasts, formData),
    //         call(getScenariesForManager, formData),
    //     ]);
    //
    //     const allBroadcast = yield call(getAllBroadCasts, formData);
    //
    //     if (updateStatus.data.ok) {
    //         if(allBroadcast.data.ok) {
    //             yield put({type: ACTION.BROADCAST_RESPONSE, broadCastData: allBroadcast.data.broadcasts});
    //         }
    //
    //         if(allScenaries.data.ok) {
    //             yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});
    //
    //         }
    //
    //     } else {
    //         yield put({type: ACTION.BROADCAST_ERROR, error: signUpErrors[allBroadcast.data.desc]})
    //     }


    // }
}


