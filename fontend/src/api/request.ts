import { IClass, IDiem, IMajor, IStudent, ISubject } from "@/type/type";
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
export const updateStudent = (student: IStudent) => {
  axios
    .put(`http://localhost:5000/api/students/${student.mssv}`, student)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const deleteStudent = (student: IStudent) => {
  axios
    .delete(`http://localhost:5000/api/students/${student.mssv}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const getScoreListForStudent = async (mssv: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/students/subjects/${mssv}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const updateDiemForStudent = (score: IDiem) => {
  axios
    .put(`http://localhost:5000/api/students/subjects/${score.ma_diem}`, score)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const deleteDiemOfStudent = (score: IDiem) => {
  console.log(score);
  axios
    .delete(
      `http://localhost:5000/api/students/subjects/${score.ma_diem}/${score.ma_diem}`
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const AddSubjectOfStudent = (score: IDiem) => {
  axios
    .post(`http://localhost:5000/api/students/subjects/${score.mssv}`, score)
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
export const updateClass = (lop: IClass) => {
  axios
    .put(`http://localhost:5000/api/classes/${lop.ma_lop}`, lop)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const deleteClass = (lop: IClass) => {
  axios
    .delete(`http://localhost:5000/api/classes/${lop.ma_lop}`)
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
export const updatedMajor = (major: IMajor) => {
  axios
    .put(`http://localhost:5000/api/majors/${major.ma_nganh}`, major)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const deleteMajorByMaNganh = (major: IMajor) => {
  axios
    .delete(`http://localhost:5000/api/majors/${major.ma_nganh}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
// Subject
export const getAllSubject = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/subjects");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const addSubject = (subject: ISubject) => {
  axios
    .post("http://localhost:5000/api/subjects", subject)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const updatedSubject = (subject: ISubject) => {
  axios
    .put(`http://localhost:5000/api/subjects/${subject.ma_mon_hoc}`, subject)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const deleteSubjectByMaMonHoc = (subject: ISubject) => {
  axios
    .delete(`http://localhost:5000/api/subjects/${subject.ma_mon_hoc}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
