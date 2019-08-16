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


        // const updationData = {
        //     type: 'text'
        // };
        // if(typeInput === 'text' || typeInput === 'title') {
        //     Object.assign(messagesCopy[index][type][changedSlide], {
        //         [typeInput]: e.target.value
        //     });
        // }else {
        //     Object.assign(updationData, {
        //         file: e.target.files[0],
        //         type: 'photo'
        //     })
        // }
        //
        const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: props.match.params.botId
        };

        props.updateTrigger(triggerData);


        //
        // if(typeInput === 'text' || typeInput === 'title') {
        //     props.updateTrigger(triggerData);
        // }else {
        //     props.updateTrigger(triggerData, updationData);
        // }

    };



    if(Object.keys(value)[0] === 'pause_delay') {
       return (
           <div className={style.mainContainer}>
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
                                           onBlur={(e) => updateTrigger(e, 'pause_delay')}
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

            <div className={style.mainContainer}>
                {
                    <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
                        <div className={style.container}>
                            <div
                                className={style.timerContainer}
                                onClick={() => setStatusIsOpenWindow(true)}
                                // onBlur={() => setStatusIsOpenWindow(true)}
                            >
                                Ожиидать { value[Object.keys(value)[0]] || 0 } секунд
                            </div>
                            {
                                isOpenWindow && (
                                    <div className={style.messageContainer}>
                                        <label>Delay time</label>
                                        <input
                                            type={'number'}
                                            defaultValue={value[Object.keys(value)[0]]}
                                            onBlur={(e) => updateTrigger(e, 'activity_lost')}
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
            <div className={style.mainContainer}>
                {
                    <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
                        <div className={style.container}>
                            <div
                                className={style.timerContainer}
                                onClick={() => setStatusIsOpenWindow(true)}
                                // onBlur={() => setStatusIsOpenWindow(true)}
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
                                            onBlur={(e) => updateTrigger(e, "send_time")}
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

    //
    // return (
    //     <div className={style.mainContainer}>
    //
    //     </div>
    // )
};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});

export default withRouter(connect(null, mapDispatchToProps)(TimerElement));