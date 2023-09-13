"use client";
import { FunctionComponent, useState, useEffect } from "react";
import styles from "./ClassList.module.scss";
import classname from "classnames/bind";
import Form from "react-bootstrap/Form";
import Table from "@/components/Table";
import SearchInput from "@/components/SearchInput/SearchInput";
import Dropdown from "@/components/Dropdown";
import { IClass, IMajor } from "@/type/type";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { deleteClass, updateClass } from "@/api/request";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { classesSelector, majorsSelector } from "@/redux/selectors";
import { useForm } from "react-hook-form";
import ModalComponent from "@/components/Modal/Modal";
import { Button } from "react-bootstrap";
import classesSlice from "@/redux/Slice/classesSlice";

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
  const classList = convertDateStringsToDateObjects(
    useSelector(classesSelector)
  );
  const majorList = useSelector(majorsSelector);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<{
    open_status: boolean;
    lop: IClass;
  }>({ open_status: false, lop: {} as IClass });
  const dispatch = useDispatch();
  const initState: IClass = {
    ten_lop: "",
    khoa: 0,
    ten_nganh: "",
    ngay_bat_dau: new Date(),
  };
  const onHide = () => {
    setShowModal(false);
  };
  const onShow = (lop: IClass) => {
    if (lop) {
      console.log(lop);
      reset(lop);
    }

    setShowModal(true);
  };
  const onShowModalDelete = (lop: IClass) => {
    setModalDelete({ open_status: true, lop });
    setShowModal(true);
  };
  const onHideModalDelete = () => {
    setModalDelete({ open_status: false, lop: {} as IClass });
  };
  const [initialValues, setInitialValues] = useState(initState);
  const onSubmit = async (values: IClass) => {
    try {
      await updateClass(values);
      dispatch(classesSlice.actions.editClassInList(values));
      alert(`sửa lớp thành công`);
    } catch (error) {
      alert(`sửa lớp không thành công!`);
    }
  };

  const onError = (error: any): void => {
    console.log("ERROR:::", error);
  };
  const handleDeleteClass = async (lop: IClass) => {
    try {
      await deleteClass(lop);
      dispatch(classesSlice.actions.deleteClassByMaLop(lop.ma_lop));
      alert(`Xóa Lớp thành công`);
      setShowModal(false);
    } catch (error) {
      alert(`Xóa Lớp không thành công!`);
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
  console.log(classList);
  const pathname = usePathname();
  return (
    <>
      <ModalComponent
        onHide={onHide}
        title={modalDelete.open_status ? "Xóa Lớp" : "Sửa Lớp"}
        show={showModal}
        onHideModalDelete={onHideModalDelete}
      >
        {modalDelete.open_status ? (
          <>
            <p>Bạn có chắc muốn xóa Lớp: {modalDelete.lop.ten_lop} không?</p>
            <div className={cx("action")}>
              <Button
                variant="primary"
                className={cx("btn")}
                onClick={() => handleDeleteClass(modalDelete.lop)}
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
              <Form.Label>Nhập tên lớp</Form.Label>
              <Form.Control
                type="text"
                placeholder="A22"
                {...register("ten_lop", { required: "Field này là bắt buộc." })}
              />
              {errors.ten_lop && (
                <Form.Text className="text-danger">
                  {errors.ten_lop.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Khóa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Niên Khóa"
                {...register("khoa", { required: "Field này là bắt buộc." })}
              />

              {errors.khoa && (
                <Form.Text className="text-danger">
                  {errors.khoa.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên ngành</Form.Label>
              <Form.Select
                aria-label="Tên ngành"
                {...register("ten_nganh", {
                  required: "Field này là bắt buộc.",
                })}
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
              <Form.Label>Ngày bắt đầu</Form.Label>
              <Form.Control
                type="date"
                {...register("ngay_bat_dau", {
                  required: "Field này là bắt buộc.",
                })}
              />
              {errors.ngay_bat_dau && (
                <Form.Text className="text-danger">
                  {errors.ngay_bat_dau.message}
                </Form.Text>
              )}
            </Form.Group>
            <div className={cx("action")}>
              <Button variant="primary" className={cx("btn")} type="submit">
                Thêm
              </Button>
            </div>
          </Form>
        )}
      </ModalComponent>
      <div className={cx("wrap")}>
        <div className={cx("top")}>
          <h3 className={cx("title")}>Danh sách Lớp</h3>
          <div className={cx("content")}>
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
                    <button onClick={() => onShowModalDelete(lop)}>
                      <IconTrash width={25} height={25} stroke={2} />
                    </button>
                    <button
                      style={{ marginLeft: "20px" }}
                      onClick={() => onShow(lop)}
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
    </>
  );
};

export default ClassList;
