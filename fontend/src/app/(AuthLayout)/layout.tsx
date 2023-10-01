"use client";
import { Metadata } from "next";
import classNames from "classnames/bind";
import styles from "./AuthLayout.module.scss";
import Header from "@/layout/components/Header";
// import Footer from "@/layout/components/Footer";
const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "Đăng nhap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cx("wrap")}>
      <Header></Header>
      <div className={cx("container")}>{children}</div>
    </div>
  );
}
