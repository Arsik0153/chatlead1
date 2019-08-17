import React from 'react';
import style from './textArea.module.sass';

const TextArea = (props) => {
    const {value, handler, index, key} = props;
    // const [valueText, setValueText] = useState(value);

    console.log(value);

    return (
        <div className={style.textArea}>
            <textarea defaultValue={value} onBlur={(e) => handler(e, index, key)} />
            {/*<h3 onClick={() => deleteHandler(index)}>delete</h3>*/}
            {/*<div className={style.button}>+ Добавить клавишу</div>*/}
        </div>
    )
};

export default TextArea;