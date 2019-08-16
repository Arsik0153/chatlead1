import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import style from './triggersContainer.module.sass';
import {addNewTrigger, updateTrigger} from "../../../actions/actionCreator";
import {connect} from 'react-redux';
import {fileDefinition, emptyFile} from "../../../utils/fileDefinition/fileDefinition";
import ButtonsForAddNewMessage from '../../inputs/buttons/buttonsForAddNewMessages/buttonsForAddNewMessage';
import SideBarSocial from '../../sideBarSocial/sideBarSocial';


const TriggersContainer = (props) => {
    const changedScenario = props.botScenarios.filter(elem => elem.id === props.changedScenarioId)[0];
    const {triggers} = changedScenario;
    const [changedTriggerId, changeTriggerId] = useState(triggers[0].id);
    const changedTrigger = triggers.filter(elem => elem.id === changedTriggerId)[0];

    // useEffect(() => {
    //
    // }, [props.botScenarios]);

    const newTriggerHandler = () => {
        // console.log(changedScenario, props.botsData);
        // const triggerData = {
        //   scenario_id: changedScenario.id,
        //   manager_id:
        // };
    };

    const updateTriggerDeleteMessageHandler = (index) => {
        console.log(index);
    };

    const updateTriggerUpdateMessageHandler = (e, index, typeFile) => {

        const messagesCopy = changedTrigger.messages.concat();


        const updationData = {
            type: typeFile,
        };
        if(typeFile === 'text') {
            Object.assign(updationData, { text: e.target.value })
        }else {
            Object.assign(updationData, { file: e.target.files[0] })
        }

        const updatedTrigger = {
            ...changedTrigger,
            index: index,
            messages: messagesCopy,
            botId: props.match.params.botId
        };
        props.updateTrigger(updatedTrigger, updationData);

    };




    return (
        <div className={style.mainContainer}>
            <div className={style.sideContainer}>
                {
                    triggers.map(trigger => (
                        <div
                            className={style.singleTriggerContainer}
                            onClick={() => changeTriggerId(trigger.id)}
                        >
                            <div
                                style={trigger.id === changedTriggerId
                                    ? {border: '1px solid #13ce66', color: '#13ce66'} : {}}

                            >
                                {trigger.caption}
                            </div>
                        </div>
                    ))
                }
                <div onClick={newTriggerHandler}>+Новый триггер</div>
            </div>
            <div className={style.contentContainer}>
                {
                    changedTrigger.messages.map((elem, index) => (
                        <div className={style.message}>
                            {
                                fileDefinition(
                                    Object.keys(elem)[0],
                                    Object.values(elem)[0],
                                    updateTriggerUpdateMessageHandler,
                                    index,
                                    updateTriggerDeleteMessageHandler,
                                    changedTrigger
                                )
                            }
                        </div>
                    ))
                }
                <div className={style.controls}>
                    <ButtonsForAddNewMessage
                        changedTrigger={changedTrigger}
                    />
                </div>
            </div>
            <div className={style.social}>
                <SideBarSocial
                    changedTrigger={changedTrigger}
                />
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    const {botScenarios, isFetching, error} = state.singleBotReducers;
    const {botsData} = state.botsReducers;

    return {
        botScenarios, isFetching, error, botsData
    }
};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TriggersContainer));
