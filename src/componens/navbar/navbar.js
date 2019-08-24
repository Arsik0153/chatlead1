import React from 'react';
import style from './navbar.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {NavLink} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import {
    faCog,
    faCommentDots,
    faFilter,
    faPaperPlane,
    faComments,
    faChartLine,
    faChartBar
} from '@fortawesome/free-solid-svg-icons'

const Navbar = (props) => {
    const {botId} = props.match.params;

    return (
        <div className={style.mainContainer}>
            <ul className={style.menuContainer}>
                <li>
                    <FontAwesomeIcon icon={faCog}/>
                    <NavLink
                        to={`/bots/${botId}/setup`}
                        className={style.link}
                        activeClassName={style.activeLink}
                    >
                        Настройки
                    </NavLink>
                </li>
                <li>
                    <FontAwesomeIcon icon={faCommentDots}/>
                    <NavLink
                        to={`/bots/${botId}/scenario`}
                         className={style.link}
                         activeClassName={style.activeLink}
                    >
                        Cценарий
                    </NavLink>
                </li>
                <li>
                    <FontAwesomeIcon icon={faFilter}/>
                    <NavLink
                        to={`/bots/${botId}/autoride`}
                        className={style.link}
                        activeClassName={style.activeLink}
                    >
                        Автоворонка
                    </NavLink>
                </li>
                <li>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <NavLink
                        to={`/bots/${botId}/broadcast`}
                        className={style.link}
                        activeClassName={style.activeLink}
                    >
                        Рассылка
                    </NavLink>
                </li>
                <li>
                    <FontAwesomeIcon icon={faComments} />
                    <NavLink
                        to={`/bots/${botId}/dialog`}
                        className={style.link}
                        activeClassName={style.activeLink}
                    >
                        Диалог
                    </NavLink>
                </li>
                <li>
                    <FontAwesomeIcon icon={faChartLine}/>
                    <NavLink
                        to={`/bots/${botId}/growth`}
                        className={style.link}
                        activeClassName={style.activeLink}
                    >
                        Инструмент роста
                    </NavLink>
                </li>
                <li>
                    <FontAwesomeIcon icon={faChartBar} />
                    <NavLink
                        to={`/bots/${botId}/statistics`}
                        className={style.link}
                        activeClassName={style.activeLink}
                    >
                        Статистика
                    </NavLink>
                </li>

            </ul>
        </div>
    )
};

export default withRouter(Navbar);
