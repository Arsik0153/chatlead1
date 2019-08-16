import axios from 'axios';
import { restURL } from '../baseURL';


export const signUp = (signUpData) => (
    axios.post(`${restURL}/CreateUser/`, signUpData)
);

export const auth = (authData) => (
    axios.post(`${restURL}/GetUserToken/`, authData)
);

export const createBot = (createBotData) => (
  axios.post(`${restURL}/CreateManager/`, createBotData)
);

export const deleteBot = (deleteBotData) => (
    axios.post(`${restURL}/DeleteManager/`, deleteBotData)
);

export const getAllBotsForUser = (userData) => (
    axios.post(`${restURL}/GetUserManagers/`, userData)
);


export const getScenariesForManager = (botData) => (
    axios.post(`${restURL}/GetScenarios/`, botData)
);

export const addNewScenario = (botData) => (
  axios.post(`${restURL}/CreateScenario/`, botData)
);

export const deleteScenario = (scenarioData) => (
  axios.post(`${restURL}/DeleteScenario/`, scenarioData)
);

export const addNewTrigger = (triggerData) => (
  axios.post(`${restURL}/CreateTrigger/`, triggerData)
);

export const updateTrigger = (triggerData) => (
  axios.post(`${restURL}/EditTrigger/`, triggerData)
);

export const uploadMedia = (mediaData) => (
  axios.post(`${restURL}/UploadFile/`, mediaData)
);