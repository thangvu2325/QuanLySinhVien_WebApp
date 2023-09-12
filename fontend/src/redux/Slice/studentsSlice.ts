import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IStudent } from "@/type/type";
export const fetchStudentsData: any = createAsyncThunk(
  "students/fetchData",
  async () => {
    const response = await fetch("http://localhost:5000/api/students"); // Gọi API để lấy dữ liệu
    const data = await response.json();
    return data;
  }
);
export default createSlice({
  name: "students",
  initialState: {
    data: [] as IStudent[],
    loading: "idle",
  },
  reducers: {
    addStudentToList: (state, action) => {
      const student = action.payload;
      const isStudentAlreadyInList = state.data.find(
        (existingStudent) => existingStudent.mssv === student.mssv
      );
      if (!isStudentAlreadyInList) {
        state.data.push(student);
      }
    },
    deleteStudentByMSSV: (state, action) => {
      const StudentMSSV = action.payload;
      state.data = state.data.filter((student) => student.mssv !== StudentMSSV);
    },
    editStudentInList: (state, action) => {
      const updatedStudent = action.payload;
      const existingStudentIndex = state.data.findIndex(
        (existingStudent) => existingStudent.mssv === updatedStudent.mssv
      );

      if (existingStudentIndex !== -1) {
        // If the student with the specified "mssv" exists in the array,
        // replace it with the updated student
        state.data[existingStudentIndex] = updatedStudent;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchStudentsData.fulfilled, (state, action) => {
        state.loading = "success";
        state.data = action.payload.map((student: any) => ({
          ...student,
          gioi_tinh: student.gioi_tinh.data[0],
        }));
      })
      .addCase(fetchStudentsData.rejected, (state) => {
        state.loading = "error";
      });
  },
});
