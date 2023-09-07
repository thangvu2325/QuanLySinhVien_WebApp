"use client";
import { FunctionComponent } from "react";
import className from "classnames/bind";
import styles from "./Dropdown.module.scss";
import { useState } from "react";

const cx = className.bind(styles);
interface DropdownProps {}
const Dropdown: FunctionComponent<DropdownProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleDropdown = () => {
    setOpen(!open);
  };
  return (
    <div className={cx("wrap")}>
      <div className={cx("content")}>
        <div
          className={cx("dropdown", {
            isOpen: open,
          })}
          id="dropdown-food"
        >
          <button
            type="button"
            name="button"
            aria-haspopup="listbox"
            onClick={toggleDropdown}
          >
            <span id="dropdown-label" className={cx("dropdown-label")}>
              <h3>Lớp: 12A11</h3>
            </span>
            <span className={cx("dropdown-arrow")}></span>
          </button>
          <form id="form-food" name="formFood" className={cx("dropdown-form")}>
            <ul className={cx("dropdown-options")} role="listbox" tabIndex={-1}>
              <li className={cx("option")}>
                <label htmlFor="Lớp 11">
                  <span>Lớp 11</span>
                </label>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
