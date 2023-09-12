"use client";
import { FunctionComponent, useEffect, useState } from "react";
import styles from "./AddStudent.module.scss";
import classNames from "classnames/bind";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { IStudent, IMajor, IClass } from "@/type/type";
import { addStudent } from "@/api/request";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { classesSelector, majorsSelector } from "@/redux/selectors";
import studentsSlice from "@/redux/Slice/studentsSlice";
const cx = classNames.bind(styles);
interface AddStudentPageProps {}

const AddStudentPage: FunctionComponent<AddStudentPageProps> = () => {
  const majorList: IMajor[] = useSelector(majorsSelector);
  const classes: IClass[] = useSelector(classesSelector);
  const initState: IStudent = {
    ho: "",
    ten_dem: "",
    ten: "",
    ten_nganh: "",
    gioi_tinh: 0,
    so_dien_thoai: "",
    ten_lop: "",
  };
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(initState);
  const handleChangeClass = (e: any) => {
    console.log(e.target.value);
    const classSelected = classes.filter(
      (classItem) => classItem.ten_lop === e.target.value
    )[0];
    if (classSelected) {
      setValue("ten_nganh", classSelected.ten_nganh);
    }
  };
  const onSubmit = async (values: IStudent) => {
    try {
      await addStudent(values);
      dispatch(studentsSlice.actions.addStudentToList(values));
      alert(`Thêm Sinh Viên thành công`);
      reset(initialValues);
    } catch (error) {
      alert(`Thêm Sinh Viên không thành công!`);
    }
  };

  const onError = (error: any): void => {
    console.log("ERROR:::", error);
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    // reValidateMode: "onChange",
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
    <div className={cx("wrap")}>
      <div className={cx("container")}>
        <Form
          className={cx("container-form")}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <h3 className={cx("form-title")}>Thêm Sinh Viên</h3>
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
              {...register("ten_nganh", { required: "Field này là bắt buộc." })}
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
            <Form.Label>Lớp</Form.Label>
            <Form.Select
              aria-label="Lớp"
              {...register("ten_lop", { required: "Field này là bắt buộc." })}
              onChange={handleChangeClass}
            >
              <option>Open this select menu</option>
              {classes.length
                ? classes.map((lop: IClass) => (
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
            />
            {errors.gioi_tinh && (
              <Form.Text className="text-danger">
                {errors?.gioi_tinh?.message}
              </Form.Text>
            )}
          </Form.Group>
          <div className={cx("action")}>
            <Button variant="primary" className={cx("btn")} type="submit">
              Thêm
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddStudentPage;
