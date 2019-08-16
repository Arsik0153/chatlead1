import React from 'react';
import style from './botsElement.module.sass';
import trash from '../../images/trash.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createBot, deleteBot} from "../../actions/actionCreator";


const BotsElement = (props) => {
    const {name, id} = props;


    return (
        <div className={style.mainContainer}>
            <h1>Название: {name}</h1>
            <div className={style.controls}>
                <Link to={`/bots/${id}/scenario`} className={style.link}>Изменить</Link>
                <img src={trash} alt={'trash'} onClick={() => props.deleteBot({
                    manager_id: id
                })}/>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    deleteBot: (botData) => dispatch(deleteBot(botData))
});

export default connect(null, mapDispatchToProps)(BotsElement);