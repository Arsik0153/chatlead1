import React from 'react';
import style from './contextMenu.module.sass';
import {buttonsTypes, defaultValuesForNewButtons} from "../../../../constants/defaultValues";
import {connect} from "react-redux";
import onClickOutside from "react-onclickoutside";
import Actions from '../actions/actions';



const ContextMenu = (props) => {
    const {buttonEditHandler, typeButton, scenarioId, indexButton, buttonData, setIndexOpenButton} = props;
    const changedScenario = props.botScenarios.filter(elem => elem.id === scenarioId)[0];



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
                <>
                    <div className={style.header}>
                        Редактировать кнопку
                    </div>
                    <h2>Типы кнопок: </h2>
                    <div className={style.buttonChanger}>
                        <div
                            onClick={() => {
                                buttonEditHandler(
                                    buttonsTypes.text_buttons,
                                    defaultValuesForNewButtons[buttonsTypes.text_buttons],
                                    indexButton
                                )
                            }}
                            className={style.changerElement}
                        >
                            Отправить сообщение
                        </div>
                        <div
                            onClick={() => {
                                buttonEditHandler(
                                    buttonsTypes.url_buttons,
                                    defaultValuesForNewButtons[buttonsTypes.url_buttons],
                                    indexButton
                                )
                            }}
                            className={style.changerElement}
                        >
                            Открыть веб-сайт
                        </div>
                        <div
                            onClick={() => {
                                buttonEditHandler(
                                    buttonsTypes.fast_buttons,
                                    defaultValuesForNewButtons[buttonsTypes.fast_buttons],
                                    indexButton
                                )
                            }}
                            className={style.changerElement}
                        >
                            Перейти на другой тригер
                        </div>
                        <Actions
                            {...props}
                        />
                        <div className={style.controls}>
                            <div className={style.controlsButton}>Удалить</div>
                            <div className={style.controlsButtonAccept}>Добавить</div>
                        </div>
                    </div>
                </>
            )
        }else if(typeButton === buttonsTypes.text_buttons) {
            return (
                <>
                    <div className={style.header}>
                        Редактировать кнопку
                    </div>
                    <div className={style.buttonChanger}>
                        {
                            buttonData.caption && (
                                <>
                                    <h2>Заголовок кнопки:</h2>
                                    <input
                                        type={'text'}
                                        defaultValue={buttonData.caption}
                                        placeholder={'title'}
                                        disabled={true}
                                    />
                                </>
                            )
                        }
                        <h2>Выберите команду:</h2>
                        <select onChange={editButton}>
                            {
                                props.botScenarios.map(elem => (
                                    <option
                                        selected={buttonData.caption === elem.trigger_text}
                                        value={elem.trigger_text}
                                    >
                                        {elem.trigger_text}
                                    </option>
                                ))
                            }
                        </select>
                        <h3 onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                            caption: ''
                        }), indexButton, true)}>Close</h3>

                    </div>
                </>
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
                    <h3 onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                        caption: ''
                    }), indexButton, true)}>Close</h3>
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
                   <h3 onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                       caption: ''
                   }), indexButton, true)}>Close</h3>
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
            {
                buttonChanger()
            }
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