import userReducer, {
  UserState,
  User,
  loginStart,
  loginSuccess, 
  loginFailure,
  resetState
} from "./userSlice";

const user: User = {
  username: "primero",
  email: "primero@gmail.com",
  country: "usa",
  isSeller: false
}

describe("user reducer", () => {

  const initialState: UserState = {
    currentUser: user,
    isFetching: false,
    error: false
  };

  it("should handle initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual({
      currentUser: null,
      isFetching: false,
      error: false,
    })
  })
});