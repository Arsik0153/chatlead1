import { put, call, all} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {
    getManager,
    editManager,
    getFacebookAuthUrl,
    getVkAuthUrl,
    getQRCodeUrl
} from "../api/rest/restContoller";
import {signUpErrors, authErrors} from "../constants/errors/user";


export function* getManagerSaga({ idBot }){
    
    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.BOT_SETUP_REQUEST});

        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', idBot);

        const {data} = yield call(getManager, formData);
        /* data = 
        {   'ok': True, 
            'manager': 
            {
                'id': 44, 'name': '123', 'amocrm_domain': '',
                'bitrix_key': '', 'bitrix_domain': '', 'application_email': '',
                'application_whatsapp_id': '', 'facebook_token': '', 'facebook_group_id': '',
                'telegram_token': '', 'vk_group_id': '', 'vk_group_access_token': '',
                'whatsapp_token': '', 'whatsapp_instance': '', 'welcome_message': '',
                'default_response': '', 'facebook_name': '', 'vk_name': '',
                'telegram_name': '', 'whatsapp_status': ''
            }
        }
        */
       console.log(data)

        if(data.ok) {
            yield put({type: ACTION.BOT_SETUP_RESPONSE, data: data.manager});
        }else {
            yield put({ type: ACTION.BOT_SETUP_ERROR, error: signUpErrors[data.desc] })
        }
    }
}

export function* editManagerSaga({ setupData }){
    if(localStorage.getItem('token')) {
        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', setupData.idBot);
        
        if (setupData.optional_params !== undefined) {
            for (let param of setupData.optional_params) {
                
                formData.append(param, setupData[param]);
            }
        }
        
        const {data} = yield call(editManager, formData);
        if(data.ok) {
            yield put({type: ACTION.BOT_SETUP_RESPONSE, data: data.manager});
        }else {
            yield put({ type: ACTION.BOT_SETUP_ERROR, error: signUpErrors[data.desc] })
        }
    }
}

export function* facebookAuthSaga({ idBot }){
    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.BOT_SETUP_REQUEST});

        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', idBot);

        const {data} = yield call(getFacebookAuthUrl, formData);

        if(data.ok) {
            yield put({type: ACTION.BOT_SETUP_RESPONSE, data: data.url});
        }else {
            yield put({ type: ACTION.BOT_SETUP_ERROR, error: signUpErrors[data.desc] })
        }
    }
}

export function* vkAuthSaga({ idBot }){
    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.BOT_SETUP_REQUEST});

        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', idBot);

        const {data} = yield call(getVkAuthUrl, formData);
        console.log(data);
        if(data.ok) {
            yield put({type: ACTION.BOT_SETUP_RESPONSE, data: data.url});
        }else {
            yield put({ type: ACTION.BOT_SETUP_ERROR, error: signUpErrors[data.desc] })
        }
    }
}

export function* getQRCodeSaga({ idBot }){
    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.BOT_SETUP_REQUEST});

        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', idBot);

        const {data} = yield call(getQRCodeUrl, formData);

        if(data.ok) {
            yield put({type: ACTION.BOT_SETUP_RESPONSE, data: data.url});
        }else {
            yield put({ type: ACTION.BOT_SETUP_ERROR, error: signUpErrors[data.desc] })
        }
    }
}
