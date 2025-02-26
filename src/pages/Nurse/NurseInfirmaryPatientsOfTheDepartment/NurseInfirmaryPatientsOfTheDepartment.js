import React from "react";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { searchPatients } from "../../../redux/actions/patients";
import { useNavigate } from "react-router";
import { getTableHeaders } from "../../../commons/tableHeaders";
import Table from "../../../components/Table/Table";

const NurseInfirmaryPatientsOfTheDepartment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState();
  const [isSearch, setSearch] = useState(false);

  const demoPatients = [
    {
      lbpPacijenta: "0123",
      ime: "Marta",
      prezime: "Markovic",
      jmbg: "12345678",
    },
    {
      lbpPacijenta: "2345",
      ime: "Goran",
      prezime: "Markovic",
      jmbg: "12345678",
    },
    {
      lbpPacijenta: "7890",
      ime: "Rosa",
      prezime: "Markovic",
      jmbg: "12345678",
    },
  ];

  function handleSubmit(event) {
    event.preventDefault();
    // dispatch(searchPatients({ ...form }));
    setSearch(!isSearch);
  }

  const patients = useSelector((state) => state.patients);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNavigate = (lbp) => {
    navigate(`/nurse/infirmary/patients-department/history/${lbp}`);
  };

  let table;
  if (isSearch) {
    table = (
      <Table
        headers={getTableHeaders("departmentPatients")}
        // tableContent={patients}
        handleRowClick={handleNavigate}
        // tableType="patients"
        tableContent={demoPatients}
      />
    );
  }
  return (
    <div>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("nurse", 7)} />
      </div>
      <div style={{ marginLeft: "20%" }}>
        <form onSubmit={handleSubmit} className="form-custom familyFix">
          <h1 className="form-heading">Rad sa pacijentima</h1>
          <br></br>
          <div className="form-group-custom">
            <input
              type="text"
              className="margin-right"
              placeholder="LBP"
              onChange={handleChange}
              name="LBP"
            />
            <input
              type="text"
              className="margin-right"
              placeholder="Ime"
              onChange={handleChange}
              name="ime"
            />
          </div>
          <div className="form-group-custom">
            <input
              type="text"
              className="margin-right"
              placeholder="Prezime"
              onChange={handleChange}
              name="Prezime"
            />
            <input
              type="text"
              className="margin-left"
              placeholder="JMBG"
              onChange={handleChange}
              name="jmbg"
            />
          </div>
          <br></br>
          <button type="submit" onClick={handleSubmit}>
            Pretraži
          </button>
        </form>
        {table}
      </div>
    </div>
  );
};

export default NurseInfirmaryPatientsOfTheDepartment;
