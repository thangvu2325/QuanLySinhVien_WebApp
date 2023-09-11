"use client";
import { FunctionComponent, useState, useEffect, useCallback } from "react";
import styles from "./StudentList.module.scss";
import classname from "classnames/bind";
import Table from "@/components/Table";
import SearchInput from "@/components/SearchInput/SearchInput";
import Dropdown from "@/components/Dropdown";
import {
  addStudent,
  getAllClass,
  getAllMajor,
  getAllStudent,
} from "@/api/request";
import { IClass, IMajor, IStudent } from "@/type/type";
import { useForm } from "react-hook-form";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import ModalComponent from "@/components/Modal/Modal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import {
  classesSelector,
  majorsSelector,
  studentsSelectorSortedByAlphabet,
} from "@/redux/selectors";
const cx = classname.bind(styles);

interface StudentListProps {}
const theadarray = [
  "Sinh viên",
  "Mã Số Sinh Viên",
  "Số điện thoại",
  "Tình trạng học tập",
  "Khóa",
  "Ngành",
];
const StudentList: FunctionComponent<StudentListProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const pathname = usePathname();
  const studentList: IStudent[] = useSelector(studentsSelectorSortedByAlphabet);
  const majorList: IMajor[] = useSelector(majorsSelector);
  const classList: IClass[] = useSelector(classesSelector);
  const onHide = () => {
    setShowModal(false);
  };
  const onShow = () => {
    setShowModal(true);
  };
  const initState: IStudent = {
    ho: "",
    ten_dem: "",
    ten: "",
    ten_nganh: "",
    gioi_tinh: "",
    so_dien_thoai: "",
    ten_lop: "",
  };
  const [initialValues, setInitialValues] = useState(initState);
  const onSubmit = async (values: IStudent) => {
    try {
      await addStudent(values);
      alert(`Sửa Sinh Viên thành công`);
    } catch (error) {
      alert(`Sửa Sinh Viên không thành công!`);
    }
  };

  const onError = (error: any): void => {
    console.log("ERROR:::", error);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    // reValidateMode: "onChange",
    defaultValues: initialValues,
  });

  return (
    <>
      <ModalComponent onHide={onHide} title="Thêm Sinh Viên" show={showModal}>
        <div>Hello</div>
      </ModalComponent>

      <div className={cx("wrap")}>
        <div className={cx("top")}>
          <h3 className={cx("title")}>Danh sách sinh viên</h3>
          <div className={cx("content")}>
            <div className={cx("left")}>
              <Dropdown />
            </div>
            <div className={cx("right")}>
              <SearchInput title="Search Sinh Viên"></SearchInput>
            </div>
          </div>
        </div>
        <Table theadArray={theadarray}>
          {studentList?.length ? (
            studentList
              .sort((a, b) => a.ten.localeCompare(b.ten))
              .splice(0, 20)
              .map((student) => (
                <tr className="hover:bg-gray-50" key={student.id}>
                  <th className="flex gap-3 px-6 py-4 font-maximum text-gray-900">
                    {`${student.ho} ${student.ten_dem} ${student.ten}`}
                  </th>
                  <td className="px-6 py-4">{student.mssv}</td>
                  <td className="px-6 py-4">{student.so_dien_thoai}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 font-semibold text-green-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                      Còn học
                    </span>
                  </td>
                  <td className="px-6 py-4">{student.khoa}</td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                        {student.ten_nganh}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      <button>
                        <IconTrash width={25} height={25} stroke={2} />
                      </button>
                      <button style={{ marginLeft: "20px" }} onClick={onShow}>
                        <IconEdit width={25} height={25} stroke={2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
          ) : (
            <tr className={cx("announce")}>
              <td
                className={cx("annouce-content")}
                colSpan={theadarray.length + 1}
                style={{ padding: "16px 2px", textAlign: "center" }}
              >
                Hiện tại không có ngành nào.! Vui lòng
                <Link
                  href={`${pathname}/add`}
                  style={{ color: "#fe2c55", fontWeight: "600" }}
                >
                  {" "}
                  thêm Sinh viên
                </Link>
              </td>
            </tr>
          )}
        </Table>
      </div>
    </>
  );
};

export default StudentList;
