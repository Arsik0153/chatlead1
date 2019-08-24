import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import style from './triggersContainer.module.sass';
import {addNewTrigger, updateTrigger} from "../../../actions/actionCreator";
import {connect} from 'react-redux';
import {fileDefinition} from "../../../utils/fileDefinition/fileDefinition";
import ButtonsForAddNewMessage from '../../inputs/buttons/buttonsForAddNewMessages/buttonsForAddNewMessage';
import SideBarSocial from '../../sideBarSocial/sideBarSocial';
import MessagesContainer from './messagesContainer/messagesContainer';
import BroadCastMenu from '../../broadCastContainer/broadCastMenu/broadCastMenu';
import {destinationScenario} from "../../../constants/defaultValues";


const TriggersContainer = (props) => {
    // const changedScenario = props.botScenarios.filter(elem => elem.id === props.changedScenarioId)[0];
    const changedScenario = props.botScenarios.filter(elem => elem.id === props.scenarioId)[0];
    const {triggers} = changedScenario;
    const [changedTriggerId, changeTriggerId]
        = useState(triggers.length === 0 ? null : triggers[0].id);
    const changedTrigger = changedTriggerId ? triggers.filter(elem => elem.id === changedTriggerId)[0] : null;

    useEffect(() => {
        if(triggers.length === 1) {
            changeTriggerId(triggers[0].id)
        }
    }, [triggers]);


    const newTriggerHandler = () => {
        const triggerData = {
          scenario_id: changedScenario.id,
          manager_id: props.match.params.botId,
        };

        props.appendTrigger(triggerData);
    };

    const newTriggerInEmptyScenario = () => {
        const triggerData = {
            scenario_id: changedScenario.id,
            manager_id: props.match.params.botId,
        };

        props.appendTrigger(triggerData);
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

    if(!changedTrigger) {
        return(
            <div className={style.emptyMainContainer}>
                <div className={style.emptySideContainer}>
                    {
                        triggers.length === 0 && <h2>Здесь пока пусто. Создайте первый триггер</h2>
                            // ) : (
                            //     // triggers.map(trigger => (
                            //     //     <div
                                //         className={style.singleTriggerContainer}
                                //         onClick={() => changeTriggerId(trigger.id)}
                                //     >
                                //         <div
                                //             style={trigger.id === changedTriggerId
                                //                 ? {border: '1px solid #13ce66', color: '#13ce66'} : {}}
                                //             className={style.triggerElement}
                                //         >
                                //             {trigger.caption}
                                //         </div>
                                //     </div>
                                // ))
                            // )

                    }
                    <div onClick={newTriggerInEmptyScenario} className={style.newTriggerContainer}>+ Новый триггер</div>
                </div>
            </div>
        )
    }


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
                                className={style.triggerElement}
                            >
                                {trigger.caption}
                            </div>
                        </div>
                    ))
                }
                <div onClick={newTriggerHandler} className={style.newTriggerContainer}>+ Новый триггер</div>
            </div>
            <div className={style.contentContainer}>
                <div className={style.contentHeader}>{changedScenario.trigger_text}</div>
                <MessagesContainer
                    changedTrigger={changedTrigger}
                    updateTriggerUpdateMessageHandler={updateTriggerUpdateMessageHandler}
                    updateTriggerDeleteMessageHandler={updateTriggerDeleteMessageHandler}
                />

                <div className={style.controls}>
                    <ButtonsForAddNewMessage
                        changedTrigger={changedTrigger}
                    />
                </div>
                <div className={style.broadCastMenu}>
                    {
                        changedScenario.destination === destinationScenario.broadcast && (
                            <BroadCastMenu
                                broadCastId={props.broadCastId}
                                changedTrigger={changedTrigger}
                            />
                        )
                    }
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
    appendTrigger: (triggerData) => dispatch(addNewTrigger(triggerData))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TriggersContainer));
