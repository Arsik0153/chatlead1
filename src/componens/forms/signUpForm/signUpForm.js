import React from "react";
import { Field, reduxForm } from 'redux-form';
import {withRouter} from 'react-router';
import {connect} from "react-redux";
import validate from "../../../utils/validation/registrValidate";
import FancyInput from "../../inputs/fancyInput";
// import {sendFormDataSignUp} from "../../../actions/actionCreator";
import style from "./signUpForm.module.sass";
import {signUp} from "../../../actions/actionCreator";


const SignUpForm = (props) => {
    const {registration} = props;

    const submit = (values) => {

        if(!registration.syncErrors) {
            props.signUpAction(registration.values, props.history);
        }
    };


    return(
        <form autoComplete={'off'} className={style.mainContainer}>
                <div className={style.fieldsContainer}>
                    <Field
                        name={'login'}
                        type={'text'}
                        component={FancyInput}
                        label={'Почта'}
                    />
                    <Field
                        name={'password'}
                        type={'password'}
                        component={FancyInput}
                        label={'Пароль'}
                    />
                </div>
                <div
                    className={style.submitButton}
                    onClick={submit}
                >
                    Зарегистрироватся
                    {/*{props.isFetching ? 'Подождите...' : 'Зарегистрироватся'}*/}
                </div>
                <div className={style.error}>{props.error}</div>
        </form>
    );
};

const mapStateToProps = state => {
    const {registration} = state.form;
    const {userData, isFetching, error} = state.userReducers;

    return {
        registration, userData, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    signUpAction: (signUpData, history) => dispatch(signUp(signUpData, history))
});



export default reduxForm({
    form: 'registration',
    validate
})(connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpForm)));