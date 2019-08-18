import React from 'react';
import style from './formElement.module.sass';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {updateTrigger} from "../../../actions/actionCreator";
import ButtonsContainer from '../../messages/buttonsContainer/buttonsContainer';

const FormElement = (props) => {
    const {type, index, value, changedTrigger} = props;

    const updateTrigger = (e, inputIndex) => {

        const messagesCopy = changedTrigger.messages.concat();

        messagesCopy[index].form.splice(inputIndex, 1,  e.target.value);


        const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: props.match.params.botId
        };

        props.updateTrigger(triggerData);


    };

    const newInput = () => {
        const messagesCopy = changedTrigger.messages.concat();

        messagesCopy[index].form.push('');

        const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: props.match.params.botId
        };

        props.updateTrigger(triggerData);

    };


    return (
        <div className={style.mainContainer}>
            {
                Object.values(value)[0].map((elem, inputIndex) => (
                    <input
                        defaultValue={elem}
                        onBlur={(e) => updateTrigger(e, inputIndex)}
                        placeholder={"Введите вопрос"}
                    />
                ))
            }
            <h2 onClick={newInput}>+ input</h2>
            <ButtonsContainer
                {...props}
            />
        </div>
    )
};



const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});

export default withRouter(connect(null, mapDispatchToProps)(FormElement));