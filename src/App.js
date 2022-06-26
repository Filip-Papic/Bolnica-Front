import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// GENERAL
import DemoPage from "./pages/General/DemoPage/DemoPage";
import LoginPage from "./pages/General/LoginPage/LoginPage";
import ProfilePage from "./pages/General/ProfilePage/ProfilePage";
import ForgotPasswordPage from "./pages/General/ForgotPasswordPage/ForgotPasswordPage";

// ADMIN
import AdminHomepage from "./pages/Admin/AdminHomepage/AdminHomepage";
import EmployeePreview from "./pages/Admin/EmployeePreviewPage/EmployeePreviewPage";
import EditEmployeePage from "./pages/Admin/EditEmployeePage/EditEmployeePage";
import RegistrationPage from "./pages/Admin/RegistrationPage/RegistrationPage";

// DOCTOR
import DoctorHomepage from "./pages/Doctor/DoctorHomepage/DoctorHomepage";
import PatientPreview from "./pages/Doctor/PatientPreviewPage/PatientPreviewPage";
import EditPatientPage from "./pages/Doctor/EditPatientPage/EditPatientPage";
import CreateRefferalPage from "./pages/Doctor/CreateRefferalPage/CreateRefferalPage";
import PatientExamination from "./pages/Doctor/PatientExaminationPage/PatientExaminationPage";
import DoctorCalendarPage from "./pages/Doctor/DoctorCalendarPage/DoctorCalendarPage";
import PatientStationaryPage from "./pages/Doctor/PatientStationaryPage/PatientStationaryPage";

// NURSE
import NurseHomepage from "./pages/Nurse/NurseHomepage/NurseHomepage";
import PatientPreviewNurses from "./pages/Nurse/PatientPreviewPageNurses/PatientPreviewPageNurses";
import RegistrationPatientPage from "./pages/Nurse/RegistrationPatientPage/RegistrationPatientPage";
import ScheduleAppointmentPage from "./pages/Nurse/ScheduleAppointmentPage/ScheduleAppointmentPage";

// NURSE INFIRMARY
import NurseInfirmaryPatientAdmission from "./pages/Nurse/NurseInfirmaryPatientAdmission/NurseInfirmaryPatientAdmission";
import NurseInfirmaryPatientsOfTheDepartment from "./pages/Nurse/NurseInfirmaryPatientsOfTheDepartment/NurseInfirmaryPatientsOfTheDepartment";
import NurseInfirmaryPatientsOfTheDepartmentHistory from "./pages/Nurse/NurseInfirmaryPatientsOfTheDepartment/NurseInfirmaryPatientsOfTheDepartmentHistory";

// BIOCHEMIST
import BiochemistHomepage from "./pages/Biochemist/BiochemistHomepage/BiochemistHomepage";
import DetailedResultPage from "./pages/Biochemist/DetailedResultPage/DetailedResultPage";

//TECHNICIAN
import TechnicianHomepage from "./pages/Tehcnician/TechnicianHomepage/TechnicianHomepage";
import VisitsPage from "./pages/Tehcnician/VisitsPage/VisitsPage";
import AdmissionPage from "./pages/Tehcnician/AdmissionPage/AdmissionPage";
import IssuingResultsPage from "./pages/Tehcnician/IssuingResultsPage/IssuingResultsPage";
import IssuingResultsDetailedPage from "./pages/Tehcnician/IssuingResultsDetailedPage/IssuingResultsDetailedPage";

//RECEPCIONIST
import RecepcionistHomepage from "./pages/Recepcionist/RecepcionistHomepage/RecepcionistHomepage";
import RecepcionistAddPatientPage from "./pages/Recepcionist/RecepcionistAddPatientPage/RecepcionistAddPatientPage";
import RecepcionistScheduleAppPage from "./pages/Recepcionist/RecepcionistScheduleAppPage/RecepcionistScheduleAppPage";
import RecepcionistVisitsPage from "./pages/Recepcionist/RecepcionistVisitsPage/RecepcionistVisitsPage";
import RecepcionistRegistationVisitsPage from "./pages/Recepcionist/RecepcionistRegistationVisitsPage/RecepcionistRegistationVisitsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* DEMO */}
        <Route path="/demo-page" exact element={<DemoPage />} />
        {/* GENERAL */}
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/profile" exact element={<ProfilePage />} />
        <Route path="/forgot-password" exact element={<ForgotPasswordPage />} />

        {/* DOCTOR ROUTES */}
        <Route path="/" exact element={<DoctorHomepage />} />
        <Route path="/examination/:id" exact element={<PatientExamination />} />
        <Route path="/patient-preview" exact element={<PatientPreview />} />
        <Route path="/create-refferal" exact element={<CreateRefferalPage />} />
        <Route path="/appointments" exact element={<DoctorCalendarPage />} />
        <Route path="/stationary" exact element={<PatientStationaryPage />} />

        {/* NURSE ROUTES */}
        <Route path="/nurse" exact element={<NurseHomepage />} />
        <Route
          path="/nurse/patient-preview"
          exact
          element={<PatientPreviewNurses />}
        />
        <Route
          path="/nurse/schedule-appointment"
          exact
          element={<ScheduleAppointmentPage />}
        />
        <Route
          path="/nurse/register-patient"
          exact
          element={<RegistrationPatientPage />}
        />
        <Route
          path="/nurse/edit-patient/:lbp"
          exact
          element={<EditPatientPage />}
        />
        {/* NURSE INFIRMARY ROUTES */}
        <Route
          path="/nurse/infirmary/admission-of-patient"
          exact
          element={<NurseInfirmaryPatientAdmission />}
        />
        <Route
          path="/nurse/infirmary/patients-department"
          exact
          element={<NurseInfirmaryPatientsOfTheDepartment />}
        />
        <Route
          path="/nurse/infirmary/patients-department/history/:lbp"
          exact
          element={<NurseInfirmaryPatientsOfTheDepartmentHistory />}
        />

        {/* ADMIN ROUTES */}
        <Route path="/admin" exact element={<AdminHomepage />} />
        <Route
          path="/admin/employee-preview"
          exact
          element={<EmployeePreview />}
        />
        <Route
          path="/admin/register-employee"
          exact
          element={<RegistrationPage />}
        />
        <Route
          path="/admin/edit-employee/:lbz"
          exact
          element={<EditEmployeePage />}
        />
        <Route path="/edit-patient/:lbp" exact element={<EditPatientPage />} />
        {/* BIOCHEMIST ROUTES */}
        <Route path="/biochemist" exact element={<BiochemistHomepage />} />
        <Route
          path="/biochemist/detailed-result/:labReportId"
          exact
          element={<DetailedResultPage />}
        />
        {/* TECHNICIAN ROUTES */}
        <Route path="/technician" exact element={<TechnicianHomepage />} />
        <Route
          path="/technician/patient-admission"
          exact
          element={<AdmissionPage />}
        />
        <Route path="/technician/visits" exact element={<VisitsPage />} />
        <Route
          path="/technician/issuing-results"
          exact
          element={<IssuingResultsPage />}
        />
        <Route
          path="/technician/issuing-results/:labReportId"
          exact
          element={<IssuingResultsDetailedPage />}
        />
        {/* RECEPCIONIST ROUTES */}
        <Route path="/recepcionist" exact element={<RecepcionistHomepage />} />
        <Route
          path="/recepcionist/add-patient"
          exact
          element={<RecepcionistAddPatientPage />}
        />
        <Route
          path="/recepcionist/add-appointment"
          exact
          element={<RecepcionistScheduleAppPage />}
        />
        <Route
          path="/recepcionist/visits"
          exact
          element={<RecepcionistVisitsPage />}
        />
        <Route
          path="/recepcionist/registation-visits/:lbp"
          exact
          element={<RecepcionistRegistationVisitsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
