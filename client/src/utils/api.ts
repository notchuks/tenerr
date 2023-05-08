import { AppDispatch } from "../redux/store";
import { resetState, User } from "../redux/user/userSlice"; // loginStart, loginFailure, loginSuccess,
import { publicRequest } from "./requests";

interface UserDetails {
  username: string;
  password: string;
}

// export const login = async (dispatch: AppDispatch, user: UserDetails) => {
//   dispatch(loginStart());
//   try {
//       const res = await publicRequest.post("/auth/login", user, { withCredentials: true });
//       dispatch(loginSuccess(res.data));
//   } catch (err) {
//       dispatch(loginFailure());
//   }
// };

export const logout = async (dispatch: AppDispatch) => {
  dispatch(resetState());
}