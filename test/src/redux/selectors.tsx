import { IClass, IMajor, IStudent } from "@/type/type";

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

export const classesSelector = (state: {
  classes: { data: IClass[]; loading: string };
}) => state.classes.data;
export const majorsSelector = (state: {
  majors: { data: IMajor[]; loading: string };
}) => state.majors.data;
