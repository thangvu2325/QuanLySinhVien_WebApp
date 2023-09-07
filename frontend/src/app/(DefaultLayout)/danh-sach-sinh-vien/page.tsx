"use client";
import { FunctionComponent, useState, useEffect } from "react";
import styles from "./StudentList.module.scss";
import classname from "classnames/bind";
import Table from "@/components/Table";
import SearchInput from "@/components/SearchInput/SearchInput";
import Dropdown from "@/components/Dropdown";
import { getAllStudent } from "@/api/request";
import { IStudent } from "@/type/type";
const cx = classname.bind(styles);

interface StudentListProps {}

const StudentList: FunctionComponent<StudentListProps> = () => {
  const [studentList, setStudentList] = useState<Array<IStudent>>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllStudent();
        if (data) {
          setStudentList(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={cx("wrap")}>
      <div className={cx("top")}>
        <h3 className={cx("title")}>Danh sách sinh viên</h3>
        <div className={cx("content")}>
          <div className={cx("left")}>
            <Dropdown />
          </div>
          <div className={cx("right")}>
            <SearchInput></SearchInput>
          </div>
        </div>
      </div>
      <Table data={studentList}></Table>
    </div>
  );
};

export default StudentList;
