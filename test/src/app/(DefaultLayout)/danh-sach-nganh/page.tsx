"use client";
import { FunctionComponent, useState, useEffect } from "react";
import styles from "./MajorList.module.scss";
import classname from "classnames/bind";
import Table from "@/components/Table";
import SearchInput from "@/components/SearchInput/SearchInput";
import Dropdown from "@/components/Dropdown";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { getAllMajor } from "@/api/request";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IMajor } from "@/type/type";

const cx = classname.bind(styles);

interface MajorListProps {}
const theadArray = ["Mã Ngành", "Tên Ngành"];
const MajorList: FunctionComponent<MajorListProps> = () => {
  const [majorList, setMajorList] = useState<Array<IMajor>>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMajor();
        if (data) {
          setMajorList(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const pathname = usePathname();
  return (
    <div className={cx("wrap")}>
      <div className={cx("top")}>
        <h3 className={cx("title")}>Danh sách Ngành</h3>
        <div className={cx("content")}>
          <div className={cx("left")}>
            <Dropdown />
          </div>
          <div className={cx("right")}>
            <SearchInput title="Search Ngành"></SearchInput>
          </div>
        </div>
      </div>
      <Table theadArray={theadArray}>
        {majorList.length ? (
          majorList.splice(0, 20).map((major) => (
            <tr className="hover:bg-gray-50" key={major.ma_nganh}>
              <th className="flex gap-3 px-6 py-4 font-maximum text-gray-900">
                {major.ma_nganh}
              </th>

              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                    {major.ten_nganh}
                  </span>
                </div>
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
              style={{ padding: "16px 2px", textAlign: "center" }}
            >
              Hiện tại không có ngành nào.! Vui lòng
              <Link
                href={`${pathname}/add`}
                style={{ color: "#fe2c55", fontWeight: "600" }}
              >
                {" "}
                thêm ngành học
              </Link>
            </td>
          </tr>
        )}
      </Table>
    </div>
  );
};

export default MajorList;
