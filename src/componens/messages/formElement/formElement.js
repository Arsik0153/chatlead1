import React from 'react';
import style from './formElement.module.sass';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {updateTrigger} from "../../../actions/actionCreator";
import ButtonsContainer from '../../messages/buttonsContainer/buttonsContainer';
import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";

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
            <div className={style.hoverBar}>
                <HoverBarForMessage
                    {...props}
                    styleForBar={{top: '-20px', left: '320px'}}
                    // statusDraggable={(status) => setStatusDragable(status)}
                />
            </div>
            {
                Object.values(value)[0].map((elem, inputIndex) => (
                    <textarea
                        defaultValue={elem}
                        onBlur={(e) => updateTrigger(e, inputIndex)}
                        placeholder={"Введите вопрос"}
                    />
                ))
            }
            <div className={style.addInputButton} onClick={newInput}>+ Поле ввода</div>
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