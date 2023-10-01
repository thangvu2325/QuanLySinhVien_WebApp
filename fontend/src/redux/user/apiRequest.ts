import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
export const loginUser = async (
  user: { username: string; password: string },
  dispatch,
  router: AppRouterInstance
) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3001/auth/login", user, {
      withCredentials: true,
    });
    dispatch(loginSuccess(res.data));
    router.push("/");
  } catch (err: any) {
    dispatch(loginFailed(err.response.data.message));
  }
};

export const registerUser = async (
  user: {
    email: string;
    password: string;
    name: string;
  },
  dispatch,
  router: AppRouterInstance
) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:3001/auth/signup", user);
    dispatch(registerSuccess());
    router.push("/account/login");
    return true;
  } catch (err) {
    dispatch(registerFailed());
    return false;
  }
};

export const logOut = async (dispatch, id, router, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post("http://localhost:3001/auth/logout", id, {
      withCredentials: true,
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    router.push("/");
  } catch (err) {
    dispatch(logOutFailed());
  }
};
