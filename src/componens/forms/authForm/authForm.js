import React from 'react';
import style from './auth.module.sass';
import {Field, reduxForm} from "redux-form";
import FancyInput from "../../inputs/fancyInput";
import {connect} from "react-redux";
import {auth} from "../../../actions/actionCreator";
import {withRouter} from 'react-router';

const AuthForm = (props) => {

    const sumbitHandler = () => {

        props.authAction(props.auth.values, props.history);
    };


  return (
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
              onClick={sumbitHandler}
          >
              Войти
          </div>
          <div className={style.error}>{props.error}</div>
      </form>
  )
};


const mapStateToProps = state => {
    const {auth} = state.form;
    const {userData, isFetching, error} = state.userReducers;

    return {
        auth, userData, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    authAction: (authData, history) => dispatch(auth(authData, history))
});


export default reduxForm({
    form: 'auth'
})(withRouter((connect(mapStateToProps, mapDispatchToProps)(AuthForm))));