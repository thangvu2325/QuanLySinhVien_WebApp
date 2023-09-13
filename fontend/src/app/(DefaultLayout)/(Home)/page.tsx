"use client";
import { FunctionComponent } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
interface HomeProps {}
const Home: FunctionComponent<HomeProps> = () => {
  return <div className={cx("wrap")}></div>;
};
export default Home;
