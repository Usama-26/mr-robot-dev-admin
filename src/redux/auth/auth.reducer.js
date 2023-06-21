import actionTypes from "./auth.actionTypes";

export const initState = {
  isLoggedIn: false,
  user: null,
  token: null,
  users: [],
  userbyID: null,
};
function AuthReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: true, user: action.user, token: action.token },
      };
    case actionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: true, user: action.results },
      };
    case actionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        ...{ users: action.results },
      };
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        ...{ userbyID: action.results },
      };
    case actionTypes.LOGOUT_SUCCESS:
      return initState;
    default:
      return state;
  }
}

export default AuthReducer;
