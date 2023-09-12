"use client";
import { FunctionComponent, useEffect, useState } from "react";
import styles from "./MajorList.module.scss";
import classNames from "classnames/bind";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { IMajor } from "@/type/type";
import { addClass, addMajor, getAllMajor } from "@/api/request";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import majorSlice from "@/redux/Slice/majorSlice";

const cx = classNames.bind(styles);
interface MajorListPageProps {}

const MajorListPage: FunctionComponent<MajorListPageProps> = () => {
  const initState: IMajor = {
    ten_nganh: "",
  };
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(initState);
  const onSubmit = async (values: IMajor) => {
    try {
      await addMajor(values);
      alert(`Thêm ngành thành công`);
      dispatch(majorSlice.actions.addMajor(values));
    } catch (error) {
      alert(`Thêm ngành không thành công!`);
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
          <h3 className={cx("form-title")}>Thêm Ngành</h3>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nhập tên ngành</Form.Label>
            <Form.Control
              type="text"
              placeholder="Công Nghệ Thông Tin"
              {...register("ten_nganh", { required: "Field này là bắt buộc." })}
            />
            {errors.ten_nganh && (
              <Form.Text className="text-danger">
                {errors.ten_nganh.message}
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

export default MajorListPage;
