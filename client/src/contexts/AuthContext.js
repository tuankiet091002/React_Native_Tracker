import AsyncStorage from "@react-native-async-storage/async-storage";

import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
    switch (action.type) {
        case "add_error":
            return { ...state, errorMessage: action.payload };
        case "signin":
            return { token: action.payload, error: "" };
        case "clear_error_message":
            return { ...state, errorMessage: "" };
        case "signout":
            return { token: null, errorMessage: "" };
        default:
            return state;
    }
};

const tryLocalSignin = (dispatch) => async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        dispatch({ type: "signin", payload: token });
        navigate("MainFlow", {
            screen: "TrackListFlow",
            params: { screen: "TrackList" },
        });
    } else {
        navigate("LoginFlow", { screen: "Signin" });
    }
};

const signup =
    (dispatch) =>
    async ({ email, password }) => {
        try {
            const response = await trackerApi.post("/signup", {
                email,
                password,
            });

            console.log(response.data);
            await AsyncStorage.setItem("token", response.data.token);
            dispatch({ type: "signin", payload: response.data.token });
            navigate("MainFlow", {
                screen: "TrackListFlow",
                params: { screen: "TrackList" },
            });
        } catch (err) {
            dispatch({
                type: "add_error",
                payload: "Something went wrong with sign up",
            });
        }
    };

const signin =
    (dispatch) =>
    async ({ email, password }) => {
        try {
            const response = await trackerApi.post("/signin", {
                email,
                password,
            });
            await AsyncStorage.setItem("token", response.data.token);
            dispatch({ type: "signup", payload: response.data.token });
            navigate("MainFlow", {
                screen: "TrackListFlow",
                params: { screen: "TrackList" },
            });
        } catch (err) {
            dispatch({
                type: "add_error",
                payload: "Something went wrong with sign in",
            });
        }
    };

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("LoginFlow", { screen: "Signin" });
};

const clearErrorMessage = (dispatch) => async () => {
    dispatch({ type: "clear_error_message" });
};

export const { Context, Provider } = createDataContext(
    authReducer,
    { tryLocalSignin, signup, signin, signout, clearErrorMessage },
    { token: null, errorMessage: "" }
);
