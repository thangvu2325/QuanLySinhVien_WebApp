"use client";
import { FunctionComponent, useState, useEffect } from "react";
import styles from "./ClassList.module.scss";
import classname from "classnames/bind";
import Table from "@/components/Table";
import SearchInput from "@/components/SearchInput/SearchInput";
import Dropdown from "@/components/Dropdown";
import { IClass } from "@/type/type";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { getAllClass } from "@/api/request";
import Link from "next/link";
import { usePathname } from "next/navigation";

const cx = classname.bind(styles);

interface ClassListProps {}
const theadArray = ["Mã Lớp", "Tên Lớp", "Tên Ngành", "Khóa", "Ngày Bắt Đầu"];
function convertDateStringsToDateObjects(data: IClass[]) {
  return data.map((item: IClass) => ({
    ...item,
    ngay_bat_dau: new Date(item.ngay_bat_dau),
  }));
}
const ClassList: FunctionComponent<ClassListProps> = () => {
  const [classList, setClassList] = useState<Array<IClass>>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllClass();
        if (data) {
          setClassList(convertDateStringsToDateObjects(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(classList);
  const pathname = usePathname();
  return (
    <div className={cx("wrap")}>
      <div className={cx("top")}>
        <h3 className={cx("title")}>Danh sách Lớp</h3>
        <div className={cx("content")}>
          <div className={cx("left")}>
            <Dropdown />
          </div>
          <div className={cx("right")}>
            <SearchInput title="Search Lớp"></SearchInput>
          </div>
        </div>
      </div>
      <Table theadArray={theadArray}>
        {classList.length ? (
          classList.splice(0, 20).map((lop) => (
            <tr className="hover:bg-gray-50" key={lop.ma_lop}>
              <th className="flex gap-3 px-6 py-4 font-maximum text-gray-900">
                {lop.ma_lop}
              </th>
              <td className="px-6 py-4">{lop.ten_lop}</td>
              <td className="px-6 py-4">{lop.ten_nganh}</td>
              <td className="px-6 py-4">{lop.khoa}</td>
              <td className="px-6 py-4">
                {lop.ngay_bat_dau.toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-4">
                  <a x-data="{ tooltip: 'Delete' }" href="#">
                    <IconTrash width={25} height={25} stroke={2} />
                  </a>
                  <a
                    x-data="{ tooltip: 'Edite' }"
                    href="#"
                    style={{ marginLeft: "20px" }}
                  >
                    <IconEdit width={25} height={25} stroke={2} />
                  </a>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr className={cx("announce")}>
            <td
              className={cx("annouce-content")}
              colSpan={theadArray.length + 1}
              style={{ padding: "16px 2px" }}
            >
              Hiện tại không có lớp nào.! Vui lòng
              <Link
                href={`${pathname}/add`}
                style={{ color: "#fe2c55", fontWeight: "600" }}
              >
                {" "}
                thêm lớp
              </Link>
            </td>
          </tr>
        )}
      </Table>
    </div>
  );
};

export default ClassList;
