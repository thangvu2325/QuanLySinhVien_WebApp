import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IClass } from "@/type/type";
export const fetchClassesData: any = createAsyncThunk(
  "classes/fetchData",
  async () => {
    const response = await fetch("http://localhost:5000/api/classes"); // Gọi API để lấy dữ liệu
    const data = await response.json();
    return data;
  }
);
export default createSlice({
  name: "classes",
  initialState: {
    data: [] as IClass[],
    loading: "idle",
  },
  reducers: {
    addClass: (state, action) => {
      const lop = action.payload;
      const isClassAlreadyInList = state.data.find(
        (existingStudent) => existingStudent.ma_lop === lop.ma_lop
      );
      if (!isClassAlreadyInList) {
        state.data.push(lop);
      }
    },
    deleteClassByMaLop: (state, action) => {
      const ma_lop = action.payload;
      state.data = state.data.filter((lop) => lop.ma_lop !== ma_lop);
    },
    editClassInList: (state, action) => {
      const updatedClass = action.payload;
      const existingClassIndex = state.data.findIndex(
        (existingStudent) => existingStudent.ma_lop === updatedClass.ma_lop
      );

      if (existingClassIndex !== -1) {
        state.data[existingClassIndex] = updatedClass;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassesData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchClassesData.fulfilled, (state, action) => {
        state.loading = "success";
        state.data = action.payload;
      })
      .addCase(fetchClassesData.rejected, (state) => {
        state.loading = "error";
      });
  },
});
