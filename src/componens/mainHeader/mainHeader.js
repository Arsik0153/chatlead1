import React, {useState, useEffect} from 'react';
import style from './mainHeader.module.sass';
import Logo from '../../images/logo_panel.png';
import {Link} from 'react-router-dom';
import UserIcon from '../../images/user.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import ClickOutSide from '../hoc/clickOutside';
import chatLeadLogo from '../../images/chatlead.png';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getAllBotsForUser} from "../../actions/actionCreator";

const MainHeader = (props) => {
    const [isOpenMenu, setStatusToOpenMenu] = useState(false);
    const {isMainHeader} = props;

    useEffect(() => {
        props.getAllBots(props.match.params.botId);
    }, []);

    console.log(props.changedBotData);

    return (
        <header className={style.mainContainer}>
            {
                isMainHeader ? (
                    <Link to={'/bots'}><img src={Logo} alt={'logo'} /></Link>
                ) : (
                    <Link to={'/bots'}>
                        <img src={chatLeadLogo} alt={'logo'} style={{width: '35px', height: '35px'}}/>
                    </Link>
                )
            }
            {
                !isMainHeader && (
                    <div className={style.botSelector}>
                        <div className={style.nameBot}>{props.changedBotData.name}</div>
                    </div>
                )
            }
            <ClickOutSide onClickedOutside={() => setStatusToOpenMenu(false)}>
                <div className={style.menuContainer} onClick={() => setStatusToOpenMenu(true)}>
                    <img src={UserIcon} alt={'userIcon'} />
                    <FontAwesomeIcon icon={isOpenMenu ? faAngleUp : faAngleDown}/>
                    {
                        isOpenMenu && (
                            <ul className={style.contextMenuContainer}>
                                <li>Аккаунт</li>
                                <li>Тарифы</li>
                                <li>Партнерам</li>
                                <li>Панель</li>
                                <li>Выйти</li>
                            </ul>
                        )
                    }
                </div>
            </ClickOutSide>
        </header>
    )
};


const mapStateToProps = state => {
    const {botsData, changedBotData, isFetching, error} = state.botsReducers;

    return {
        botsData, isFetching, error, changedBotData
    }
};

const mapDispatchToProps = dispatch => ({
    getAllBots: (botId) => dispatch(getAllBotsForUser(botId))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainHeader));