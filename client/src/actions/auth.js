import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (form, navigate) => async () => {
  try {
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (form, navigate) => async () => {
  try {
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
