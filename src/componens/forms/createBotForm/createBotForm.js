import React from 'react';
import style from './createBotForm.module.sass';
import {Field, reduxForm} from "redux-form";
// import FancyInput from "../../inputs/fancyInput";
import {connect} from "react-redux";
import {createBot} from "../../../actions/actionCreator";
import {withRouter} from 'react-router';

import SimpleInput from "../../inputs/simpleInput";


const CreateBotForm = (props) => {

    // TODO styles
    return (
        <form autoComplete={'off'} className="add-bot">
            <Field
                name={'name'}
                type={'text'}
                component={SimpleInput}
                label={'Название бота'}
            />
            <button
                onClick={() => props.createBot(props.createBotForm.values)}
            >
                Добавить
            </button>
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