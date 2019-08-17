import React from 'react';
import style from './contextMenu.module.sass';
import {buttonsTypes} from "../../../../constants/defaultValues";
import {connect} from "react-redux";


const ContextMenu = (props) => {
    const {buttonEditHandler, typeButton} = props;


    const buttonChanger = () => {
        if(typeButton === 'empty') {
            return (
                <div className={style.buttonChanger}>
                    <h2>Отправиль сообщение</h2>
                    <h2>Открыть веб-сайт</h2>
                    <h2>Перейти на другой триггер</h2>
                </div>
            )
        }else if(typeButton === buttonsTypes.text_buttons) {
            return (
                <div className={style.buttonChanger}>
                    <label>Заголовок кнопки</label>
                    <input type={'text'} />
                    <h2>Отправить сообщение</h2>
                    <h3>Close</h3>
                    <select>
                        {
                            props.botScenarios.map(elem => (
                                <option>{elem.trigger_text}</option>
                            ))
                        }
                    </select>
                </div>
            )
        }else if(typeButton === buttonsTypes.url_buttons) {
            return (
                <div className={style.buttonChanger}>
                    <label>Заголовок кнопки</label>
                    <input type={'text'} />
                    <h2>Открыть сайт</h2>
                    <h3>Close</h3>
                    <input type={'text'} />
                </div>
            )
        }else if(typeButton === buttonsTypes.text_buttons) {
            {/*<label>Заголовок кнопки</label>*/}
            // <input type={'text'} />

        }
    };


    return (
        <div className={style.mainContainer}>

        </div>
    )
};

const mapStateToProps = state => {
    const {botScenarios, isFetching, error} = state.singleBotReducers;

    return {
        botScenarios, isFetching, error
    }
};

export default connect(mapStateToProps)(ContextMenu);