import ACTION from './actionTypes';


export const signUp = (signUpData, history) => ({
    type: ACTION.SIGN_UP_ACTION,
    signUpData,
    history
});

export const auth = (authData, history) => ({
    type: ACTION.AUTH_ACTION,
    authData,
    history
});

export const createBot = (createBotData) => ({
   type: ACTION.CREATE_BOT_ACTION,
   createBotData
});

export const getAllBotsForUser = () => ({
   type: ACTION.GET_ALL_BOTS_ACTION
});

export const getAllScenariesForBot = (idBot) => ({
   type: ACTION.GET_ALL_SCENARIES,
    idBot
});

export const addNewScenario = (botId) => ({
   type: ACTION.ADD_NEW_SCENARIO,
   botId
});

export const addNewTrigger = (triggerData) => ({
   type: ACTION.ADD_NEW_TRIGGER,
   triggerData
});