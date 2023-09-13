import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISubject } from "@/type/type";
export const fetchSubjectsData: any = createAsyncThunk(
  "subject/fetchData",
  async () => {
    const response = await fetch("http://localhost:5000/api/subjects"); // Gọi API để lấy dữ liệu
    const data = await response.json();
    return data;
  }
);
export default createSlice({
  name: "students",
  initialState: {
    data: [] as ISubject[],
    loading: "idle",
  },
  reducers: {
    addSubjectToList: (state, action) => {
      const Subject = action.payload;
      const isSubjectAlreadyInList = state.data.find(
        (existingSubject) => existingSubject.ma_mon_hoc === Subject.ma_mon_hoc
      );
      if (!isSubjectAlreadyInList) {
        state.data.push(Subject);
      }
    },
    deleteSubjectByMaMonHoc: (state, action) => {
      const SubjectMaMonHoc = action.payload;
      state.data = state.data.filter(
        (Subject) => Subject.ma_mon_hoc !== SubjectMaMonHoc
      );
    },
    editSubjectInList: (state, action) => {
      const updatedSubject = action.payload;
      const existingSubjectIndex = state.data.findIndex(
        (existingSubject) =>
          existingSubject.ma_mon_hoc === updatedSubject.ma_mon_hoc
      );

      if (existingSubjectIndex !== -1) {
        // If the Subject with the specified "mssv" exists in the array,
        // replace it with the updated Subject
        state.data[existingSubjectIndex] = updatedSubject;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjectsData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchSubjectsData.fulfilled, (state, action) => {
        state.loading = "success";
        state.data = action.payload;
      })
      .addCase(fetchSubjectsData.rejected, (state) => {
        state.loading = "error";
      });
  },
});
