import React from 'react';
import style from './mainHeader.module.sass';
import Logo from '../../images/chatlead.png';
import {Link} from 'react-router-dom';
import UserIcon from '../../images/user.png';

const MainHeader = (props) => {
    // TODO styles
    return (
        <header id="header" className="add-status">
            <div className="header__container">
                <div className="header__bot-selector">
                    <div className="header__logo panel__logo">
                        {/* <a href="dashboard_1.html" className="inner-link"></a> */}
                    </div>
                </div>
                <div className="mobile-menu-trigger" id="mobile-menu-trigger"></div>
                <nav className="header__mobile-nav" data-tooltip=""></nav>
                <div className="header__profile-wrap">
            
                    <div className="header-profile" id="header-active-profile-nav">
                        <div className="header-profile__item">
                            <div className="header-profile__item__trigger" data-tooltip=""></div>
                            <img src={UserIcon} alt="Аватар" className="avatar"/>
                            <div className="header__ui-menu" data-tooltip-ignore="">
                                <ul>
                                    <li className="communities">
                                        Аккаунт
                                    </li>
                                    <li className="accounts">
                                        Тарифы
                                    </li>
                                    <li className="communities">
                                        Партнерам
                                    </li>
                                    <li className="communities">
                                        Панель
                                    </li>
                                    <li id="user-logout" className="border-top logout" data-app-hide="">
                                        Выйти
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};


export default MainHeader;