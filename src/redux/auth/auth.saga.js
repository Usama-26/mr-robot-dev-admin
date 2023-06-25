import AuthService from "../../repositories/AuthenticationRepository";
import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  cancel,
  cancelled,
} from "redux-saga/effects";
import Router from "next/router";
import actionTypes from "./auth.actionTypes";
import { toast } from "react-toastify";

import {
  loginSuccess,
  logOutSuccess,
  getUsersSuccess,
  getUserSuccess,
} from "./auth.actions";
import { appName } from "../../repositories/genericRepository";

function* userSignUpSaga(action) {
  try {
    const { results } = yield call(AuthService.userRegister, action.payload);
    action.callback();
    toast.success("Success, Please Verify Your Email", {});
  } catch (error) {
    if (action && action.callback) {
      console.log("Error: ", error);
      action.callback();
      toast.error(error, {});
    }
  } finally {
    yield cancel();
  }
}
function* sendInviteSaga(action) {
  try {
    const { results } = yield call(AuthService.sendInvite, action.payload);
    action.callback();
    toast.success("Invite sent successfully", {});
  } catch (error) {
    if (action && action.callback) {
      console.log("Error: ", error);
      action.callback();
      toast.error(error, {});
    }
  } finally {
    yield cancel();
  }
}

function* loginSaga(action) {
  try {
    let _tokens;
    let _user;
    if (action.payload.tokens) {
      _tokens = action.payload.tokens;
    } else {
      const { user, tokens } = yield call(AuthService.login, action.payload);
      _tokens = {
        accessToken: tokens.access.token,
      };
      _user = user;
    }
    localStorage.setItem("user_accessToken", _tokens.accessToken);
    localStorage.setItem("IsLoggedIN", true);
    yield put(loginSuccess(_user, _tokens));
    yield put(getUserSuccess(_user));
    action.callback("Logged in Successfully", "success");
    Router.push("/admin");
    // toast.success("Logged in Successfully", {});
  } catch (error) {
    if (action && action.callback) {
      action.callback(error, "error");
      // toast.error(error, {});
      // errorNotification("Error", error);
    }
  } finally {
    yield cancel();
  }
}

function* getUserSaga(action) {
  try {
    let _user;
    const { results } = yield call(AuthService.getUser, action.id);
    _user = results;
    yield put(getUserSuccess(_user));
  } catch (error) {
    // toast.error(error, {});
  } finally {
    yield cancel();
  }
}

function* logOutSaga(action) {
  try {
    localStorage.removeItem("user_accessToken");
    localStorage.removeItem("IsLoggedIN");
    toast.success("Logout Successfully", {});
    yield put(logOutSuccess());
    action.callback();
    Router.push("/auth/login");
  } catch (err) {
    console.log(err);
    toast.error(err, {});
  }
}

function* forgotpasswordSaga({ payload, callback }) {
  try {
    const { results } = yield call(AuthService.forgetPassword, payload);
    toast.success("Please check your email to reset password", {});
    if (callback) callback();
  } catch (error) {
    toast.error(error, {});
    if (callback) callback(true);
  } finally {
    yield cancel();
  }
}

function* resetPasswordSaga({ payload, callback }) {
  try {
    // const token = Router.query.token;
    const { results } = yield call(AuthService.resetPassword, payload);
    toast.success("Password changed successfully", {});
    if (callback) callback();
    Router.replace("/auth/login");
  } catch (error) {
    toast.error(error, {});
    if (callback) callback();
  } finally {
    yield cancel();
  }
}
function* verifyEmailSaga({ payload, callback }) {
  try {
    yield call(AuthService.verifyEmail, payload);
    // successNotification(
    //   "Success",
    //   "Your Email has been verified successfully!"
    // );
    if (callback) callback();
    Router.replace("/login");
  } catch (error) {
    errorNotification("Failed", error);
    if (callback) callback(true);
  } finally {
    yield cancel();
  }
}
function* contactUsSaga(action) {
  try {
    yield call(AuthService.contactUs, action.payload);
    // successNotification("Success", "Your message has been sent successfully!");
    action.callback();
  } catch (error) {
    errorNotification("Failed", error);
    action.callback();
  } finally {
    yield cancel();
  }
}

function* getUsersSaga(action) {
  try {
    let _user;
    const { results } = yield call(
      AuthService.getUsers,
      action.page,
      action.role,
      action.status,
      action.value,
      action.status2,
      action.value2
    );
    _user = results;
    yield put(getUsersSuccess(_user));
  } catch (error) {
    action.callback();
    toast.error(error, {});
  } finally {
    yield cancel();
  }
}

function* updateUserSaga(action) {
  try {
    const { results } = yield call(
      AuthService.userUpdate,
      action.payload,
      action.id
    );
    action.callback();
    toast.success("User updated successfully", {});
  } catch (error) {
    if (action && action.callback) {
      console.log("Error: ", error);
      action.callback();
      toast.error(error, {});
    }
  } finally {
    yield cancel();
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
  yield all([takeEvery(actionTypes.SEND_INVITE, sendInviteSaga)]);
  yield all([takeEvery(actionTypes.GET_USERS, getUsersSaga)]);
  yield all([takeEvery(actionTypes.UPDATE_USER, updateUserSaga)]);
  yield all([takeEvery(actionTypes.USER_SIGNUP_REQUEST, userSignUpSaga)]);
  yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
  yield all([
    takeLatest(actionTypes.FORGOTPASSWORD_REQUEST, forgotpasswordSaga),
  ]);
  yield all([takeLatest(actionTypes.RESETPASSWORD_REQUEST, resetPasswordSaga)]);
  yield all([takeLatest(actionTypes.VERIFY_EMAIL, verifyEmailSaga)]);
  yield all([takeEvery(actionTypes.CONTACT_US, contactUsSaga)]);
  yield all([takeEvery(actionTypes.GET_USER, getUserSaga)]);
}
