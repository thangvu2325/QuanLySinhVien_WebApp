import { FunctionComponent } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);
interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return <div className={cx("wrap")}>Header</div>;
};

export default Header;
