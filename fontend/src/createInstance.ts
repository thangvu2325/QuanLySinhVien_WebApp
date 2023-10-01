import axios from "axios";
import jwt_decode from "jwt-decode";

const refreshToken = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/auth/refresh",
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    if (
      (err.response && err.response.status === 403) ||
      (err.response && err.response.status === 401)
    ) {
      // Nếu trả về lỗi 403 (Forbidden), chạy hàm logout ở đây
      console.log("Access Forbidden. Logging out...");
      // logout();
      return true;
    } else {
      // Xử lý các trường hợp lỗi khác
      console.log(err);
    }
  }
};

export const createAxios = (user: any, dispatch: any, stateSuccess: any) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken: any = jwt_decode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
