import { IClass, IMajor, IStudent, ISubject } from "@/type/type";
import { createSelector } from "@reduxjs/toolkit";

export const studentsSelector = (state: {
  students: { data: IStudent[]; loading: string };
}) => state.students.data;
export const studentsSelectorSortedByAlphabet = (state: {
  students: { data: IStudent[]; loading: string };
}) => {
  const studentData = [...state.students.data];
  return state.students.data
    .map((item, index) => {
      if (index === 0) {
        return studentData[0];
      }
      return item;
    })
    .sort((a, b) => a.ten.localeCompare(b.ten));
};
export const studentSearchTextSelector = (state: {
  filters: {
    search_student: string;
  };
}) => state.filters.search_student;
export const classesSelector = (state: {
  classes: { data: IClass[]; loading: string };
}) => state.classes.data;
export const majorsSelector = (state: {
  majors: { data: IMajor[]; loading: string };
}) => state.majors.data;
export const subjectsSelector = (state: {
  subjects: { data: ISubject[]; loading: string };
}) => state.subjects.data;
// Search Student
export const studentsRemainingSelector = createSelector(
  studentSearchTextSelector,
  studentsSelector,
  (searchText: string, studentsData: IStudent[]) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const studentList: IStudent[] = studentsData;
    return studentList.filter((student) => {
      const name = `${student.ho} ${student.ten_dem} ${student.ten}`;
      const lowerCaseItemName = name.toLowerCase();
      return lowerCaseItemName.includes(lowerCaseSearchText);
    });
  }
);
