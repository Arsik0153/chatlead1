import React, {useState} from 'react';
import style from './buttonsContainer.module.sass';
import {buttonsTypes} from "../../../constants/defaultValues";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {updateTrigger} from "../../../actions/actionCreator";
import ContextMenu from './contextMenu/contextMenu';
import {ScenarioIdContext} from "../../../utils/Contexts";



const ButtonsContainer = (props) => {
    const [indexOpenButton, setIndexOpenButton] = useState(4);
    const {
        type,
        index,
        value,
        changedTrigger,
        changedSlideOrElement,
    } = props;

    const countMessage = () => {
        let count = 0;

        if(changedSlideOrElement || changedSlideOrElement === 0) {
            Object.values(value[changedSlideOrElement].keyboard).forEach(elem => {
                count = count + elem.length
            });
        }else {
            Object.values(value.keyboard).forEach(elem => {
                count = count + elem.length
            });
        }

        return count;
    };


    const appendNewButton = () => {

        const messagesCopy = changedTrigger.messages.concat();
        let text_button_Copy = null;
        let buttons = null;

        if(changedSlideOrElement || changedSlideOrElement === 0) {
            buttons = messagesCopy[index][type][changedSlideOrElement].keyboard;

        }else {
            buttons = messagesCopy[index].keyboard;
            // text_button_Copy = messagesCopy[index][type].keyboard[buttonsTypes.text_buttons];
        }

        text_button_Copy = buttons[buttonsTypes.text_buttons];

        if(!text_button_Copy) {
            text_button_Copy = [];
        }
        text_button_Copy.push({
            caption: 'Новая Кнопка',
            isEmpty: true
        });

        Object.assign(buttons, {
            [buttonsTypes.text_buttons]: text_button_Copy
        });

        const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: props.match.params.botId
        };

        props.updateTrigger(triggerData);


    };

    const allButtonsInMessage = () => {
        const messagesCopy = changedTrigger.messages.concat();
        const buttonsArray = [];


        const buttons
            = changedSlideOrElement || changedSlideOrElement === 0 ?
                    messagesCopy[index][type][changedSlideOrElement].keyboard :
                    messagesCopy[index].keyboard;


        Object.keys(buttons).forEach(typeButton => {
            buttons[typeButton].forEach((button, index) => {
                button.type = typeButton;
                button.indexInOriginal = index;
                buttonsArray.push(button);
            });
        });


        return buttonsArray;
    };


    const editButton = (typeButton, buttonData, indexButton, isEmpty) => {
        const messagesCopy = changedTrigger.messages.concat();
        let buttons = null;

        if(changedSlideOrElement || changedSlideOrElement === 0) {
            buttons = messagesCopy[index][type][changedSlideOrElement].keyboard

        }else {
            buttons = messagesCopy[index].keyboard
        }

        const buttonInMessagesArray = allButtonsInMessage()[indexButton];

        if(!buttons[typeButton]) {
            buttons[typeButton] = [];
        }

        buttons[buttonInMessagesArray.type].splice([buttonInMessagesArray.indexInOriginal], 1);
        Object.assign(buttonData, {
            isEmpty: isEmpty || false
        });

        buttons[typeButton].push(buttonData);


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
                allButtonsInMessage().map((elem, index) => (

                    <div className={style.buttonElement} onClick={() => setIndexOpenButton(index)}>
                           <div>
                               {
                                   indexOpenButton === index && (
                                       <ScenarioIdContext.Consumer>
                                           {scenarioId => (
                                               <ContextMenu
                                                   buttonEditHandler={editButton}
                                                   typeButton={elem.isEmpty ? 'empty' : elem.type}
                                                   scenarioId={scenarioId}
                                                   indexButton={indexOpenButton}
                                                   buttonData={elem}
                                                   setIndexOpenButton={setIndexOpenButton}
                                                   changedTrigger={changedTrigger}
                                                   messageIndex={index}
                                               />
                                           )}
                                       </ScenarioIdContext.Consumer>
                                   )
                               }
                               <div>{elem.caption}{elem.isEmpty ? `(empty)` : `${elem.type}`}</div>
                           </div>
                    </div>
                ))
            }

            <div className={style.controls}>

                {
                    changedSlideOrElement || changedSlideOrElement === 0 ?
                        countMessage() === 0 && <h2 onClick={() => appendNewButton()}>+ Кнопка</h2>
                        : countMessage() < 3 && <h2 onClick={() => appendNewButton()}>>+ Кнопка</h2>
                }
            </div>
        </div>
    )
};



const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});

export default withRouter(connect(null, mapDispatchToProps)(ButtonsContainer));