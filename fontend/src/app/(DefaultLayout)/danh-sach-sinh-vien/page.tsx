"use client";
import { FunctionComponent, useEffect, useState } from "react";
import styles from "./StudentList.module.scss";
import classname from "classnames/bind";
import Table from "@/components/Table";
import SearchInput from "@/components/SearchInput/SearchInput";
import { deleteStudent, updateStudent } from "@/api/request";
import { IClass, IMajor, IStudent } from "@/type/type";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import ModalComponent from "@/components/Modal/Modal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  classesSelector,
  majorsSelector,
  studentsRemainingSelector,
} from "@/redux/selectors";
import studentsSlice from "@/redux/Slice/studentsSlice";
import filtersSlice from "@/redux/Slice/filtersSlice";
const cx = classname.bind(styles);

interface StudentListProps {}
const theadarray = [
  "Sinh viên",
  "Mã Số Sinh Viên",
  "Số điện thoại",
  "Lớp",
  "Tình trạng học tập",
  "Khóa",
  "Bảng Điểm",
  "Ngành",
];
const StudentList: FunctionComponent<StudentListProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<{
    open_status: boolean;
    student: IStudent;
  }>({ open_status: false, student: {} as IStudent });
  const [searchValue, setSearchValue] = useState<string>("");
  const pathname = usePathname();
  const studentList: IStudent[] = useSelector(studentsRemainingSelector);
  const majorList: IMajor[] = useSelector(majorsSelector);
  const classList: IClass[] = useSelector(classesSelector);
  const dispatch = useDispatch();
  const initState: IStudent = {
    ho: "",
    ten_dem: "",
    ten: "",
    ten_nganh: "",
    khoa: 0,
    gioi_tinh: 0,
    so_dien_thoai: "",
    ten_lop: "",
  };
  const [initialValues, setInitialValues] = useState(initState);
  const onHide = () => {
    setShowModal(false);
  };
  const onShow = (student: IStudent) => {
    if (student) {
      console.log(student);
      reset(student);
    }

    setShowModal(true);
  };
  const onShowModalDelete = (student: IStudent) => {
    setModalDelete({ open_status: true, student });
    setShowModal(true);
  };
  const onHideModalDelete = () => {
    setModalDelete({ open_status: false, student: {} as IStudent });
  };
  const onSubmit = async (values: IStudent) => {
    try {
      await updateStudent(values);
      dispatch(studentsSlice.actions.editStudentInList(values));
      alert(`Sửa Sinh Viên thành công`);
    } catch (error) {
      alert(`Sửa Sinh Viên không thành công!`);
    }
  };
  const handleDeleteStudent = async (student: IStudent) => {
    try {
      await deleteStudent(student);
      dispatch(studentsSlice.actions.deleteStudentByMSSV(student.mssv));
      alert(`Xóa Sinh Viên thành công`);
      setShowModal(false);
    } catch (error) {
      alert(`Xóa Sinh Viên không thành công!`);
    }
  };
  const handleChangeSearchValue = (e: any) => {
    setSearchValue(e.target.value);
    dispatch(filtersSlice.actions.student_searchFilterChange(e.target.value));
  };
  const handleChangeClass = (e: any) => {
    const classSelected = classList.filter(
      (classItem) => classItem.ten_lop === e.target.value
    )[0];
    if (classSelected) {
      setValue("ten_nganh", classSelected.ten_nganh);
    }
  };
  const onError = (error: any): void => {
    console.log("ERROR:::", error);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    // reValidateMode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: initialValues,
  });
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(">>", value, name, type);
      // {1: '1', 2: '9'} '2' 'change'
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <ModalComponent
        onHide={onHide}
        onHideModalDelete={onHideModalDelete}
        title={modalDelete.open_status ? "Xóa Sinh Viên" : "Sửa Sinh Viên"}
        show={showModal}
      >
        {modalDelete.open_status ? (
          <>
            <p>
              Bạn có chắc muốn xóa sinh viên có mã số sinh viên:{" "}
              {modalDelete.student.mssv} không?
            </p>
            <div className={cx("action")}>
              <Button
                variant="primary"
                className={cx("btn")}
                onClick={() => handleDeleteStudent(modalDelete.student)}
              >
                Xóa
              </Button>
            </div>
          </>
        ) : (
          <Form
            className={cx("container-form")}
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <Form.Group
              className={cx("name-list")}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Group className={cx("name")}>
                <div className={cx("name-label")}>
                  <Form.Label>Họ</Form.Label>
                  <div className={cx("blank")}></div>
                </div>
                <div className={cx("name-input")}>
                  <Form.Control
                    type="text"
                    placeholder="Vũ"
                    {...register("ho", { required: "Field này là bắt buộc." })}
                  />
                  {errors.ho ? (
                    <Form.Text
                      className="text-danger"
                      style={{ whiteSpace: "nowrap", paddingLeft: "12px" }}
                    >
                      {errors.ho.message}
                    </Form.Text>
                  ) : (
                    <div className={cx("blank")}></div>
                  )}
                </div>
              </Form.Group>

              <Form.Group className={cx("name")}>
                <div className={cx("name-label")}>
                  <Form.Label>Tên Đệm</Form.Label>
                  <div className={cx("blank")}></div>
                </div>
                <div className={cx("name-input")}>
                  <Form.Control
                    type="text"
                    placeholder="Đức"
                    {...register("ten_dem", {
                      required: "Field này là bắt buộc.",
                    })}
                  />
                  {errors.ten_dem ? (
                    <Form.Text
                      className="text-danger"
                      style={{ whiteSpace: "nowrap", paddingLeft: "12px" }}
                    >
                      {errors.ten_dem.message}
                    </Form.Text>
                  ) : (
                    <div className={cx("blank")}></div>
                  )}
                </div>
              </Form.Group>

              <Form.Group className={cx("name")}>
                <div className={cx("name-label")}>
                  <Form.Label>Tên</Form.Label>
                  <div className={cx("blank")}></div>
                </div>
                <div className={cx("name-input")}>
                  <Form.Control
                    type="text"
                    placeholder="Thắng"
                    {...register("ten", { required: "Field này là bắt buộc." })}
                  />
                  {errors.ten ? (
                    <Form.Text
                      className="text-danger"
                      style={{ whiteSpace: "nowrap", paddingLeft: "12px" }}
                    >
                      {errors.ten.message}
                    </Form.Text>
                  ) : (
                    <div className={cx("blank")}></div>
                  )}
                </div>
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên ngành</Form.Label>
              <Form.Select
                aria-label="Tên ngành"
                {...register("ten_nganh", {
                  required: "Field này là bắt buộc.",
                })}
                disabled
              >
                <option>Open this select menu</option>
                {majorList.length
                  ? majorList.map((major: IMajor) => (
                      <option key={major.ma_nganh} value={major.ten_nganh}>
                        {major.ten_nganh}
                      </option>
                    ))
                  : ""}
              </Form.Select>
              {errors.ten_nganh && (
                <Form.Text className="text-danger">
                  {errors.ten_nganh.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder="20"
                {...register("so_dien_thoai", {
                  required: "Field này là bắt buộc.",
                })}
              />

              {errors.so_dien_thoai && (
                <Form.Text className="text-danger">
                  {errors.so_dien_thoai.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Khóa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Khóa học"
                {...register("khoa", {
                  required: "Field này là bắt buộc.",
                })}
                disabled
              />

              {errors.khoa && (
                <Form.Text className="text-danger">
                  {errors.khoa.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Lớp</Form.Label>
              <Form.Select
                aria-label="Lớp"
                {...register("ten_lop", { required: "Field này là bắt buộc." })}
                onChange={handleChangeClass}
              >
                <option>Open this select menu</option>
                {classList.length
                  ? classList.map((lop: IClass) => (
                      <option key={lop.ma_lop} value={lop.ten_lop}>
                        {lop.ten_lop}
                      </option>
                    ))
                  : ""}
              </Form.Select>
              {errors.ten_lop && (
                <Form.Text className="text-danger">
                  {errors.ten_lop.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="radio-with-other">
              <Form.Check
                type="radio"
                label="Nam"
                value={0}
                {...register("gioi_tinh", {
                  required: "Field này là bắt buộc.",
                })}
              />
              <Form.Check
                type="radio"
                label="Nữ"
                value={1}
                {...register("gioi_tinh", {
                  required: "Field này là bắt buộc.",
                })}
                // checked = {student}
              />
              {errors.gioi_tinh && (
                <Form.Text className="text-danger">
                  {errors?.gioi_tinh?.message}
                </Form.Text>
              )}
            </Form.Group>
            <div className={cx("action")}>
              <Button variant="primary" className={cx("btn")} type="submit">
                Cập nhật
              </Button>
            </div>
          </Form>
        )}
      </ModalComponent>

      <div className={cx("wrap")}>
        <div className={cx("top")}>
          <h3 className={cx("title")}>Danh sách sinh viên</h3>
          <div className={cx("content")}>
            <div className={cx("right")}>
              <SearchInput
                value={searchValue}
                onChange={handleChangeSearchValue}
                title="Search Sinh Viên"
              ></SearchInput>
            </div>
          </div>
        </div>
        <Table theadArray={theadarray}>
          {studentList?.length ? (
            studentList.map((student) => (
              <tr className="hover:bg-gray-50" key={student.id}>
                <th className="flex gap-3 px-6 py-4 font-maximum text-gray-900">
                  {`${student.ho} ${student.ten_dem} ${student.ten}`}
                </th>
                <td className="px-6 py-4">{student.mssv}</td>
                <td className="px-6 py-4">{student.so_dien_thoai}</td>
                <td className="px-6 py-4">{student.ten_lop}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 font-semibold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    Còn học
                  </span>
                </td>
                <td className="px-6 py-4">{student.khoa}</td>
                <td className="px-6 py-4">
                  <Link href={`${pathname}/${student.mssv}/danh-sach-diem`}>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 font-semibold text-green-600">
                      [ Xem ]
                    </span>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                      {student.ten_nganh}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button onClick={() => onShowModalDelete(student)}>
                      <IconTrash width={25} height={25} stroke={2} />
                    </button>
                    <button
                      style={{ marginLeft: "20px" }}
                      onClick={() => onShow(student)}
                    >
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
                Hiện tại không có sinh viên nào.! Vui lòng
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
