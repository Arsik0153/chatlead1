import React from 'react';
import style from './contextMenu.module.sass';
import {buttonsTypes, defaultValuesForNewButtons} from "../../../../constants/defaultValues";
import {connect} from "react-redux";
import onClickOutside from "react-onclickoutside";



const ContextMenu = (props) => {
    const {buttonEditHandler, typeButton, scenarioId, indexButton, buttonData, setIndexOpenButton, changedTrigger, messageIndex} = props;
    const changedScenario = props.botScenarios.filter(elem => elem.id === scenarioId)[0];


    console.log(buttonData);


    const editButton = (e, forCaption) => {

        if(typeButton === buttonsTypes.text_buttons) {
            Object.assign(buttonData, {
                caption: e.target.value
            })
        }else if(typeButton === buttonsTypes.url_buttons) {
            if(forCaption) {
                Object.assign(buttonData, {
                    caption: e.target.value
                })
            }else {
                Object.assign(buttonData, {
                    url: e.target.value
                })
            }
        }else if(typeButton === buttonsTypes.fast_buttons) {
            if(forCaption) {
                Object.assign(buttonData, {
                    caption: e.target.value
                })
            }else {
                Object.assign(buttonData, {
                    payload: {
                        trigger_id: e.target.value
                    }
                })
            }

        }


        buttonEditHandler(typeButton, buttonData, indexButton);
    };


    const buttonChanger = () => {
        if(typeButton === 'empty') {
            return (
                <div className={style.buttonChanger}>
                    <h2
                        onClick={() => {
                            buttonEditHandler(
                                buttonsTypes.text_buttons,
                                defaultValuesForNewButtons[buttonsTypes.text_buttons],
                                indexButton
                            )
                        }}
                    >
                        Отправить сообщение
                    </h2>
                    <h2
                        onClick={() => {
                            buttonEditHandler(
                                buttonsTypes.url_buttons,
                                defaultValuesForNewButtons[buttonsTypes.url_buttons],
                                indexButton
                            )
                        }}
                    >
                        Открыть веб-сайт
                    </h2>
                    <h2
                        onClick={() => {
                            buttonEditHandler(
                                buttonsTypes.fast_buttons,
                                defaultValuesForNewButtons[buttonsTypes.fast_buttons],
                                indexButton
                            )
                        }}
                    >
                        Перейти на другой тригер
                    </h2>
                </div>
            )
        }else if(typeButton === buttonsTypes.text_buttons) {
            return (
                <div className={style.buttonChanger}>
                    <h2>Заголовок кнопки:</h2>
                    <h3>{buttonData.caption}</h3>
                    <h2>Выберите команду:</h2>
                    <select onChange={editButton} defaultValue={buttonData.caption}>
                        {
                            props.botScenarios.map(elem => (
                                <option value={elem.trigger_text}>{elem.trigger_text}</option>
                            ))
                        }
                    </select>
                    <h3 onClick={() => buttonEditHandler(typeButton, buttonData, indexButton, true)}>Close</h3>

                </div>
            )
        }else if(typeButton === buttonsTypes.url_buttons) {
            return (
                <div className={style.buttonChanger}>
                    <label>Заголовок кнопки</label>
                    <input
                        type={'text'}
                        defaultValue={buttonData.caption}
                        placeholder={'title'}
                        onInput={(e) => editButton(e, true)}
                    />
                    <h3 onClick={() => buttonEditHandler(typeButton, buttonData, indexButton, true)}>Close</h3>
                    <input type={'text'} placeholder={'URL'} defaultValue={buttonData.url} onInput={editButton}/>
                </div>
            )
        }else if(typeButton === buttonsTypes.fast_buttons) {
           return (
               <div>
                   <label>Заголовок кнопки</label>
                   <input
                       type={'text'}
                       defaultValue={buttonData.caption}
                       title={'title'}
                       onInput={(e) => editButton(e, true)}
                   />
                   <h3 onClick={() => buttonEditHandler(typeButton, buttonData, indexButton, true)}>Close</h3>
                   <select onChange={editButton} defaultValue={buttonData.caption}>
                       {
                           changedScenario.triggers.map(trigger => (
                               <option value={trigger.id}>
                                   {trigger.caption}
                               </option>
                           ))
                       }
                   </select>
               </div>
           )

        }
    };

    ContextMenu.handleClickOutside = () => setIndexOpenButton(false);


    return (
        <div className={style.mainContainer}>
            {buttonChanger()}
        </div>
    )
};

const clickOutsideConfig = {
    handleClickOutside: () => ContextMenu.handleClickOutside
};

const mapStateToProps = state => {
    const {botScenarios, isFetching, error} = state.singleBotReducers;

    return {
        botScenarios, isFetching, error
    }
};

export default onClickOutside(connect(mapStateToProps)(ContextMenu), clickOutsideConfig);