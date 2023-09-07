import { Metadata } from "next";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "@/layout/components/Header";
import SideBar from "@/layout/components/Sidebar";
// import Footer from "@/layout/components/Footer";
const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "Phần mềm quản lý sinh viên",
};

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
