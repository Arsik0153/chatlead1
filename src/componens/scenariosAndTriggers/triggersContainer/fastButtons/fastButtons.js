import React, {useState} from 'react';
import style from './fastButtons.module.sass';
import ContextMenu from './contextMenu/contextMenu';
import { updateTrigger } from "../../../../actions/actionCreator";
import {connect} from 'react-redux';

const FastButtons = (props) => {
    const [isFocusInNewButton, focusInNewButton] = useState(false);

    const handleClick = () => {
        focusInNewButton(true);
        //const messagesCopy = changedTrigger.messages;


        const updationData = {
            type: "url"
        };

        const updatedTrigger = {
            //...changedTrigger,
            //index: index,
            messages: {},
            botId: props.match.params.botId
        };
        props.updateTrigger(updatedTrigger, updationData, props.changedSocial);
        props.updateTrigger()
    }

    // const {
    //     type,
    //     index,
    //     value,
    //     changedTrigger,
    //     changedSlideOrElement,
    //     styleForControls,
    //     styleForButton,
    //     styleForCaption,
    //     styleForContextMenu
    // } = props;

    // console.log(Object.keys(props.changedTrigger.keyboard));

    return (
        <div className={style.mainContainer}>

            {
                isFocusInNewButton ?
                    (
                        <div className={style.inputContainer}>
                            <input
                                className={style.openNewFastButton}
                                type={'text'}
                                autoFocus={true}
                                placeholder={'Название'}
                            />
                            <div className={style.contextMenuContainer}>
                                <ContextMenu
                                    focusStatus={focusInNewButton}
                                />
                            </div>
                        </div>
                    ) : (

                        <div
                            className={style.newFastButton}
                            onClick={() => focusInNewButton(true)}
                        >
                            + Быстрый ответ
                        </div>
                    )
            }

        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData, changedSocial) => dispatch(updateTrigger(triggerData, updationData, changedSocial)),
});

export default connect(null, mapDispatchToProps)(FastButtons);