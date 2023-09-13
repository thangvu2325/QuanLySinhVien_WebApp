import { createSlice } from "@reduxjs/toolkit";
export default createSlice({
  name: "filters",
  initialState: {
    search_student: "" as string,
    search_class: "" as string,
    search_major: "" as string,
    search_subject: "" as string,
  },
  reducers: {
    student_searchFilterChange: (state, action) => {
      state.search_student = action.payload;
    },
    class_searchFilterChange: (state, action) => {
      state.search_class = action.payload;
    },
    major_searchFilterChange: (state, action) => {
      state.search_major = action.payload;
    },
    subject_searchFilterChange: (state, action) => {
      state.search_subject = action.payload;
    },
  },
});
