import "./registrationPatient.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaHome, FaUser, FaUserInjured, FaPlusCircle } from "react-icons/fa";
import { BiCalendarPlus } from "react-icons/bi";
import Sidebar from "../../components/Sidebar/Sidebar";
import { createPatient } from "../../redux/actions/patient";

const initialState = {
  jmbg: "",
  ime: "",
  imeRoditelja: "",
  prezime: "",
  datumRodjenja: new Date(),
  mestoRodjenja: "",
  zemljaDrzavljanstva: "",
  adresa: "",
  mestoStanovanja: "",
  zemljaStanovanja: "",
  kontaktTelefon: "",
  email: "",
  jmbgStaratelj: "",
  imeStaratelj: "",
  porodicniStatus: "",
  bracniStatus: "U_BRAKU",
  brojDece: 0,
  stepenStrucneSpreme: "",
  zanimanje: "",
  pol: "muski",
  datumVremeSmrti: new Date(),
};

function RegistrationPatientPage() {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();

  const links = [
    {
      id: 1,
      text: "Početna",
      path: "/nurse",
      icon: <FaHome />,
    },
    {
      id: 2,
      text: "Pacijenti",
      path: "/nurse/patient-preview",
      icon: <FaUserInjured />,
    },
    {
      id: 3,
      text: "Zakazivanje",
      path: "/nurse/schedule-appointment",
      icon: <BiCalendarPlus />,
    },
    {
      id: 4,
      text: "Nov pacijent",
      path: "/nurse/register-patient",
      icon: <FaPlusCircle />,
      dividerAfter: true,
      isActive: true,
    },
    {
      id: 6,
      text: "Profil",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onChangeDateHandler = (e) => {
    const date = new Date(e.target.value);
    const years = date.toLocaleDateString("en-US", { year: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "numeric" });
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    let formatted = years;
    formatted += month.length === 1 ? `-0${month}` : `-${month}`;
    formatted += day.length === 1 ? `-0${day}` : `-${day}`;
    setForm({
      ...form,
      datumRodjenja: formatted,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(createPatient({ ...form, pol: "MUSKI" }));
    // navigate("/nurse");
  };
  return (
    <div style={{ marginLeft: "15%" }}>
      <div className="sidebar-link-container">
        <Sidebar links={links} />
      </div>
      <form className="form-custom">
        <h1 className="form-heading">Dodavanje pacijenta</h1>
        <br></br>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-right"
            placeholder="Ime"
            onChange={handleChange}
            name="ime"
          />
          <input
            type="text"
            className="margin-left"
            placeholder="Prezime"
            onChange={handleChange}
            name="prezime"
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-right"
            placeholder="Ime roditelja"
            onChange={handleChange}
            name="imeRoditelja"
          />
          <input
            type="text"
            className="margin-left"
            placeholder="JMBG"
            onChange={handleChange}
            name="jmbg"
          />
        </div>
        <div className="form-group-custom">
          <input
            type="date"
            className="margin-right"
            data-date=""
            data-date-format="ddmmyyyy"
            onChange={onChangeDateHandler}
            name="datumRodjenja"
          />
          <input
            type="text"
            className="margin-left margin-right"
            placeholder="Mesto rodjenja"
            name="mestoRodjenja"
            onChange={handleChange}
          />
          <input
            type="text"
            className="margin-left"
            placeholder="Adresa stanovanja"
            onChange={handleChange}
            name="adresa"
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-right"
            placeholder="Mesto stanovanja"
            onChange={handleChange}
            name="mestoStanovanja"
          />
          <input
            type="text"
            className="margin-left margin-right"
            placeholder="Zemlja stanovanja"
            onChange={handleChange}
            name="zemljaStanovanja"
          />
          <input
            type="text"
            className="margin-left"
            placeholder="Zemlja drzavljanstva"
            onChange={handleChange}
            name="zemljaDrzavljanstva"
          />
        </div>
        <div className="form-group-custom">
          <input
            className="margin-right"
            type="text"
            placeholder="Kontankt telefon"
            onChange={handleChange}
            name="kontaktTelefon"
          />
          <input
            className="margin-left"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-right"
            placeholder="Ime i prezime staratelja"
            onChange={handleChange}
            name="imeStaratelj"
          />
          <input
            type="text"
            className="margin-left"
            placeholder="JMBG staratelja"
            onChange={handleChange}
            name="jmbgStaratelj"
          />
        </div>
        <div className="form-group-custom">
          <select
            className="form-select-custom small-select margin-right"
            aria-label="Default select example"
            defaultValue=""
            name="porodicniStatus"
            onChange={handleChange}
          >
            <option value="" disabled>
              Porodicni status
            </option>
            <option value="OBA_RODITELJA">Oba roditelja</option>
            <option value="asdasd">Roditelj razdvojeni</option>
            <option value="">Razvedni</option>
            <option value="">Jedan roditelje</option>
            <option value="">Bez roditelja</option>
            <option value="">Usvojen</option>
          </select>
          <select
            className="form-select-custom small-select margin-left"
            aria-label="Default select example"
            defaultValue=""
            name="bracniStatus"
            onChange={handleChange}
          >
            <option value="" disabled>
              Bracni status
            </option>
            <option value="U_BRAKU">U braku</option>
            <option value="">Razvedeni</option>
            <option value="">Udovac/udovica</option>
            <option value="">Samac/samica</option>
          </select>
        </div>
        <div className="form-group-custom">
          <input
            type="number"
            className="margin-right"
            placeholder="Broj dece"
            name="brojDece"
          />
          <input
            type="text"
            className="margin-left margin-right"
            placeholder="Zanimanje"
            onChange={handleChange}
            name="zanimanje"
          />
          <select
            className="form-select-custom small-select margin-left"
            aria-label="Default select example"
            defaultValue=""
            onChange={handleChange}
            name="stepenStrucneSpreme"
          >
            <option value="" disabled>
              Stepen strucne spreme
            </option>
            <option value="OSNOVNO">Bez osnovnog obrazovanja</option>
            <option value="">Osnovno obrazovanje</option>
            <option value="">Srednje obrazovanje</option>
            <option value="">Vise obrazovanje</option>
            <option value="">Visoko obrazovanje</option>
          </select>
        </div>
        <br></br>
        <div className="form-group-custom">
          <div className="wrapper">
            <input
              type="radio"
              name="pol"
              id="option-1"
              value="MUSKI"
              onChange={handleChange}
              checked
            />
            <input
              type="radio"
              name="pol"
              value="ZENSKI"
              id="option-2"
              onChange={handleChange}
            />
            <label htmlFor="option-1" className="option option-1">
              <div className="dot"></div>
              <span>Muski pol</span>
            </label>
            <label htmlFor="option-2" className="option option-2">
              <div className="dot"></div>
              <span>Zenski pol</span>
            </label>
          </div>
        </div>
        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Registruj pacijenta
        </button>
      </form>
    </div>
  );
}
export default RegistrationPatientPage;
