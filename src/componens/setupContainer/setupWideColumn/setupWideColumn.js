import React, {useEffect} from 'react';
import style from './setupWideColumn.module.sass';
import {connect} from 'react-redux';
// import { stringLiteral } from '@babel/types';
import {
    getManager,
    editManager
} from '../../../actions/actionCreator';

const SetupWideColumn = (props) => {
    const botId = props.botSetupData.id;


    return(
        <div className={style.wideСolumn}>
            <article>
                <header>
                    <h1 className={style.mainPageTitle}>Реакции бота
                    </h1>
                    
                    <div className={style.table +" "+style.table__settings}>
                        <div className={style.table_row+" "+style.jsSelected}>
                            <div>
                                <div className={style.statusIcon}></div>
                                <img src="/svg/db/settings/301-chat.svg" alt="" className={style.table_image}/>
                                <div className={style.label}>Приветственные сообщения</div>
                                <p>Реакция на первое сообщение пользователя боту, срабатывает только 1 раз</p>
                            </div>
                        </div>
                        <div className={style.table_row} dataaction="keywords" datatype="1" dataid="2">
                            <div>
                                <div className={style.statusIcon}></div>
                                <img src="/svg/db/settings/301-team-2.svg" alt="" className={style.table_image}/>
                                <div className={style.label}>Реакция на подписку</div>
                                <p>Сработает, только если пользователь писал в сообщество</p>
                            </div>
                        </div>
                        <div className={style.table_row} dataaction="keywords" datatype="1" dataid="3">
                            <div>
                                <div className={style.statusIcon}></div>
                                <img src="/svg/db/settings/301-close.svg" alt="" className={style.table_image}/>
                                <div className={style.label}>Реакция на отписку</div>
                                <p>Сработает, только если пользователь писал в сообщество</p>
                            </div>
                        </div>
                        <div className={style.table_row} dataaction="keywords" datatype="1" dataid="4">
                            <div>
                                <div className={style.statusIcon}></div>
                                <img src="/svg/db/settings/301-idea-1.svg" alt="" className={style.table_image}/>
                                <div className={style.label}>Реакция на неизвестную команду</div>
                                <p>Ответ на любое сообщение не по сценарию</p>
                            </div>
                        </div>
                        
                    </div>

                </header>
                <section>
                    <div className={style.notifyme}>
                        <form action="">
                            <h3>Оповещение</h3>
                            <div className={style.switcher}>
                                <label className={style.switch}>
                                    <input type="checkbox"/>
                                    <span className={style.slider+" "+style.round}></span>
                                </label>
                                <p>Получать уведомления о заявках</p>
                            </div>
                            <div className={style.switcher+" "}>
                                <input type="text" name="mail" placeholder="example@mail.com"/>
                                <span> | </span>
                                <input type="text" name="phone" placeholder="+7 ___ ___ __ __"/>
                            </div>
                            <div className={style.switcher+" underinput "}>
                                <span>Добавьте емейл, на который отправлять уведомления и нажмите Enter </span>
                                <span>Или Напишите WhatsApp номер</span>
                            </div>
                        </form>
                    </div>
                </section>
                <section>
                    <div className={style.integration}>
                        <h1>Интеграция</h1>
                        <ul className={style.crm}>
                            <li className="amocrm">
                                <a href="javascript:void(0)" data-target="menu_amo">
                                    <img src="/img/amocrm-logo-rect.png" alt=""/>
                                </a>
                            </li>
                            <li className="bitrix">
                                <a href="javascript:void(0)" data-target="menu_bitrix">
                                    <img src="/img/bitrix-24-logo.png" alt=""/>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div id="amocrm-menu">
                        <div className={style.display} id="menu_amo">
                            <form action="">
                                <div className="input-gr">
                                    <label for="domain">Домен в AmoCRM*</label>
                                    <input type="text" name="domain" placeholder="mycompany.amocrm.ru"/>
                                    <small>Адрес (домен) Вашей CRM, обычно это ??????.amocrm.ru<br/>Вводите его целиком вместе с .bitrix24.ru</small>
                                </div>
                                
                                <div className="input-gr">
                                    <label for="login">Логин*</label>
                                    <input type="text" name="login" placeholder="myname@mycompany.ru"/>
                                    <small>Код активации веб-хука, например: 82te1pjdphsa9u19.</small>
                                </div>
                                <div className="input-gr">
                                    <label for="api">Ключ API*</label>
                                    <input type="text" name="api" placeholder="a751f80701dae35cf334d648dc7352d7"/>
                                    <small>Ключ для доступа к API. Смотрите его в личном кабинете AmoCRM, в разделе Настройки - API - Ваш API ключ.</small>
                                </div>
                                <span><button class="default-btn default-btn--primary" onClick={(e) => {
                            e.preventDefault();
                            props.editManager({
                                idBot: botId,
                                amocrm_domain: document.querySelector('#amocrm-menu input[name=domain]').value,
                                optional_params: ["amocrm_domain"]
                            });
                                }
                            }>Сохранить</button></span>
                            </form>
                        </div>
                    <div id="bitrix-menu">
                        <div className={style.display} id="menu_bitrix">
                        <form action="">
                            <div className="input-gr">
                                <label for="domain">Домен в Bitrix24*</label>
                                <input type="text" name="domain" placeholder="mycompany.bitrix24.ru"/>
                                <small>Адрес (домен) Вашей CRM, обычно это ??????.bitrix24.ru<br/>Вводите его целиком вместе с .bitrix24.ru</small>
                            </div>
                            <div className="input-gr">
                                <label>Способ подключения</label>
                                <div className="checkboxs">
                                    <input type="checkbox" name="checkbox" checked=""/>
                                    <label for="checkbox">Веб-хук (рекомендуется) Современный способ, максимум возможностей (передача UTM-меток в нативные поля).</label>
                                </div>
                                    <div className="checkboxs">
                                    <input type="checkbox" name="checkbox"/>
                                    <label for="checkbox">Старое API Передача UTM-меток в нативные поля не поддерживается.</label>
                                </div>
                            </div>
                            <div className="input-gr">
                                <label for="webhook">Код веб-хука*</label>
                                <input type="text" name="webhook" placeholder="xxxxxxxxxxxxxxxx"/>
                                <small>Код активации веб-хука, например: 82te1pjdphsa9u19.</small>
                            </div>
                            <div className="input-gr">
                                <label for="userId">Номер пользователя*</label>
                                <input type="text" name="usedId" placeholder="1"/>
                                <small>Номер пользователя, которому принадлежит веб-хук (по-умолчанию: 1).</small>
                            </div>
                            <span><button class="default-btn default-btn--primary" onClick={(e) => {
                            e.preventDefault();
                            props.editManager({
                                idBot: botId,
                                bitrix_domain: document.querySelector('#bitrix-menu input[name=domain]').value,
                                optional_params: ["bitrix_domain"]
                            });
                                }
                            }>Сохранить</button></span>
                        </form>
                    </div>

                        </div>
                    </div>
                </section>
            </article>
        </div>
    )
}

const mapStateToProps = state => {
    const {botSetupData, isFetching, error} = state.botSetupReducers;

    return {
        botSetupData, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    getManager: (botId) => dispatch(getManager(botId)),
    editManager: (setupData) => dispatch(editManager(setupData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupWideColumn);
