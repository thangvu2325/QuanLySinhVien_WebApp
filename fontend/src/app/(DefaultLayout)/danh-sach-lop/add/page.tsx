"use client";
import { FunctionComponent, useEffect, useState } from "react";
import styles from "./AddClassPage.module.scss";
import classNames from "classnames/bind";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { IClass, IMajor } from "@/type/type";
import { addClass, getAllMajor } from "@/api/request";
import { useForm } from "react-hook-form";

const cx = classNames.bind(styles);
interface AddClassPageProps {}

const AddClassPage: FunctionComponent<AddClassPageProps> = () => {
  const [majorList, setMajorList] = useState<IMajor[]>([]);
  const initState: IClass = {
    ten_lop: "",
    khoa: 0,
    ten_nganh: "",
    ngay_bat_dau: new Date(),
  };
  const [initialValues, setInitialValues] = useState(initState);
  const onSubmit = async (values: IClass) => {
    try {
      await addClass(values);
      alert(`Thêm lớp thành công`);
    } catch (error) {
      alert(`Thêm lớp không thành công!`);
    }
  };

  const onError = (error: any): void => {
    console.log("ERROR:::", error);
  };

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    // reValidateMode: "onChange",
    defaultValues: initialValues,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMajor();
        setMajorList(data);
      } catch (error) {}
    };
    fetchData();
  }, []);
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
          <h3 className={cx("form-title")}>Thêm Lớp</h3>
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
              placeholder="20"
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
              {...register("ten_nganh", { required: "Field này là bắt buộc." })}
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
      </div>
    </div>
  );
};

export default AddClassPage;
