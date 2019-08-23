import React, {useState} from 'react';
import style from './mainHeader.module.sass';
import Logo from '../../images/logo_panel.png';
import {Link} from 'react-router-dom';
import UserIcon from '../../images/user.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import ClickOutSide from '../hoc/clickOutside';
import chatLeadLogo from '../../images/chatlead.png';

const MainHeader = (props) => {
    const [isOpenMenu, setStatusToOpenMenu] = useState(false);
    const {isMainHeader} = props;

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


export default MainHeader;