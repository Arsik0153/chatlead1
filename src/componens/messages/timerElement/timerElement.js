import React, {useState} from 'react';
import style from './timerElement.module.sass';
import {updateTrigger} from "../../../actions/actionCreator";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ClickOutsideHandler from "../../hoc/clickOutside";
import ButtonsContainer from '../buttonsContainer/buttonsContainer';
import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";


const TimerElement = (props) => {
    const [isOpenWindow, setStatusIsOpenWindow] = useState(false);
    const {type, index, value, changedTrigger} = props;

    const valuesForTimer = Object.values(value)[0];

    console.log(value);




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



    if(Object.keys(valuesForTimer)[0] === 'pause_delay') {
       return (
           <div className={style.mainContentContainer}>
               <div className={style.hoverBar}>
                   <HoverBarForMessage
                       {...props}
                       styleForBar={{top: '-25px', left: '320px'}}
                       // statusDraggable={(status) => setStatusDragable(status)}
                   />
               </div>
               <div className={style.mainContainer} onClick={() => setStatusIsOpenWindow(true)}>
                   {
                       <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
                           <div className={style.container}>
                               <div
                                   className={style.timerContainer}
                                   onClick={() => setStatusIsOpenWindow(true)}
                                   // onBlur={() => setStatusIsOpenWindow(true)}
                               >
                                   Задержка { valuesForTimer[Object.keys(valuesForTimer)[0]] || 0 } секунды
                               </div>
                               {
                                   isOpenWindow && (
                                       <div className={style.messageContainer}>
                                           <label>Delay time</label>
                                           <input
                                               type={'number'}
                                               defaultValue={valuesForTimer[Object.keys(valuesForTimer)[0]]}
                                               onInput={(e) => updateTrigger(e, 'pause_delay')}
                                           />
                                       </div>
                                   )
                               }

                           </div>
                       </ClickOutsideHandler>
                   }

               </div>
               {/*<ButtonsContainer*/}
                   {/*{...props}*/}
               {/*/>*/}
           </div>
       )
    }else if(Object.keys(valuesForTimer)[0] === 'activity_lost') {
        return (

            <div className={style.mainContentContainer}>

                <div className={style.hoverBar}>
                    <HoverBarForMessage
                        {...props}
                        styleForBar={{top: '-25px', left: '320px'}}
                        // statusDraggable={(status) => setStatusDragable(status)}
                    />
                </div>
                <div className={style.mainContainer} onClick={() => setStatusIsOpenWindow(true)}>
                    {
                        <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
                            <div className={style.container}>
                                <div
                                    className={style.timerContainer}
                                    onClick={() => setStatusIsOpenWindow(true)}
                                >
                                    Ожидать { valuesForTimer[Object.keys(valuesForTimer)[0]] || 0 } секунд
                                </div>
                                {
                                    isOpenWindow && (
                                        <div className={style.messageContainer}>
                                            <label>Delay time</label>
                                            <input
                                                type={'number'}
                                                defaultValue={valuesForTimer[Object.keys(valuesForTimer)[0]]}
                                                onInput={(e) => updateTrigger(e, 'activity_lost')}
                                            />
                                        </div>
                                    )
                                }

                            </div>
                        </ClickOutsideHandler>
                    }

                </div>
                {/*<ButtonsContainer*/}
                    {/*{...props}*/}
                {/*/>*/}
            </div>
        )
    }else {
        return (
           <div className={style.mainContentContainer}>
               <div className={style.hoverBar}>
                   <HoverBarForMessage
                       {...props}
                       styleForBar={{top: '-25px', left: '320px'}}
                       // statusDraggable={(status) => setStatusDragable(status)}
                   />
               </div>
               <div className={style.mainContainer} onClick={() => setStatusIsOpenWindow(true)}>
                   {
                       <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
                           <div className={style.container}>
                               <div
                                   className={style.timerContainer}
                               >
                                   Потеря активности до { valuesForTimer[Object.keys(valuesForTimer)[0]] || 0 }
                               </div>
                               {
                                   isOpenWindow && (
                                       <div className={style.messageContainer}>
                                           <label>Delay time</label>
                                           <input
                                               type={'date'}
                                               defaultValue={valuesForTimer[Object.keys(valuesForTimer)[0]]}
                                               onInput={(e) => updateTrigger(e, 'send_time')}
                                           />
                                       </div>
                                   )
                               }

                           </div>
                       </ClickOutsideHandler>
                   }

               </div>
               {/*<ButtonsContainer*/}
                   {/*{...props}*/}
               {/*/>*/}
           </div>
        )
    }

};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});

export default withRouter(connect(null, mapDispatchToProps)(TimerElement));