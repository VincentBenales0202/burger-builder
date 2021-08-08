import * as actionTypes from "./actionTypes";
import axios from "axios";
// import firebase from "firebase";

// firebase.initializeApp({

// })

const q = "AIzaSyDPj2MzZLy05q1CU4d6kKQMqAie9QDd5u4";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      ...email,
      ...password,
      returnSecureToken: true,
    };
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    axios
      .post(url + q, authData)
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail());
      });
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     var user = userCredential.user;
    //     dispatch(authSuccess(userCredential.data));
    //     // ...
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     dispatch(authFail());
    //     // ..
    //   });
  };
};
