import { put, call} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {signUp, auth} from "../api/rest/restContoller";
import {signUpErrors, authErrors} from "../constants/errors/user";


export function* signUpSaga({ signUpData, history }) {

    yield put({ type: ACTION.USER_DATA_REQUEST});

    const formData = new FormData();
    Object.keys(signUpData).forEach(elem => {
       formData.append(elem, signUpData[elem])
    });

    const {data} = yield call(signUp, formData);


    if(data.ok) {
        yield put({type: ACTION.USER_DATA_RESPONSE, data: data});
        yield history.push('/auth');
    }else {
        yield put({ type: ACTION.USER_DATA_ERROR, error: signUpErrors[data.desc] })
    }

}

export function* authSaga({ authData, history }) {

    yield put({ type: ACTION.USER_DATA_REQUEST});

    const formData = new FormData();
    Object.keys(authData).forEach(elem => {
        formData.append(elem, authData[elem])
    });

    const {data} = yield call(auth, formData);

    if(data.ok) {
        yield put({type: ACTION.USER_DATA_RESPONSE, data: data});
        yield localStorage.setItem('token', data.user_token);
        yield history.push("/bots");
    }else {
        yield put({ type: ACTION.USER_DATA_ERROR, error: authErrors[data.desc] })
    }

}