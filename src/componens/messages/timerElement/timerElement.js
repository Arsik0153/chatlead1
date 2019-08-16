import React, {useState} from 'react';
import style from './timerElement.module.sass';
import {updateTrigger} from "../../../actions/actionCreator";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ClickOutsideHandler from "../../hoc/clickOutside";


const TimerElement = (props) => {
    const [isOpenWindow, setStatusIsOpenWindow] = useState(false);
    const {type, index, value, changedTrigger} = props;




    const updateTrigger = (e, typeInput) => {
        const messagesCopy = changedTrigger.messages.concat();

        Object.assign(messagesCopy[index].timer, {
            [typeInput]: e.target.value
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




    if(Object.keys(value)[0] === 'pause_delay') {
       return (
           <div className={style.mainContainer} onClick={() => setStatusIsOpenWindow(true)}>
               {
                   <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
                       <div className={style.container}>
                           <div
                               className={style.timerContainer}
                               onClick={() => setStatusIsOpenWindow(true)}
                               // onBlur={() => setStatusIsOpenWindow(true)}
                           >
                               Задержка { value[Object.keys(value)[0]] || 0 } секунды
                           </div>
                           {
                               isOpenWindow && (
                                   <div className={style.messageContainer}>
                                       <label>Delay time</label>
                                       <input
                                           type={'number'}
                                            defaultValue={value[Object.keys(value)[0]]}
                                           onInput={(e) => updateTrigger(e, 'pause_delay')}
                                       />
                                   </div>
                               )
                           }
                       </div>
                   </ClickOutsideHandler>
               }

           </div>
       )
    }else if(Object.keys(value)[0] === 'activity_lost') {
        return (

            <div className={style.mainContainer} onClick={() => setStatusIsOpenWindow(true)}>
                {
                    <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
                        <div className={style.container}>
                            <div
                                className={style.timerContainer}
                                onClick={() => setStatusIsOpenWindow(true)}
                            >
                                Ожидать { value[Object.keys(value)[0]] || 0 } секунд
                            </div>
                            {
                                isOpenWindow && (
                                    <div className={style.messageContainer}>
                                        <label>Delay time</label>
                                        <input
                                            type={'number'}
                                            defaultValue={value[Object.keys(value)[0]]}
                                            onInput={(e) => updateTrigger(e, 'activity_lost')}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </ClickOutsideHandler>
                }

            </div>
        )
    }else {
        return (
            <div className={style.mainContainer} onClick={() => setStatusIsOpenWindow(true)}>
                {
                    <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
                        <div className={style.container}>
                            <div
                                className={style.timerContainer}
                            >
                                Потеря активности до { value[Object.keys(value)[0]] || 0 }
                            </div>
                            {
                                isOpenWindow && (
                                    <div className={style.messageContainer}>
                                        <label>Delay time</label>
                                        <input
                                            type={'date'}
                                            defaultValue={value[Object.keys(value)[0]]}
                                            onInput={(e) => updateTrigger(e, 'send_time')}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </ClickOutsideHandler>
                }

            </div>
        )
    }

};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});

export default withRouter(connect(null, mapDispatchToProps)(TimerElement));