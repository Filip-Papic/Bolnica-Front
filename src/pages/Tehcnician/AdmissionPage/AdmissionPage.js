import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import "./styles.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReferrals,
  getUnprocessedReferrals,
} from "../../../redux/actions/referrals";
import { createLabReport } from "../../../redux/actions/labReports";
import {
  searchLabVisits,
  updateLabVisits,
} from "../../../redux/actions/visits";
import Table from "../../../components/Table/Table";
import { getTableHeaders } from "../../../commons/tableHeaders";
import CustomModal from "../../../components/CustomModal/CustomModal";
import ActionConfirmationModal from "../../../components/ActionConfirmationModal/ActionConfirmationModal";
import { useEffect } from "react";
import { getPatients } from "../../../redux/actions/patients";
import { getEmployees } from "../../../redux/actions/employee";

const initialStateForm = {
  lbp: "",
};
const initialStateFormLbp = {
  lbpForm: "",
};
const AdmissionPage = () => {
  const handleRowClick = (entry) => {};
  let tab;
  let labRep;
  let dateValue = new Date();

  const referrals = useSelector((state) => state.referrals);
  const employees = useSelector((state) => state.employees);
  const patients = useSelector((state) => state.patients);

  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialStateForm);
  const [formLbp, setFormLbp] = useState(initialStateFormLbp);
  const [value, setValue] = useState();
  const [valueLbp, setValueLbp] = useState();
  const [referralTableContent, setReferralTableContent] = useState([]);

  const [isClicked1, setClicked1] = useState(true);
  const [isClicked2, setClicked2] = useState(false);

  useEffect(() => {
    // dispatch(searchLabVisits(dateValue));
    dispatch(getPatients());
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    setReferralTableContent(
      referrals.map((referral) => {
        const employee = employees.find(
          (employee) => employee.lbz === referral.lbz
        );
        return {
          ...referral,
          ...employee,
        };
      })
    );
  }, [referrals]);

  const visits = useSelector((state) => state.visits);
  console.log(visits);
  console.log(employees);
  console.log(referrals);
  console.log(referralTableContent);

  const toggleClass1 = () => {
    if (!isClicked1) {
      setClicked2(!isClicked2);
      setClicked1(!isClicked1);
    }
    setValueLbp("");
  };
  const toggleClass2 = () => {
    if (!isClicked2) {
      setClicked2(!isClicked2);
      setClicked1(!isClicked1);
    }
  };
  const handleClick = (entry) => {
    console.log(entry);
    dispatch(createLabReport(entry[0][1]));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...form });
    dispatch(getReferrals({ ...form }));
  };
  const handleSubmitValue = (e) => {
    e.preventDefault();
    dispatch(getUnprocessedReferrals(value));
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setDisable(e.target.value === "");
  };
  const handleChangeValue = (e) => {
    setValue(e.target.value);
    setDisable(e.target.value === "");
    // dispatch(getUnprocessedReferrals(e.target.value));
  };
  const handlePatientChange = (event) => {
    setForm({ ...form, lbp: event.target.value });
    console.log(event.target.value);
    // dispatch(getUnprocessedReferrals(event.target.value));
    dispatch(searchLabVisits({ date: dateValue, lbp: event.target.value }));
  };
  const handleChangeLbp = (e) => {
    console.log(formLbp);
    setFormLbp({ ...formLbp, [e.target.name]: e.target.value });
    setDisable(e.target.value === "");
    dispatch(searchLabVisits({ ...formLbp }, dateValue));
  };
  const handlecreateLabReport = (key, entry) => {
    console.log(entry[0][1]);
    dispatch(createLabReport(entry[0][1]));
  };
  const handleCancelVisit = (key, entry) => {
    dispatch(updateLabVisits(entry[0][1], "Otkazano"));
  };

  const handleCreateLabReportTab1 = (entry) => {
    console.log(entry);
    dispatch(updateLabVisits({ id: entry[0][1], status: "ZAVRSENO" }));
    setClicked2(true);
    setClicked1(false);
    setDisable(false);
    setValue(entry[2][1]);
  };

  const demoUnrealizedLabReferrals = [
    {
      id: 1,
      ime: "Marko",
      prezime: "Markovic",
      datumPregleda: new Date("December 30, 2018 17:30:00").getTime(),
      odeljenje: "XX",
      spisakAnaliza: "spisak",
      komentar: "komentar",
      kreiraj: "a",
      /*       status: "obradjeno",
       */
    },
    {
      id: 2,
      ime: "Petar",
      prezime: "Markovic",
      datumPregleda: new Date("December 30, 2018 17:30:00").getTime(),
      odeljenje: "YY",
      spisakAnaliza: "spisakAnaliza",
      komentar: "koment",
      kreiraj: "a",
      /*       status: "obradjeno",
       */
    },
    {
      id: 3,
      ime: "Mile",
      prezime: "Miletic",
      datumPregleda: new Date("May 05, 2022 10:30:00").getTime(),
      odeljenje: "ZZ",
      spisakAnaliza: "spisakAnaliza",
      komentar: "koment",
      kreiraj: "a",
      /*       status: "neobradjeno",
       */
    },
  ];
  const demoLabVisits = [
    {
      id: 1,
      lbpPacijenta: 1234,
      lbzTehnicara: 321,
      napomena: "napomena",
      datumPregleda: new Date("December 30, 2019 17:30:00").getTime(),
      statusPregledaZakazaniPacijenti: "XX",
    },
    {
      id: 2,
      lbpPacijenta: 456,
      lbzTehnicara: 78910,
      napomena: "nap",
      datumPregleda: new Date("December 30, 2018 17:30:00").getTime(),
      statusPregledaZakazaniPacijenti: "YY",
    },
  ];
  /*   if (true) {
    labRep = (
      <Table
        headers={getTableHeaders("unrealizedLabReferrals")}
        tableContent={referrals}
        handleClick={handleClick}
        tableType="labReferrals"
      />
    );
  } else {
    labRep = (
      <div>
        <CustomModal
          title="Greska"
          info="Lista neobradjenih uputa je prazna"
          isSuccess={false}
          id="false"
        />
      </div>
    );
  } */
  if (isClicked1) {
    tab = (
      <div>
        <form className="form-custom familyFix">
          <br></br>
          <div className="form-group-custom">
            <select
              className="form-select-custom small-select margin-right"
              onChange={handlePatientChange}
              name="lbp"
              value={form.lbp}
              defaultValue=""
            >
              <option value="" disabled>
                Izaberite pacijenta
              </option>
              {patients.length > 0 ? (
                <>
                  {patients.map((patient) => {
                    return (
                      <option key={patient.lbp} value={patient.lbp}>
                        {patient.ime}
                      </option>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </select>
          </div>
        </form>
        {visits.length > 0 ? (
          <Table
            /*              tableContent={visits}
             */
            headers={getTableHeaders("scheduledVisits")}
            // tableContent={visits}
            tableContent={visits}
            tableType="admissionVisits"
            handleRowClick={handleRowClick}
            handleCancelVisit={handleCancelVisit}
            handleCreateLabReportTab1={handleCreateLabReportTab1}
          />
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    tab = (
      <div>
        <form onSubmit={handleSubmit} className="form-custom familyFix">
          <br></br>
          <div className="form-group-custom">
            <input
              className="margin-right"
              placeholder="LBP"
              onChange={handleChangeValue}
              name="lbp"
              type="text"
              value={value}
            />
            <button
              disabled={disable}
              onClick={handleSubmitValue}
              className={` ${disable ? "disabled" : ""}`}
              type="button"
            >
              Pretrazi
            </button>
          </div>
        </form>
        {/*  {labRep} */}
        {/*         {referrals.length > 0 && ( */}
        {referrals.length > 0 && (
          <Table
            headers={getTableHeaders("unrealizedLabReferrals")}
            tableContent={referralTableContent}
            /*              tableContent={referrals}
             */
            handlecreateLabReport={handlecreateLabReport}
            handleRowClick={handleRowClick}
            tableType="unrealizedLabReferrals"
            handleClick={handleClick}
          />
        )}
        {/*         {referrals.length === 0 && ( */}
        {demoUnrealizedLabReferrals.length === 0 && (
          <div>
            <CustomModal
              title="Greska"
              info="Lista neobradjenih uputa je prazna"
              isSuccess={false}
              id="false"
            />
          </div>
        )}
      </div>
    );
  }
  return (
    <div>
      <Sidebar links={getSidebarLinks("technician", 2)} />
      <div style={{ marginLeft: "20%" }}>
        <ul className="nav nav-tabs nav-justified">
          <li className="nav-item">
            <button
              className={` ${isClicked1 ? "isActive" : "inactive"}`}
              onClick={toggleClass1}
            >
              Zakazani pacijenti
            </button>
          </li>
          <li className="nav-item">
            <button
              className={` ${isClicked2 ? "isActive" : "inactive"}`}
              onClick={toggleClass2}
            >
              Kreiranje radnog naloga
            </button>
          </li>
        </ul>
        {tab}
      </div>
    </div>
  );
};

export default AdmissionPage;
