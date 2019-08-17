import React from 'react';
import FancyFileInput from "../../componens/inputs/fancyFileInput/fancyFileInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faVolumeDown, faVideo, faPaperclip} from "@fortawesome/free-solid-svg-icons";
import CardOrGalleryEllement from '../../componens/messages/cardOrGalleryElement/cardOrGalleryElement';
import ListElement from '../../componens/messages/listElement/listElement';
import FormElement  from '../../componens/messages/formElement/formElement';
import TimerElement from '../../componens/messages/timerElement/timerElement';
import style from './fileDefinition.module.sass';
import TextArea from '../../componens/messages/textArea/textArea';


export const fileDefinition = (key, value, handler, index, deleteHandler, changedTrigger) => {
    if(key === 'text') {
        return (
            <div className={style.textArea} key={value}>
                <textarea defaultValue={value} onBlur={(e) => handler(e, index, key)} />
                {/*<h3 onClick={() => deleteHandler(index)}>delete</h3>*/}
                <div className={style.button}>+ Добавить клавишу</div>
            </div>
        )
    }else if(key === 'audio') {
        return (
            <FancyFileInput
                type={'file'}
                index={index}
                pictureForLabel={{
                    label: 'audio',
                    img: <FontAwesomeIcon icon={faVolumeDown}/>
                }}
                value={value}
                accept={'audio/*'}
                onChange={(e) => handler(e, index, key)}
            />

        )
    }else if(key === 'video') {
        return (
            <FancyFileInput
                type={'file'}
                index={index}
                pictureForLabel={{
                    label: 'video',
                    img: <FontAwesomeIcon icon={faVideo}/>
                }}
                value={value}
                accept={'video/*'}
                onChange={(e) => handler(e, index, key)}
            />

        )
    }else if(key === 'photo') {
        return (
            <FancyFileInput
                type={'file'}
                index={index}
                pictureForLabel={{
                    label: 'image',
                    img: <FontAwesomeIcon icon={faImage}/>
                }}
                accept={'image/*'}
                value={value}
                onChange={(e) => handler(e, index, key)}
            />
        )
    }else if(key === 'card') {
        return (
            <CardOrGalleryEllement
                type={'card'}
                index={index}
                pictureForLabel={{
                    label: 'image',
                    img: <FontAwesomeIcon icon={faImage}/>
                }}
                changedTrigger={changedTrigger}
                value={value}
                onChange={(e) => handler(e, index, key)}
            />
        )
    }else if(key === 'gallery') {
        return (
            <CardOrGalleryEllement
                type={'gallery'}
                index={index}
                pictureForLabel={{
                    label: 'image',
                    img: <FontAwesomeIcon icon={faImage}/>
                }}
                changedTrigger={changedTrigger}
                value={value}
                onChange={(e) => handler(e, index, key)}
            />
        )

    }else if(key === 'list') {
        return (
            <ListElement
                type={'list'}
                index={index}
                pictureForLabel={{
                    label: 'image',
                    img: <FontAwesomeIcon icon={faImage}/>
                }}
                changedTrigger={changedTrigger}
                value={value}
                onChange={(e) => handler(e, index, key)}
            />
        )
    }else if(key === 'form') {
        return (
            <FormElement
                type={'form'}
                index={index}
                // pictureForLabel={{
                //     label: 'image',
                //     img: <FontAwesomeIcon icon={faImage}/>
                // }}
                changedTrigger={changedTrigger}
                value={value}
                onChange={(e) => handler(e, index, key)}
            />
        )
    }else if(key === 'timer') {
        return (
            <TimerElement
                type={'timer'}
                index={index}
                // pictureForLabel={{
                //     label: 'image',
                //     img: <FontAwesomeIcon icon={faImage}/>
                // }}
                changedTrigger={changedTrigger}
                value={value}
                onChange={(e) => handler(e, index, key)}
            />
        )
    }else {
        return (
            <FancyFileInput
                type={'file'}
                index={index}
                pictureForLabel={{
                    label: 'file',
                    img: <FontAwesomeIcon icon={faPaperclip}/>
                }}
                value={value}
                onChange={(e) => handler(e, index, key)}
            />
        )
        // return <a href={staticMedia + value}>{staticMedia + value}</a>
    }
};

// export const fileDefinition = (key, value, handler, index, deleteHandler) => {
//     if(key === 'text') {
//         return (
//             <div>
//                 <textarea defaultValue={value} onBlur={(e) => handler(e, index, key)} />
//                 <h3 onClick={() => deleteHandler(index)}>delete</h3>
//             </div>
//         )
//     }else if(key === 'audio') {
//         return (
//             <audio controls>
//                 <source src={staticMedia + value} type="audio/ogg; codecs=vorbis" />
//                 <source src={staticMedia + value} type="audio/mpeg" />
//             </audio>
//         )
//     }else if(key === 'video') {
//         return (
//             <video controls="controls">
//                 <source src={staticMedia + value} type='video/ogg; codecs="theora, vorbis"' />
//                 <source src={staticMedia + value} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
//                 <source src={staticMedia + value} type='video/webm; codecs="vp8, vorbis"' />
//             </video>
//         )
//     }else if(key === 'photo') {
//         return (
//             <img src={staticMedia + value} alt={value} />
//         )
//     }else {
//         return <a href={staticMedia + value}>{staticMedia + value}</a>
//     }
// };
//
// export const emptyFile = (key, index, handler, deleteHandler) => {
//     if(key === 'text') {
//         return (
//             <div>
//                 <textarea defaultValue={''} onBlur={(e) => handler(e, index, key)}/>
//                 <h3 onClick={() => deleteHandler(index)}>delete</h3>
//             </div>
//         );
//     }else if(key === 'audio') {
//         return (
//             <FancyFileInput
//                 type={'file'}
//                 index={index}
//                 pictureForLabel={{
//                     label: 'audio',
//                     img: <FontAwesomeIcon icon={faVolumeDown}/>
//                 }}
//                 accept={'audio/*'}
//                 onChange={(e) => handler(e, index, key)}
//             />
//         )
//
//     }else if(key === 'video') {
//         return (
//             <FancyFileInput
//                 type={'file'}
//                 index={index}
//                 pictureForLabel={{
//                     label: 'video',
//                     img: <FontAwesomeIcon icon={faVideo}/>
//                 }}
//                 accept={'video/*'}
//                 onChange={(e) => handler(e, index, key)}
//             />
//         )
//
//     }else if(key === 'photo') {
//         return (
//             <FancyFileInput
//                 type={'file'}
//                 index={index}
//                 pictureForLabel={{
//                     label: 'image',
//                     img: <FontAwesomeIcon icon={faImage}/>
//                 }}
//                 accept={'image/*'}
//                 onChange={(e) => handler(e, index, key)}
//             />
//         )
//
//     }else {
//         return (
//             <FancyFileInput
//                 type={'file'}
//                 index={index}
//                 pictureForLabel={{
//                     label: 'file',
//                     img: <FontAwesomeIcon icon={faPaperclip}/>
//                 }}
//                 onChange={(e) => handler(e, index, key)}
//             />
//         )
//     }
// };