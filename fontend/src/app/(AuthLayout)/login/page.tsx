"use client";
import { FunctionComponent, useState } from "react";
import styles from "./LoginPage.module.scss";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/user/apiRequest";
import { useDispatch } from "react-redux";
const cx = classNames.bind(styles);
interface LoginPageProps {}
type LoginForm = {
  username: string;
  password: string;
};

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const initState: LoginForm = {
    username: "",
    password: "",
  };
  const [initialValues, setInitialValues] = useState(initState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    // reValidateMode: "onChange",
    defaultValues: initialValues,
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const onSubmit = async (values: LoginForm) => {
    console.log(values);
    try {
      await loginUser(values, dispatch, router);
      alert("Đăng nhập thành công!!");
    } catch (error) {
      console.log(error);
    }
  };
  const onError = (error: any): void => {
    console.log("ERROR:::", error);
  };

  return (
    <div className={cx("wrap")}>
      <div className={cx("container")}>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className={cx("form-title")}>Sign in to your account</div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tài Khoản</Form.Label>
              <Form.Control
                type="text"
                placeholder="0"
                style={{ fontSize: "1.6rem" }}
                {...register("username", {
                  required: "Field này là bắt buộc.",
                })}
              />
              {errors.username ? (
                <Form.Text className="text-danger">
                  {errors.username?.message}
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="text"
                placeholder="0"
                style={{ fontSize: "1.6rem" }}
                {...register("password", {
                  required: "Field này là bắt buộc.",
                })}
              />
              {errors.password && (
                <Form.Text className="text-danger">
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>
          </Form.Group>
          <div className={cx("action")}>
            <Button type="submit">Đăng nhập</Button>
          </div>
          <p className={cx("signup-link")}>
            No account?
            <Link href="/signup">Sign up</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
