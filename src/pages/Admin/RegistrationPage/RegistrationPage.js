import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { createEmployee } from "../../../redux/actions/employee";
import { getDepartments } from "../../../redux/actions/departments";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import "./styles.css";

const initialState = {
  name: "",
  surname: "",
  jmbg: "",
  email: "",
  address: "",
  city: "",
  profession: "",
  title: "",
  contact: "",
  gender: "male",
  dob: "",
  department: "",
  username: "",
  //   privilege: "",
};

function RegistrationPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     dispatch(getDepartments());
  //   }, []);

  //   const departments = useSelector((state) => state.departments);

  const departmentsDemo = [
    {
      id: 0,
      name: "Prvo odeljenje",
    },
    {
      id: 1,
      name: "Drugo odeljenje",
    },
    {
      id: 2,
      name: "Trece odeljenje",
    },
  ];

  const privilegesDemo = [
    {
      id: 0,
      name: "Admin",
    },
    {
      id: 1,
      name: "Doktor",
    },
    {
      id: 2,
      name: "Sestra",
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
      dob: formatted,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEmployee({ ...form, department: 1 }));
    navigate("/admin/employee-preview");
  };
  return (
    <div style={{ marginLeft: "20%" }}>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("admin", 3)} />
      </div>
      <form onSubmit={handleSubmit} className="form-custom familyFix">
        <h1 className="form-heading">Prijava zaposlenih</h1>
        <br></br>
        <div className="form-group-custom">
          <input
            className="margin-right"
            placeholder="Ime"
            onChange={handleChange}
            name="name"
            type="text"
          />
          <input
            className="margin-left"
            placeholder="Prezime"
            onChange={handleChange}
            name="surname"
            type="text"
          />
        </div>
        <div className="form-group-custom">
          <input
            placeholder="Korisnicko ime"
            type="text"
            onChange={handleChange}
            name="username"
            className="margin-right"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            className="margin-left"
          />
        </div>
        <div className="form-group-custom">
          <input
            type="date"
            data-date=""
            data-date-format="ddmmyyyy"
            onChange={onChangeDateHandler}
            name="dob"
            className="margin-right"
          />
          <input
            type="text"
            placeholder="Adresa stanovanja"
            onChange={handleChange}
            name="address"
            className="margin-left margin-right"
          />
          <input
            type="text"
            placeholder="Mesto stanovanja"
            onChange={handleChange}
            name="city"
            className="margin-left"
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            placeholder="Kontakt"
            onChange={handleChange}
            name="contact"
            className="margin-right"
          />
          <input
            className="margin-left"
            type="text"
            placeholder="JMBG"
            onChange={handleChange}
            name="jmbg"
          />
        </div>
        {/* <div className="form-group-custom"> */}
        {/* <select
            onChange={handleChange}
            className="form-select-custom small-select margin-right"
            aria-label="Default select example"
            defaultValue=""
            name="privilege"
          >
            <option value="" disabled>
              Privilegija
            </option>
            {privilegesDemo.map((privilege) => {
              return (
                <option key={privilege.id} value={privilege.id}>
                  {privilege.name}
                </option>
              );
            })}
          </select> */}
        {/* </div> */}
        <div className="form-group-custom">
          {/* <select
            onChange={handleChange}
            className="form-select-custom small-select margin-right"
            aria-label="Default select example"
            defaultValue="0"
            name="title"
          >
            <option value="">Titula</option>
            <option value="dr_spec_odeljenja">Nacelnik odeljenja</option>
            <option value="dr_spec">Doktor specijalista</option>
            <option value="dr_spec_pov">
              Doktor specijalista sa poverljivim pristupom
            </option>
            <option value="med_sestra">Medicinska sestra</option>
            <option value="visa_med_sestra">Visa medicinska sestra</option>
          </select> */}
          <select
            onChange={handleChange}
            className="form-select-custom small-select margin-right"
            aria-label="Default select example"
            defaultValue="0"
            name="title"
          >
            <option value="">Titula</option>
            <option value="Prof. dr. med.">Prof. dr. med.</option>
            <option value="Dr med.spec.">Dr med. spec.</option>
            <option value="Dr. sci. med">Dr sci. med.</option>
            <option value="Dipl. farm.">Dipl. farm.</option>
            <option value="Mag. farm.">Mag. farm.</option>
            <option value="Mr">Mr</option>
          </select>
          <select
            onChange={handleChange}
            className="form-select-custom small-select margin-left margin-right"
            aria-label="Default select example"
            defaultValue="0"
            name="profession"
          >
            <option value="">Zanimanje</option>
            <option value="Med. sestra">Med. sestra</option>
            <option value="Spec. biohemicar">Spec. biohemicar</option>
            <option value="Spec. gastroenterolog.">
              Spec. gastroenterolog
            </option>
            <option value="Spec. ginekolog">Spec. ginekolog</option>
            <option value="Spec. endrokrinolog">Spec. endrokrinolog</option>
            <option value="Spec. kardiolog">Spec. kardiolog</option>
            <option value="Spec. neurolog">Spec. neurolog</option>
            <option value="Spec. nefrolog">Spec. nefrolog</option>
            <option value="Spec. pshijatar">Spec. pshijatar</option>
            <option value="Spec. pulmolog">Spec. pulmolog</option>
            <option value="Spec. urolog">Spec. urolog</option>
            <option value="Spec. hematolog">Spec. hematolog</option>
            <option value="Spec. hirurg">Spec. hirurg</option>
          </select>
          <select
            onChange={handleChange}
            className="form-select-custom small-select margin-left"
            aria-label="Default select example"
            defaultValue=""
            name="department"
          >
            <option value="" disabled>
              Odeljenje
            </option>
            {departmentsDemo.map((department) => {
              return (
                <option key={department.id} value="0">
                  {department.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group-custom">
          <div className="wrapper">
            <input
              type="radio"
              name="gender"
              id="option-1"
              value="male"
              onChange={handleChange}
              checked
            />
            <input
              type="radio"
              name="gender"
              value="female"
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
        <br></br>
        <button onClick={handleSubmit}>Registruj zaposlenog</button>
      </form>
    </div>
  );
}
export default RegistrationPage;
