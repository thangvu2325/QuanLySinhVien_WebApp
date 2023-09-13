"use client";
import { FunctionComponent, useEffect, useState } from "react";
import styles from "./SubjectList.module.scss";
import classname from "classnames/bind";
import Table from "@/components/Table";
import SearchInput from "@/components/SearchInput/SearchInput";
import Dropdown from "@/components/Dropdown";
import { deleteSubjectByMaMonHoc, updatedSubject } from "@/api/request";
import { ISubject } from "@/type/type";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import ModalComponent from "@/components/Modal/Modal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { subjectsSelector } from "@/redux/selectors";
import subjectsSlice from "@/redux/Slice/subjectsSlice";
const cx = classname.bind(styles);

interface SubjectListProps {}
const theadarray = ["Mã Môn Học", "Tên Môn Học"];
const SubjectList: FunctionComponent<SubjectListProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<{
    open_status: boolean;
    subject: ISubject;
  }>({ open_status: false, subject: {} as ISubject });
  const pathname = usePathname();
  const subjectList: ISubject[] = useSelector(subjectsSelector);
  const dispatch = useDispatch();
  const initState: ISubject = {
    ten_mon_hoc: "",
  };
  const [initialValues, setInitialValues] = useState(initState);
  const onHide = () => {
    setShowModal(false);
  };
  const onShow = (subject: ISubject) => {
    if (subject) {
      console.log(subject);
      reset(subject);
    }

    setShowModal(true);
  };

  const onSubmit = async (values: ISubject) => {
    try {
      await updatedSubject(values);
      dispatch(subjectsSlice.actions.editSubjectInList(values));
      alert(`Sửa Môn Học thành công`);
    } catch (error) {
      alert(`Sửa Môn Học không thành công!`);
    }
  };
  const handleDeleteStudent = async (subject: ISubject) => {
    try {
      await deleteSubjectByMaMonHoc(subject);
      dispatch(
        subjectsSlice.actions.deleteSubjectByMaMonHoc(subject.ma_mon_hoc)
      );
      alert(`Xóa Môn Học thành công`);
      setShowModal(false);
    } catch (error) {
      alert(`Xóa Môn Học không thành công!`);
    }
  };
  const onShowModalDelete = (subject: ISubject) => {
    setModalDelete({ open_status: true, subject });
    setShowModal(true);
  };
  const onHideModalDelete = () => {
    setModalDelete({ open_status: false, subject: {} as ISubject });
  };
  const onError = (error: any): void => {
    console.log("ERROR:::", error);
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
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
              {modalDelete.subject.ten_mon_hoc} không?
            </p>
            <div className={cx("action")}>
              <Button
                variant="primary"
                className={cx("btn")}
                onClick={() => handleDeleteStudent(modalDelete.subject)}
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên Môn Học</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên Môn Học"
                {...register("ten_mon_hoc", {
                  required: "Field này là bắt buộc.",
                })}
              />

              {errors.ten_mon_hoc && (
                <Form.Text className="text-danger">
                  {errors.ten_mon_hoc.message}
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
          <h3 className={cx("title")}>Danh sách Môn</h3>
          <div className={cx("content")}>
            <div className={cx("right")}>
              <SearchInput title="Search Môn Học"></SearchInput>
            </div>
          </div>
        </div>
        <Table theadArray={theadarray}>
          {subjectList?.length ? (
            subjectList.map((subject) => (
              <tr className="hover:bg-gray-50" key={subject.ma_mon_hoc}>
                <th className="flex gap-3 px-6 py-4 font-maximum text-gray-900">
                  {subject.ma_mon_hoc}
                </th>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                      {subject.ten_mon_hoc}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button onClick={() => onShowModalDelete(subject)}>
                      <IconTrash width={25} height={25} stroke={2} />
                    </button>
                    <button
                      style={{ marginLeft: "20px" }}
                      onClick={() => onShow(subject)}
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
                Hiện tại không có Môn Học nào.! Vui lòng
                <Link
                  href={`${pathname}/add`}
                  style={{ color: "#fe2c55", fontWeight: "600" }}
                >
                  {" "}
                  thêm Môn Học
                </Link>
              </td>
            </tr>
          )}
        </Table>
      </div>
    </>
  );
};

export default SubjectList;
