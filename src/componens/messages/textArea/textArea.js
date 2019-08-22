import React, {useState} from 'react';
import style from './textArea.module.sass';
import ButtonsContainer from "../../messages/buttonsContainer/buttonsContainer";
import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';

const TextArea = (props) => {
    const {value, handler, index, type, changedTrigger} = props;




    return (
        <div className={style.textArea} key={Object.values(value)[0]}>
            <div className={style.hoverBar}>
                <HoverBarForMessage
                    {...props}
                    styleForBar={{top: '-100px', left: '160px'}}
                    // statusDraggable={(status) => setStatusDragable(status)}
                />
            </div>
            <textarea defaultValue={Object.values(value)[0]} onBlur={(e) => handler(e, index, type)} />
            <ButtonsContainer
                {...props}
            />

         </div>
    )
};

export default TextArea;