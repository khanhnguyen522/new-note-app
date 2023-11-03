import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutFailed,
  logoutSuccess,
  editSuccess,
  editFailed,
  editStart,
} from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/user/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/mynotes");
  } catch (err) {
    dispatch(loginFailed());
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("/v1/user/register", user);
    dispatch(registerSuccess(res.data));
    dispatch(loginSuccess(res.data));
    navigate("/mynotes");
  } catch (err) {
    dispatch(registerFailed());
  }
};
export const logout = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post("/v1/user/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate("/");
  } catch (err) {
    dispatch(logoutFailed());
  }
};
export const editUser = async (
  dispatch,
  user,
  navigate,
  accessToken,
  axiosJWT
) => {
  dispatch(editStart());
  try {
    const res = await axiosJWT.post("/v1/user/profile", user, {
      headers: { token: `Bearer ${accessToken}` },
    });
    console.log(res);
    dispatch(editSuccess(res.data));
    dispatch(loginSuccess(res.data));
    navigate("/profile");
  } catch (err) {
    console.log(err);
    dispatch(editFailed());
  }
};
