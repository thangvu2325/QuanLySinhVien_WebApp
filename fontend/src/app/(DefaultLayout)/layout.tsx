"use client";
import { Metadata } from "next";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "@/layout/components/Header";
import SideBar from "@/layout/components/Sidebar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchClassesData } from "@/redux/Slice/classesSlice";
import { fetchStudentsData } from "@/redux/Slice/studentsSlice";
import { fetchMajorsData } from "@/redux/Slice/majorSlice";
import { fetchSubjectsData } from "@/redux/Slice/subjectsSlice";
// import Footer from "@/layout/components/Footer";
const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "Phần mềm quản lý sinh viên",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudentsData());
    dispatch(fetchClassesData());
    dispatch(fetchMajorsData());
    dispatch(fetchSubjectsData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={cx("wrap")}>
      <SideBar></SideBar>
      <div className={cx("container")}>
        <Header></Header>
        {children}
        {/* <Footer></Footer> */}
      </div>
    </div>
  );
}
