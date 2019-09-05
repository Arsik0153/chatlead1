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

        const messagesCopy = changedTrigger.messages;

        messagesCopy[props.changedSocial][index].form.splice(inputIndex, 1,  e.target.value);


        const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: props.match.params.botId
        };

        props.updateTrigger(triggerData, null, props.changedSocial);


    };

    const updateTypeTrigger = (e, inputIndex) => {

        let type = e.target.value;

        const messagesCopy = changedTrigger.messages;

        messagesCopy[props.changedSocial][index].form.splice(inputIndex, 1,  e.target.value);


        const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: props.match.params.botId
        };
        console.log("updateTypeTrigger");
        console.log(triggerData);

        props.updateTrigger(triggerData, null, props.changedSocial);


    };

    const newInput = () => {
        const messagesCopy = changedTrigger.messages;

        messagesCopy[props.changedSocial][index].form.push('');

        const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: props.match.params.botId
        };

        props.updateTrigger(triggerData, null, props.changedSocial);

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
                    <div className={style.textareaFlex}>
                        <textarea
                            defaultValue={elem}
                            onBlur={(e) => updateTrigger(e, inputIndex)}
                            placeholder={"Введите вопрос"}
                        />
                        <select value={elem} onChange={(e) => {updateTypeTrigger(e, inputIndex)}}>
                            <option value="text">Текст</option>
                            <option value="phone">Телефон</option>
                            <option value="email">Email</option>
                            <option value="digits">Цифры</option>
                        </select>
                    </div>
                ))
            }
            <div className={style.addInputButton} onClick={newInput}>+ Поле ввода</div>
            <ButtonsContainer
                {...props}
            />
        </div>
    )
};



const mapStateToProps = state => {
    const {changedSocial} = state.singleBotReducers;

    return {
        changedSocial
    }
};



const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData, social) => dispatch(updateTrigger(triggerData, updationData, social)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormElement));