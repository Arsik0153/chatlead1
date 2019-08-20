import React from 'react';
import style from './buttonsForAddNewMEssage.module.sass';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {updateTrigger} from "../../../../actions/actionCreator";
import {addNewMessagesButtons} from "../../../../constants/addNewMessagesButtons";
import {defaultValuesForNewMessages} from "../../../../constants/defaultValues";

const ButtonsForAddNewMessage = (props) => {
    const {changedTrigger} = props;


    const updateTriggerNewMessageHandler = (type, optional) => {
        const messagesCopy = changedTrigger.messages.concat();

        if(type === "timer") {
            messagesCopy.push(defaultValuesForNewMessages[optional]);
        }else {
            messagesCopy.push(defaultValuesForNewMessages[type]);
        }

        // console.log(messagesCopy);


        const updatedTrigger = {
            ...changedTrigger,
            messages: messagesCopy,
            botId: props.match.params.botId
        };
        props.updateTrigger(updatedTrigger, false);
    };


    return (
        <div className={style.mainContainer}>
            {
                addNewMessagesButtons.map(elem => (
                    <div
                        onClick={() => updateTriggerNewMessageHandler(elem.type, elem.optionalType)}
                        className={style.buttonElement}
                    >
                        {elem.icon}
                        <p>{elem.label}</p>
                    </div>
                ))
            }
        </div>
    )
};


const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});

export default withRouter(connect(null, mapDispatchToProps)(ButtonsForAddNewMessage));