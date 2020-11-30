const API_URl = 'http://mederp.azurewebsites.net/';
const Storage_URL = 'http://mederp.azurewebsites.net/images/';

const Endpoints = {
    login: API_URl + 'api/Clients/Login',
    register: API_URl + 'api/Clients/Register',
    ArticlesAndNews: API_URl + 'api/Articles',
    Patient: API_URl + 'api/MobPatients/GetMobPatient',
    AllVisits:API_URl + 'api/MobVisits/GetMobPatientVisits',
    SingleVisit: API_URl + 'api/MobVisits/GetMobVisitById',
    History: API_URl + 'api/MobVisits/GetMobPatientVouchers'
};

export { API_URl, Storage_URL ,Endpoints };
