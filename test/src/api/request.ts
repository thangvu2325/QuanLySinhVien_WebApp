import { IClass, IMajor, IStudent } from "@/type/type";
import axios from "axios";
// Student
export const getAllStudent = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/students");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const addStudent = (student: IStudent) => {
  axios
    .post("http://localhost:5000/api/students", student)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
// Class

export const getAllClass = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/classes");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const addClass = (lop: IClass) => {
  axios
    .post("http://localhost:5000/api/classes", lop)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
// major
export const getAllMajor = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/majors");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const addMajor = (major: IMajor) => {
  axios
    .post("http://localhost:5000/api/majors", major)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
