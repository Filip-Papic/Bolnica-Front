import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import CustomCalendar from "../../../components/CustomCalendar/CustomCalendar";
import { Dropdown } from "react-bootstrap";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import NewAppointment from "../../../components/NewAppointment/NewAppointment";
import Header from "../../../components/Header/Header";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
} from "../../../redux/actions/appointments";
import DeleteAppointment from "../../../components/DeleteAppointment/DeleteAppointment";
import { getEmployees } from "../../../redux/actions/employee";
import { getPatients } from "../../../redux/actions/patients";
import { getSidebarLinks } from "../../../commons/sidebarLinks";

const ScheduleAppointmentPage = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const patients = useSelector((state) => state.patients);
  const appointments = useSelector((state) => state.appointments);
  const [date, setDate] = useState(new Date());
  const [newAppointmentVisible, setNewAppointmentVisible] = useState(false);
  const [deleteAppointmentVisible, setDeleteAppointmentVisible] =
    useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [appointmentIdDelete, setAppointmentIdDelete] = useState(1);
  const [events, setEvents] = useState([
    {
      id: 1,
      startAt: "2022-04-08T08:00:00.000Z",
      endAt: "2022-04-08T09:00:00.000Z",
      summary: "Prvi pregled",
      color: "#336cfb",
      calendarID: "work",
    },
  ]);
  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getPatients());
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      setSelectedDoctor(employees[0]);
      getAppointments(employees[0].lbz);
    }
  }, [employees]);

  useEffect(() => {
    if (appointments.length > 0) {
      setEvents(
        appointments.map((appointment) => {
          const date = new Date(appointment.datumIVremePregleda);
          return {
            id: 1,
            startAt: date.toISOString(),
            endAt: date.addHours(1).toISOString(),
            summary: `Pacijent: ${appointment.pacijent.ime} ${appointment.pacijent.prezime} - ${appointment.statusPregleda}, Status prispeca: ${appointment.prispecePacijenta}`,
            color: "#336cfb",
            calendarID: "work",
          };
        })
      );
    }
  }, [appointments]);

  // eslint-disable-next-line no-extend-native
  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  const getDoctorAppointments = (lbz) => {
    const newDoctor = employees.find((doctor) => doctor.lbz === lbz);
    setSelectedDoctor(newDoctor);
    dispatch(getAppointments(lbz));
  };

  const createNewAppointment = (patientId, date, examinationType, note) => {
    const newEvent = {
      id: events.length + 1,
      startAt: date.toISOString(),
      endAt: date.addHours(1).toISOString(),
      summary: events.length + 1 + ". pregled",
      color: "#336cfb",
      calendarID: "work",
    };
    setNewAppointmentVisible(false);
    setEvents([...events, newEvent]);
    dispatch(
      createAppointment({
        lbz: selectedDoctor.lbz,
        lbp: patientId,
        dateAndTimeOfAppointment: date.toISOString(),
        note,
        // examinationType,
      })
    );
  };

  const deleteAppointment = () => {
    setDeleteAppointmentVisible(false);
    dispatch((appointmentIdDelete) =>
      deleteAppointment({ appointmentIdDelete })
    );
  };

  return (
    <div className="page-container">
      <div>
        <Sidebar links={getSidebarLinks("nurse", 3)} />
      </div>
      {selectedDoctor && (
        <Dropdown className="dropdownButton">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Dr. {selectedDoctor.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {employees.map((doctor) => {
              if (doctor.lbz !== selectedDoctor.lbz)
                return (
                  <Dropdown.Item
                    key={doctor.lbz}
                    onClick={() => getDoctorAppointments(doctor.lbz)}
                  >
                    Dr. {doctor.name}
                  </Dropdown.Item>
                );
            })}
          </Dropdown.Menu>
        </Dropdown>
      )}
      <div style={{ marginLeft: "15%", height: "100vh" }}>
        <CustomCalendar
          events={events}
          setDate={setDate}
          setNewAppointmentVisible={setNewAppointmentVisible}
          setDeleteAppointmentVisible={setDeleteAppointmentVisible}
          setAppointmentIdDelete={setAppointmentIdDelete}
        />
      </div>
      {newAppointmentVisible && selectedDoctor ? (
        <NewAppointment
          avatarUrl={"nikolaSlika 1.jpg"}
          userName={`Dr. ${selectedDoctor.name}`}
          userTitle={"Kardiolog"}
          doctorId={selectedDoctor.lbz}
          createNewAppointment={createNewAppointment}
          setNewAppointmentVisible={setNewAppointmentVisible}
          date={date}
          patients={patients}
        />
      ) : (
        <></>
      )}

      {deleteAppointmentVisible ? (
        <DeleteAppointment
          avatarUrl={"nikolaSlika 1.jpg"}
          userName={"Dr. Paun"}
          userTitle={"Kardiolog"}
          deleteAppointment={deleteAppointment}
          date={date}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ScheduleAppointmentPage;
