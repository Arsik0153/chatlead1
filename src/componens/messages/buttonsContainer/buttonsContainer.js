import React, {useState} from 'react';
import style from './buttonsContainer.module.sass';
import {buttonsTypes} from "../../../constants/defaultValues";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {updateTrigger} from "../../../actions/actionCreator";
import ContextMenu from './contextMenu/contextMenu';
import {ScenarioIdContext} from "../../../utils/Contexts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
// import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {markForButton} from "../../../constants/markForButon";


const ButtonsContainer = (props) => {
    const [indexOpenButton, setIndexOpenButton] = useState(false);
    const {
        type,
        index,
        value,
        changedTrigger,
        changedSlideOrElement,
        styleForControls,
        styleForButton,
        styleForCaption,
        styleForContextMenu
    } = props;



    const appendNewButton = () => {

        const messagesCopy = changedTrigger.messages.concat();
        let buttons = null;

        if(changedSlideOrElement || changedSlideOrElement === 0) {
            buttons = messagesCopy[index][type][changedSlideOrElement].keyboard;

        }else {
            buttons = messagesCopy[index].keyboard;
        }

        buttons.push({
            caption: 'Новая Кнопка',
            isEmpty: true,
            type: buttonsTypes.text_buttons
        });

        const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: props.match.params.botId
        };
        //
        props.updateTrigger(triggerData);


    };

    const allButtonsInMessage = () => {
        const messagesCopy = changedTrigger.messages.concat();
        const buttonsArray = changedSlideOrElement || changedSlideOrElement === 0 ?
                messagesCopy[index][type][changedSlideOrElement].keyboard : messagesCopy[index].keyboard;


        return buttonsArray;
    };


    const editButton = (typeButton, buttonData, indexButton, isEmpty) => {

        const messagesCopy = changedTrigger.messages.concat();

        const buttonsValues = allButtonsInMessage();

        Object.assign(buttonsValues[indexButton], buttonData, {
            isEmpty: isEmpty || false,
            type: typeButton
        });

        messagesCopy[index].keyboard = buttonsValues;

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
                allButtonsInMessage().map((elem, indexArr) => (

                    <div className={style.buttonElement} onClick={() => setIndexOpenButton(indexArr)}>
                           <div>
                               {
                                   indexOpenButton === indexArr && (
                                       <ScenarioIdContext.Consumer>
                                           {scenarioId => (
                                               <ContextMenu
                                                   buttonEditHandler={editButton}
                                                   typeButton={elem.isEmpty ? 'empty' : elem.type}
                                                   scenarioId={scenarioId}
                                                   indexButton={indexArr}
                                                   buttonData={elem}
                                                   setIndexOpenButton={setIndexOpenButton}
                                                   changedTrigger={changedTrigger}
                                                   styleForContextMenu={styleForContextMenu}
                                                   index={index}
                                               />
                                           )}
                                       </ScenarioIdContext.Consumer>
                                   )
                               }
                               <div className={style.button} style={styleForButton}>
                                   <div className={style.captionContainer} style={styleForCaption}>
                                       {
                                           elem.caption || 'Новая Кнопка'
                                       }
                                   </div>
                                   <div className={style.label}>
                                       {
                                           elem.isEmpty
                                               ? <FontAwesomeIcon icon={faCircle}/>
                                               : markForButton[elem.type]
                                       }
                                   </div>
                               </div>
                           </div>
                    </div>
                ))
            }

            {
                changedSlideOrElement || changedSlideOrElement === 0 ?
                    allButtonsInMessage().length === 0 && (
                        <div className={style.controls} style={styleForControls || {}}>
                            <h2 onClick={() => appendNewButton()}>+ Добавить кнопку</h2>
                        </div>
                    )
                    : allButtonsInMessage().length < 3 && (
                        <div className={style.controls} style={styleForControls || {}}>
                            <h2 onClick={() => appendNewButton()}>+ Добавить кнопку</h2>
                        </div>
                    )
            }

        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});

export default withRouter(connect(null, mapDispatchToProps)(ButtonsContainer));