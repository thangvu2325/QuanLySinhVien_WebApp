"use client";
import { FunctionComponent, useEffect, useState } from "react";
import styles from "./ScoreList.module.scss";
import classname from "classnames/bind";
import Table from "@/components/Table";
import SearchInput from "@/components/SearchInput/SearchInput";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import jsPDF from "jspdf";
import "jspdf/dist/polyfills.es.js";
import autoTable from "jspdf-autotable";

import ModalComponent from "@/components/Modal/Modal";
import { Button, Form, FormGroup } from "react-bootstrap";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { IDiem, ISubject } from "@/type/type";
import {
  AddSubjectOfStudent,
  deleteDiemOfStudent,
  getScoreListForStudent,
  updateDiemForStudent,
} from "@/api/request";
import { useSelector } from "react-redux";
import { subjectsSelector } from "@/redux/selectors";
const cx = classname.bind(styles);
interface ScoreListProps {
  params: { mssvSlug: string };
}
const theadArray = [
  "Mã Điểm",
  "Mã Môn Học",
  "Tên Môn Học",
  "Điểm Quá Trình",
  "Điểm Thi",
  "Điểm Tổng Kết",
];
const ScoreList: FunctionComponent<ScoreListProps> = ({
  params: { mssvSlug },
}) => {
  const [scoreTable, setScoreTable] = useState<IDiem[]>([]);
  const subjectList = useSelector(subjectsSelector);
  const initState: IDiem = {
    mssv: mssvSlug,
    ma_mon_hoc: 0,
  };
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<{
    open_status: string;
    score: IDiem;
  }>({ open_status: "default", score: {} as IDiem });
  const [initialValues, setInitialValues] = useState(initState);
  const onSubmit = async (values: IDiem) => {
    console.log(values);
    try {
      await AddSubjectOfStudent(values);
      alert(`Thêm môn học thành công`);
    } catch (error) {
      alert(`Thêm môn học không thành công!`);
    }
  };
  const handleEditScore = async (values: IDiem) => {
    try {
      await updateDiemForStudent(values);
      alert(`Sửa điểm thành công`);
    } catch (error) {
      alert(`Sửa điểm không thành công!`);
    }
  };
  const handlePrintPDF = () => {
    const doc = new jsPDF();

    // Sử dụng font mặc định của jsPDF (Helvetica)
    // Bạn cũng có thể thay đổi thành một font hỗ trợ khác
    doc.setFont("Times", "Roman");
    doc.text("Danh sách Điểm", 10, 10);
    console.log(doc.getFontList());
    // Tạo bảng sử dụng jspdf-autotable
    autoTable(doc, {
      head: [theadArray], // Đầu bảng
      body: scoreTable.map((score) => [
        score.ma_diem,
        score.ma_mon_hoc,
        score.ten_mon_hoc,
        score.diem_qua_trinh || "0",
        score.diem_thi || "0",
        (((score.diem_qua_trinh || 0) + (score.diem_thi || 0)) / 2).toFixed(2),
      ]), // Dữ liệu trong bảng
    });

    doc.save("bang_diem_student.pdf");
  };

  const onError = (error: any): void => {
    console.log("ERROR:::", error);
  };
  const onHide = () => {
    setShowModal(false);
  };
  const onShowModalDelete = (score: IDiem) => {
    setModalDelete({ open_status: "delete", score });
    setShowModal(true);
  };
  const onShowModalEdit = (score: IDiem) => {
    setModalDelete({ open_status: "edit", score });
    if (score) {
      console.log(score);
      reset(score);
    }
    setShowModal(true);
  };
  const onShowModalAdd = () => {
    setModalDelete({ open_status: "add", score: {} as IDiem });
    setShowModal(true);
  };
  const onHideModalDelete = () => {
    setModalDelete({ open_status: "default", score: {} as IDiem });
  };

  const handleDeleteMajor = async (score: IDiem) => {
    try {
      await deleteDiemOfStudent(score);
      alert(`Xóa Điểm thành công`);
      setShowModal(false);
    } catch (error) {
      alert(`Xóa Điểm không thành công!`);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    // reValidateMode: "onChange",
    defaultValues: initialValues,
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await getScoreListForStudent(mssvSlug);
      if (data.length) {
        setScoreTable(data);
      }
    };
    fetchData();
  }, [mssvSlug]);
  const pathname = usePathname();
  return (
    <>
      <ModalComponent
        onHide={onHide}
        title={
          modalDelete.open_status === "delete"
            ? "Xóa Điểm"
            : modalDelete.open_status === "fix"
            ? "Sửa Điểm"
            : "Thêm Môn"
        }
        show={showModal}
        onHideModalDelete={onHideModalDelete}
        centered={true}
      >
        {modalDelete.open_status === "delete" ? (
          <>
            <p>
              Bạn có chắc muốn xóa môn {modalDelete.score.ten_mon_hoc} này
              không?
            </p>
            <div className={cx("action")}>
              <Button
                variant="primary"
                className={cx("btn")}
                onClick={() => handleDeleteMajor(modalDelete.score)}
              >
                Xóa
              </Button>
            </div>
          </>
        ) : modalDelete.open_status === "edit" ? (
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormGroup
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Điểm quá trình</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0"
                  style={{ fontSize: "2rem", width: "60px" }}
                  {...register("diem_qua_trinh", {
                    required: "Field này là bắt buộc.",
                  })}
                />
                {errors.diem_qua_trinh && (
                  <Form.Text className="text-danger">
                    {errors.diem_qua_trinh.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Điểm Thi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0"
                  style={{ fontSize: "2rem", width: "60px" }}
                  {...register("diem_thi", {
                    required: "Field này là bắt buộc.",
                  })}
                />
                {errors.diem_thi && (
                  <Form.Text className="text-danger">
                    {errors.diem_thi.message}
                  </Form.Text>
                )}
              </Form.Group>
            </FormGroup>

            <div className={cx("action")}>
              <Button
                variant="primary"
                className={cx("btn")}
                onClick={() => handleEditScore(getValues())}
              >
                Sửa
              </Button>
            </div>
          </Form>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormGroup
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mã Số Sinh Viên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0"
                  style={{ fontSize: "1.6rem" }}
                  disabled
                  {...register("mssv", {
                    required: "Field này là bắt buộc.",
                  })}
                />
                {errors.mssv && (
                  <Form.Text className="text-danger">
                    {errors.mssv.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tên Môn Học</Form.Label>
                <Form.Select
                  aria-label="Tên ngành"
                  style={{ fontSize: "1.6rem" }}
                  {...register("ma_mon_hoc", {
                    required: "Field này là bắt buộc.",
                  })}
                >
                  <option>Open this select menu</option>
                  {subjectList.length
                    ? subjectList.map((subject: ISubject) => (
                        <option
                          key={subject.ma_mon_hoc}
                          value={subject.ma_mon_hoc}
                        >
                          {subject.ten_mon_hoc}
                        </option>
                      ))
                    : ""}
                </Form.Select>
                {errors.ma_mon_hoc && (
                  <Form.Text className="text-danger">
                    {errors.ma_mon_hoc.message}
                  </Form.Text>
                )}
              </Form.Group>
            </FormGroup>

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
          <h3 className={cx("title")}>Danh sách Điểm</h3>
          <div className={cx("content")}>
            <div className={cx("right")}>
              <div className={cx("print-button-container")}>
                <button onClick={handlePrintPDF} className={cx("print-button")}>
                  In PDF
                </button>
              </div>
              <SearchInput title="Search Môn"></SearchInput>
            </div>
          </div>
        </div>

        <Table theadArray={theadArray}>
          {scoreTable.length ? (
            scoreTable.map((score) => (
              <tr className="hover:bg-gray-50" key={score.ma_diem}>
                <th className="flex gap-3 px-6 py-4 font-maximum text-gray-900">
                  {score.ma_diem}
                </th>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                      {score.ma_mon_hoc}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                      {score.ten_mon_hoc}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                      {!!score.diem_qua_trinh ? score.diem_qua_trinh : 0}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                      {!!score.diem_thi ? score.diem_thi : 0}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                      {Number(
                        Number(
                          !!score.diem_qua_trinh ? score.diem_qua_trinh : 0
                        ) + Number(!!score.diem_thi ? score.diem_thi : 0)
                      ) / 2}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button onClick={() => onShowModalDelete(score)}>
                      <IconTrash width={25} height={25} stroke={2} />
                    </button>
                    <button
                      style={{ marginLeft: "20px" }}
                      onClick={() => {
                        onShowModalEdit(score);
                      }}
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
                colSpan={theadArray.length + 1}
                style={{ padding: "16px 2px", textAlign: "center" }}
              >
                Hiện tại không có môn học nào.! Vui lòng
                <Link
                  href={`${pathname}/add`}
                  style={{ color: "#fe2c55", fontWeight: "600" }}
                >
                  {" "}
                  thêm môn học
                </Link>
              </td>
            </tr>
          )}
          <tr className={cx("announce")}>
            <td
              className={cx("annouce-content")}
              colSpan={theadArray.length + 1}
              style={{
                textAlign: "center",
                padding: "4px 2px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  fontWeight: "600",
                  display: "block",
                  textAlign: "center",
                }}
                onClick={onShowModalAdd}
              >
                <IconPlus
                  width={30}
                  height={30}
                  stroke={2}
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
              </button>
            </td>
          </tr>
        </Table>
      </div>
    </>
  );
};

export default ScoreList;
