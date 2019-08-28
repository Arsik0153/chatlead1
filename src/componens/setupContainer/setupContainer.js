import React, {useEffect} from 'react';
import style from './setupContainer.module.sass';
import {connect} from 'react-redux';
import SetupSidebar from './setupSidebar/setupSidebar';
import SetupWideColumn from './setupWideColumn/setupWideColumn';

import {withRouter} from "react-router-dom";



const SetupContainer = (props) => {

    // const {amocrm_domain, bitrix_key, bitrix_domain} = props;

    // useEffect(() => {
    //     const script = document.createElement("script");
    //     script.id = "crm-load-script";
    //     script.innerHTML = "botSetupInit();";

    //     if (document.getElementById('crm-load-script') === null){
    //         document.body.appendChild(script);
    //     } else {
    //         document.getElementById('crm-load-script').remove();
    //         document.body.appendChild(script);
    //     }
    // });

    return(
        <section className={style.settingsBodyColumn+ " "+style.settingsBodyColumn__page} style={{marginTop: "10px;"}}>
                <div className={style.container+" "+style.columnsContainer}>
                    <div className={style.menuTriggerBtn} id="faq-menu-trigger"> </div>
                    <SetupSidebar />
                    <SetupWideColumn />
                </div>
            </section>
    )
};

// const mapStateToProps = state => {
//
//     return
// };
//
// const mapDispatchToProps = dispatch => ({
//
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetupContainer));
export default withRouter(SetupContainer);