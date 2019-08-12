import React from 'react';
import style from './createBotForm.module.sass';
import {Field, reduxForm} from "redux-form";
import FancyInput from "../../inputs/fancyInput";
import {connect} from "react-redux";
import {createBot} from "../../../actions/actionCreator";
import {withRouter} from 'react-router';

const CreateBotForm = (props) => {


    return (
        <form autoComplete={'off'} className={style.mainContainer}>
            <Field
                name={'name'}
                type={'text'}
                component={FancyInput}
                label={'Название бота'}
            />
            <div
                className={style.submitButton}
                onClick={() => props.createBot(props.createBotForm.values)}
            >
                Добавить
            </div>
            <div className={style.error}>{props.error}</div>
        </form>
    )
};


const mapStateToProps = state => {
    const {createBotForm} = state.form;
    const {botsData, isFetching, error} = state.botsReducers;

    return {
        createBotForm, botsData, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    createBot: (nameBot) => dispatch(createBot(nameBot))
});


export default reduxForm({
    form: 'createBotForm'
})(withRouter((connect(mapStateToProps, mapDispatchToProps)(CreateBotForm))));