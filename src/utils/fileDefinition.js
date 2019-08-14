import React from 'react';
import {staticMedia} from "../api/baseURL";

export const fileDefinition = (key, value, handler, index, deleteHandler) => {
    if(key === 'text') {
        return (
            <div>
                <textarea defaultValue={value} onBlur={(e) => handler(e, index, key)} />
                <h3 onClick={() => deleteHandler(index)}>delete</h3>
            </div>
        )
    }else if(key === 'audio') {
        return (
            <audio controls>
                <source src={staticMedia + value} type="audio/ogg; codecs=vorbis" />
                <source src={staticMedia + value} type="audio/mpeg" />
            </audio>
        )
    }else if(key === 'video') {
        return (
            <video controls="controls">
                <source src={staticMedia + value} type='video/ogg; codecs="theora, vorbis"' />
                <source src={staticMedia + value} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                <source src={staticMedia + value} type='video/webm; codecs="vp8, vorbis"' />
            </video>
        )
    }else if(key === 'photo') {
        return (
            <img src={staticMedia + value} alt={value} />
        )
    }else {
        return <a href={staticMedia + value}>{staticMedia + value}</a>
    }
};

export const emptyFile = (key, index, handler, deleteHandler) => {
    if(key === 'text') {
        return (
            <div>
                <textarea defaultValue={''} onBlur={(e) => handler(e, index, key)}/>
                <h3 onClick={() => deleteHandler(index)}>delete</h3>
            </div>
        );
    }else if(key === 'audio') {
        return <input type={'file'} accept={'audio/*'} onChange={(e) => handler(e, index, key)}/>

    }else if(key === 'video') {
        return <input type={'file'} accept={'video/*'} onChange={(e) => handler(e, index, key)}/>

    }else if(key === 'photo') {
        return <input type={'file'} accept={'image/*'} onChange={(e) => handler(e, index, key)}/>

    }else {
        return <input type={'file'} onChange={(e) => handler(e, index, key)}/>
    }
};