import React from 'react';
import style from './textArea.module.sass';
import ButtonsContainer from "../../messages/buttonsContainer/buttonsContainer";

const TextArea = (props) => {
    const {value, handler, index, type} = props;


    return (
        <div className={style.textArea} key={Object.values(value)[0]}>
            <textarea defaultValue={Object.values(value)[0]} onBlur={(e) => handler(e, index, type)} />
            <ButtonsContainer
                {...props}
            />
        </div>
    )
};

export default TextArea;