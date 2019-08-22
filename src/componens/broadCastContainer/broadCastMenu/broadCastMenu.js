import React, {useState} from 'react';
import style from './broadCastMenu.module.sass';


const BroadCastMenu = (props) => {
    const [isOpenTestTab, openTestTab] = useState(false);

    const sendBroadCastTab = () => (
        <div className={style.contentContainer}>
            <div className={style.userListBroadcast}>
                <div className={style.userListElement}>
                    <h2>Выберете список получателей:</h2>
                    <label htmlFor={'allUsers'}>
                        <input type={'checkbox'} id={'allUsers'}/>
                        Все пользователи
                    </label>
                </div>
            </div>
            <div className={style.options}>
               <div>
                   <label htmlFor={'testBroadConfirm'}>
                       <input type={'checkbox'} id={'testBroadConfirm'}/>
                       тестовая рассылка проверена
                   </label>
                   <label htmlFor={'broadCastEnd'}>
                       <input type={'checkbox'} id={'broadCastEnd'}/>
                       уведомить об окончании рассылки
                   </label>
               </div>
            </div>
            <div className={style.buttonsContainer}>
                <div className={style.submitButton}>
                    Начать рассылку
                </div>
                <p>или</p>
                <div className={style.putOffButton}>
                    Отложить рассылку
                </div>
            </div>
        </div>
    );

    const testTab = () => (
        <div className={style.contentContainer}>
            <div className={style.testBroadCastContainer}>
                <h2>Отправить тестовую рассылку пользователям:</h2>
                <p>Ссылка на страницу FB</p>
            </div>
           <div className={style.buttonsContainerTest}>
               <div className={style.submitButton}>Тестрировать</div>
           </div>
        </div>
    );


    return (
        <div className={style.mainContainer}>
            <ul className={style.navigation}>
                <li
                    className={isOpenTestTab ? style.navigationElement : style.activeNavigationElement}
                    onClick={() => openTestTab(false)}
                >
                    Отправка рассылки
                </li>
                <li
                    className={isOpenTestTab ? style.activeNavigationElement : style.navigationElement}
                    onClick={() => openTestTab(true)}
                >
                    Тест рассылки
                </li>
            </ul>
            {
                isOpenTestTab ? testTab() : sendBroadCastTab()
            }
        </div>
    )
};

export default BroadCastMenu;
