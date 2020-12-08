const API_URl = 'http://mederp.azurewebsites.net/';
const Storage_URL = 'http://mederp.azurewebsites.net/images/';

const Endpoints = {
    login: API_URl + 'api/Clients/Login',
    register: API_URl + 'api/Clients/Register',
    ArticlesAndNews: API_URl + 'api/Articles',
    Patient: API_URl + 'api/MobPatients/GetMobPatient',
    AllVisits:API_URl + 'api/MobVisits/GetMobPatientVisits',
    SingleVisit: API_URl + 'api/MobVisits/GetMobVisitById',
    History: API_URl + 'api/MobVisits/GetMobPatientVouchers',
    Medicine: API_URl + 'api/MobVisits/GetMobPatientMedicines',
    Branches: API_URl + 'api/MobLookups/GetMobAllBranches',
    Groups: API_URl + 'api/MobLookups/GetMobAllGroups',
    Services: API_URl + 'api/MobLookups/GetMobAllServicesByGroupId',
    Doctors: API_URl + 'api/MobLookups/GetMobAllDoctors',
    Booking: API_URl + 'api/MobReservations/AddMobReservation',
    Reservation: API_URl + 'api/MobReservations/GetPatientMobReservations',
    EditBooking: API_URl + 'api/MobReservations/OrdinaryPut'
};

export { API_URl, Storage_URL ,Endpoints };
