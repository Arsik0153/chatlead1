import React, {useState} from 'react';
import style from './fastButtons.module.sass';
import ContextMenu from './contextMenu/contextMenu';

const FastButtons = (props) => {
    const [isFocusInNewButton, focusInNewButton] = useState(false);

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

    // console.log(props.changedTrigger);

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
                                onBlur={() => focusInNewButton(false)}
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

export default FastButtons;