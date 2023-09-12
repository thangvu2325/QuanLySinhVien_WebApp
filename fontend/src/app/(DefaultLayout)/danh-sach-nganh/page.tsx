"use client";
import { FunctionComponent, useState, useEffect } from "react";
import styles from "./MajorList.module.scss";
import classname from "classnames/bind";
import Table from "@/components/Table";
import SearchInput from "@/components/SearchInput/SearchInput";
import Dropdown from "@/components/Dropdown";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { deleteMajorByMaNganh, getAllMajor, updatedMajor } from "@/api/request";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IMajor } from "@/type/type";
import ModalComponent from "@/components/Modal/Modal";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { majorsSelector } from "@/redux/selectors";
import majorSlice from "@/redux/Slice/majorSlice";
import { useForm } from "react-hook-form";

const cx = classname.bind(styles);

interface MajorListProps {}
const theadArray = ["Mã Ngành", "Tên Ngành"];
const MajorList: FunctionComponent<MajorListProps> = () => {
  const majorList = useSelector(majorsSelector);
  const initState: IMajor = {
    ten_nganh: "",
  };
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<{
    open_status: boolean;
    major: IMajor;
  }>({ open_status: false, major: {} as IMajor });
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(initState);
  const onSubmit = async (values: IMajor) => {
    try {
      await updatedMajor(values);
      alert(`Sửa ngành thành công`);
      dispatch(majorSlice.actions.editMajorInList(values));
    } catch (error) {
      alert(`Sửa ngành không thành công!`);
    }
  };

  const onError = (error: any): void => {
    console.log("ERROR:::", error);
  };
  const onHide = () => {
    setShowModal(false);
  };
  const onShow = (major: IMajor) => {
    if (major) {
      console.log(major);
      reset(major);
    }

    setShowModal(true);
  };
  const onShowModalDelete = (major: IMajor) => {
    setModalDelete({ open_status: true, major });
    setShowModal(true);
  };
  const onHideModalDelete = () => {
    setModalDelete({ open_status: false, major: {} as IMajor });
  };
  const handleDeleteMajor = async (major: IMajor) => {
    try {
      await deleteMajorByMaNganh(major);
      dispatch(majorSlice.actions.deleteMajorByMaNganh(major.ma_nganh));
      alert(`Xóa Ngành thành công`);
      setShowModal(false);
    } catch (error) {
      alert(`Xóa Ngành không thành công!`);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    // reValidateMode: "onChange",
    defaultValues: initialValues,
  });

  const pathname = usePathname();
  return (
    <>
      <ModalComponent
        onHide={onHide}
        title={modalDelete.open_status ? "Xóa Ngành" : "Sửa Ngành"}
        show={showModal}
        onHideModalDelete={onHideModalDelete}
      >
        {modalDelete.open_status ? (
          <>
            <p>
              Bạn có chắc muốn xóa Lớp: {modalDelete.major.ten_nganh} không?
            </p>
            <div className={cx("action")}>
              <Button
                variant="primary"
                className={cx("btn")}
                onClick={() => handleDeleteMajor(modalDelete.major)}
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
              <Form.Label>Nhập tên ngành</Form.Label>
              <Form.Control
                type="text"
                placeholder="tên ngành"
                {...register("ten_nganh", {
                  required: "Field này là bắt buộc.",
                })}
              />
              {errors.ten_nganh && (
                <Form.Text className="text-danger">
                  {errors.ten_nganh.message}
                </Form.Text>
              )}
            </Form.Group>

            <div className={cx("action")}>
              <Button variant="primary" className={cx("btn")} type="submit">
                Sửa
              </Button>
            </div>
          </Form>
        )}
      </ModalComponent>
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
            majorList.map((major) => (
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
                    <button onClick={() => onShowModalDelete(major)}>
                      <IconTrash width={25} height={25} stroke={2} />
                    </button>
                    <button
                      style={{ marginLeft: "20px" }}
                      onClick={() => onShow(major)}
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
    </>
  );
};

export default MajorList;
