import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMajor } from "@/type/type";
export const fetchMajorsData: any = createAsyncThunk(
  "majors/fetchData",
  async () => {
    const response = await fetch("http://localhost:5000/api/majors"); // Gọi API để lấy dữ liệu
    const data = await response.json();
    return data;
  }
);
export default createSlice({
  name: "majors",
  initialState: {
    data: [] as IMajor[],
    loading: "idle",
  },
  reducers: {
    addMajor: (state, action) => {
      const major = action.payload;
      const isMajorAlreadyInList = state.data.find(
        (existingMajor) => existingMajor.ma_nganh === major.ma_nganh
      );
      if (!isMajorAlreadyInList) {
        state.data.push(major);
      }
    },
    deleteMajorByMaNganh: (state, action) => {
      const ma_nganh = action.payload;
      state.data = state.data.filter((major) => major.ma_nganh !== ma_nganh);
    },
    editMajorInList: (state, action) => {
      const updatedMajor = action.payload;
      const existingMajorIndex = state.data.findIndex(
        (existingMajor) => existingMajor.ma_nganh === updatedMajor.ma_nganh
      );

      if (existingMajorIndex !== -1) {
        // If the Major with the specified "mssv" exists in the array,
        // replace it with the updated Major
        state.data[existingMajorIndex] = updatedMajor;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMajorsData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchMajorsData.fulfilled, (state, action) => {
        state.loading = "success";
        state.data = action.payload;
      })
      .addCase(fetchMajorsData.rejected, (state) => {
        state.loading = "error";
      });
  },
});
