"use client";
import { FunctionComponent, useEffect, useState } from "react";
import styles from "./AddSubject.module.scss";
import classNames from "classnames/bind";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { ISubject } from "@/type/type";
import { addSubject } from "@/api/request";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import subjectsSlice from "@/redux/Slice/subjectsSlice";
const cx = classNames.bind(styles);
interface AddSubjectPageProps {}

const AddSubjectPage: FunctionComponent<AddSubjectPageProps> = () => {
  const initState: ISubject = {
    ten_mon_hoc: "",
  };
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(initState);
  const onSubmit = async (values: ISubject) => {
    try {
      await addSubject(values);
      dispatch(subjectsSlice.actions.addSubjectToList(values));
      alert(`Thêm Môn học thành công`);
      reset(initialValues);
    } catch (error) {
      alert(`Thêm Môn học không thành công!`);
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
          <h3 className={cx("form-title")}>Thêm Môn Học</h3>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Tên Môn Học</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập Tên Môn Học"
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
              Thêm
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddSubjectPage;
