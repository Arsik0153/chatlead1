import React, {useState} from 'react';
import style from './textArea.module.sass';
import ButtonsContainer from "../../messages/buttonsContainer/buttonsContainer";
import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';

const TextArea = (props) => {
    const {value, handler, index, type, changedTrigger} = props;
    const [valueTextArea, setValueTextArea] = useState(Object.values(value)[0]);

    // console.log(Object.values(value)[0].indexOf('{phone}'));

    // console.log(Object.values(value)[0].replace(/{phone}/g, <div className={style.var}>Phone</div>));


    // Object.values(value)[0]
    //     .splice(
    //         Object.values(value)[0].indexOf('{phone}'),
    //         7,
    //         <div className={style.var}>Phone</div>
    //     )



    return (
        <div className={style.textArea} key={Object.values(value)[0]}>
            <div className={style.hoverBar}>
                <HoverBarForMessage
                    {...props}
                    styleForBar={{top: '-100px', left: '160px'}}
                    // statusDraggable={(status) => setStatusDragable(status)}
                />
            </div>
            {/*<p onInput={(e) => console.log(e.target)} tabIndex={1} contentEditable={true}>{valueTextArea}</p>*/}
            <textarea onBlur={(e) => handler(e, index, type)} defaultValue={Object.values(value)[0]} />
            <ButtonsContainer
                {...props}
            />

         </div>
    )
};

export default TextArea;