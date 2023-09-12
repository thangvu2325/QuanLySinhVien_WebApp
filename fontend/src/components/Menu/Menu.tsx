import { FunctionComponent } from "react";
import className from "classnames/bind";
import styles from "./Menu.module.scss";
import Link from "next/link";
import { IMenuItem } from "@/type/type";
const cx = className.bind(styles);
interface MenuProps {
  title: string;
  MenuItems: Array<IMenuItem>;
}
const Menu: FunctionComponent<MenuProps> = ({ title, MenuItems }) => {
  return (
    <div className={cx("wrap")}>
      <h3 className={cx("title")}>{title}</h3>
      <ul className={cx("list")}>
        {MenuItems?.length
          ? MenuItems.map((menuItem) => (
              <li key={menuItem.id}>
                <Link className={cx("list-item")} href={menuItem.to}>
                  {menuItem.label}
                </Link>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default Menu;
