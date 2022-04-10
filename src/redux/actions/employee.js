import {
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_EMPLOYEES,
  SEARCH_EMPLOYEES,
} from "../actionTypes";
import * as api from "../../api/index.js";

export const getEmployees = () => async (dispatch) => {
  try {
    const { data } = await api.fetchEmployees();
    console.log(data);
    dispatch({ type: GET_EMPLOYEES, data });
  } catch (error) {
    console.log(error);
  }
};

export const createEmployee = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createEmployee(formData);
    dispatch({ type: CREATE_EMPLOYEE, data });
  } catch (error) {
    console.log(error);
  }
};

export const searchEmployees = (searchValue) => async (dispatch) => {
  try {
    console.log(searchValue);
    const { data } = await api.searchEmployees(searchValue);
    dispatch({ type: GET_EMPLOYEES, data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    console.log("CAO");
    await api.deleteEmployee(id);
    dispatch({ type: DELETE_EMPLOYEE, id });
  } catch (error) {
    console.log(error);
  }
};
