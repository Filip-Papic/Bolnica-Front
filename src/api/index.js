import axios from "axios";

const API = axios.create({ baseURL: "http://bolnica.k8s.elab.rs:32264" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    req.headers.common["Content-Type"] = "application/json;charset=UTF-8";
    req["headers"]["common"]["Accept"] = "application/json";
    // req["headers"]["common"]["Content-Type"] = "text/html";
  }

  return req;
});

// DEMO ROUTES

export const fetchDemos = () => API.get(`/demos`);
export const fetchDemo = (id) => API.get(`/demos/${id}`);
export const createDemo = (data) => API.post("/demos", data);
export const updateDemo = (id, data) => API.put(`/demos/${id}`, data);
export const deleteDemo = (id) => API.delete(`/demos/${id}`);

// GENERAL

export const login = (formData) =>
  API.post("/bolnica-user/api/login", formData);
export const resetPassword = (email) =>
  API.post("/bolnica-user/api/forgot-password", email);

// APPOINTMENTS

export const fetchAppointments = (data) =>
  API.post(`/bolnica-management-service/api/list-appointments-by-lbz`, data);
export const searchLabReports = (data) =>
  API.post(
    `/bolnica-laboratory-service/api/fetch-laboratory-work-orders?page=1&size=5`,
    data
  );
export const createAppointment = (data) =>
  API.post("/bolnica-management-service/api/set-appointment", data);
export const deleteAppointment = (id) => API.delete(`/demos/${id}`);
export const updateAppointment = (data) =>
  API.put(`/bolnica-management-service/api/update-appointment-status`, data);

// REFERRALS

export const fetchReferrals = (data) =>
  API.post(`/bolnica-laboratory-service/api/uput-history?page=1&size=5`, data);
export const fetchUnprocessedReferrals = (data) =>
  API.get(
    `/bolnica-laboratory-service/api/unprocessed-uputi?lbp=${data}`,
    data
  );
export const createReferral = (data) =>
  API.post("/bolnica-laboratory-service/api/create-uput", data);
export const deleteReferral = (id) => API.delete(`/demos/${id}`);
export const updateReferral = (data) =>
  API.put(`/bolnica-management-service/api/update-referrals-status`, data);
export const searchReferrals = (lbp, type, status) =>
  API.post("/bolnica-management-service/api/", lbp, type, status);

// LAB REPORTS

export const fetchLabReports = (data) =>
  API.post(
    `/bolnica-laboratory-service/api/laboratory-work-order-history?page=1&size=5`,
    data
  );
export const fetchLabReport = (data) =>
  API.post(`/bolnica-management-service/api/get-lab-report`, data);
export const createLabReport = (data) =>
  API.post(
    `/bolnica-laboratory-service/api/create-laboratory-work-order?uputId=${data}`
  );
export const deleteLabReport = (id) => API.delete(`/demos/${id}`);
export const updateLabReport = (data) =>
  API.put(`/bolnica-management-service/api/update-lab-report-status`, data);

// EXAMINATIONS

export const fetchExaminations = (lbp) =>
  API.post(
    `/bolnica-management-service/api/fetch-examinations/${lbp}?page=1&size=5`,
    {
      from: null,
      to: null,
      on: null,
    }
  );
export const createRecord = (formData) =>
  API.post(
    `/bolnica-management-service/api/create-examination-report`,
    formData
  );

// RECORDS

export const fetchRecord = (lbp) =>
  API.get(`/bolnica-management-service/api/fetch-zdravstveni-karton/${lbp}`);

// EMPLOYEES
export const fetchEmployees = () =>
  API.post(`/bolnica-user/api/list-employees?page=1&size=5`, {
    department: 1,
  });
export const fetchEmployeesDep = (id) =>
  API.post(`/bolnica-user/api/list-employees?page=1&size=5`, {
    department: id,
  });
export const fetchEmployee = (lbz) =>
  API.get(`/bolnica-user/api/get-employee/${lbz}`);
export const createEmployee = (formData) =>
  API.post(`/bolnica-user/api/create-employee`, formData);
export const updateEmployee = (formData) =>
  API.put(`/bolnica-user/api/update-employee`, formData);
export const deleteEmployee = (lbz) =>
  API.delete(`/bolnica-user/api/remove-employee/${lbz}`);
export const searchEmployees = (searchValues) =>
  API.post("/employees", searchValues);

// DEPARTMENTS

export const fetchDepartments = () =>
  API.get(`/bolnica-management-service/api/fetch-departments`);

// PATIENTS

export const fetchPatients = () =>
  API.post(`/bolnica-management-service/api/filter-patients`, {});
export const fetchPatientsVisits = (formData) =>
  API.post(`/bolnica-management-service/api/filter-patients`, {
    formData,
  });
export const createPatientVisit = (lbp, formData) =>
  API.post(`/bolnica-management-service/api/filter-patients`, {
    lbp,
    formData,
  });
export const fetchPatient = (lbp) =>
  API.get(`/bolnica-management-service/api/fetch-patient/${lbp}`);
export const createPatient = (formData) =>
  API.post(`/bolnica-management-service/api/create-patient`, formData);
export const updatePatient = (formData, lbp) =>
  API.put(`/bolnica-management-service/api/update-patient/${lbp}`, formData);
export const deletePatient = (lbp) =>
  API.delete(`/bolnica-management-service/api/remove-patient/${lbp}`);
export const searchPatients = (searchValues) =>
  API.post("/patients", searchValues);

// DISEASES
export const fetchDiseases = (lbp, data) =>
  API.post(
    `/bolnica-management-service/api/fetch-istorija-bolesti/${lbp}?page=1&size=5`,
    data
  );

//LAB
export const fetchNumberOfLabAppointments = (dateNum) =>
  API.get(
    `/bolnica-management-service/api/fetch-number-of-appointments/${dateNum}`
  );

//LAB VISITS
export const searchLabVisits = (data) =>
  API.post("/bolnica-laboratory-service/api/get-lab-examinations", data);
export const updateLabVisits = (data) =>
  API.put("/bolnica-laboratory-service/api/set-lab-examination-status", data);
export const createVisit = (formData) =>
  API.post(
    "/bolnica-laboratory-service/api/schedule-lab-examination",
    formData
  );

//PATIENTS ADMISSIONS
export const searchPatientsAdmissions = (lbp, dateValue) =>
  API.post("/patientsAdmissions", lbp, dateValue);
export const updatePatientAdmission = (id, status) =>
  API.put("/patientsAdmissions", id, status);
export const createPatientAdmission = (id, status) =>
  API.put("/patientsAdmissions", id, status);

//HOSPITAL ROOMS
export const searchHospitalRooms = (pbo) => API.post("/hospitalRooms", pbo);

//PATIENT HISTORY
export const fetchPatientsHistory = (dateFrom, dateTo, lbp) =>
  API.get(
    `/nurse/infirmary/patients-department/history/${(dateFrom, dateTo, lbp)}`
  );

export const createPatientHistory = (lbp, formData) =>
  API.post(`/nurse/infirmary/patients-department/history`, lbp, formData);

export const fetchPatientsVisitsHistory = (lbp) =>
  API.get(`/nurse/infirmary/patients-department/history/${lbp}`);

export const createPatientVisits = (lbp, formData) =>
  API.post(`/nurse/infirmary/patients-department/history`, lbp, formData);
