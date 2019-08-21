import React from 'react';
import style from './controls.module.sass';
import {connect} from "react-redux";
import {updateTrigger} from "../../../../../actions/actionCreator";
import {withRouter} from "react-router-dom";

const Controls = (props) => {
    const {setIndexOpenButton, typeButton, changedTrigger, indexButton, index} = props;

    const deleteButton = () => {

        const messagesCopy = changedTrigger.messages.concat();

        messagesCopy[index].keyboard.splice(indexButton, 1);

        const triggerData = {
            ...changedTrigger,
            index,
            type: typeButton,
            messages: messagesCopy,
            botId: props.match.params.botId
        };

        props.updateTrigger(triggerData);

    };


    return (
        <div className={style.controls}>
            <div className={style.controlsButton} onClick={deleteButton}>Удалить</div>
            <div
                className={style.controlsButtonAccept}
                onMouseDown={() => setIndexOpenButton(false)}
            >
                Добавить
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData) => dispatch(updateTrigger(triggerData)),
});


export default withRouter(connect(null, mapDispatchToProps)(Controls));