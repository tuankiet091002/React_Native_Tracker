import React, { useContext } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context } from "../contexts/AuthContext";

export default function SigninScreen() {
    const { state, signin } = useContext(Context);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
            <AuthForm
                headerText="Sign In to Your Account"
                errorMessage={state.errorMessage}
                onSubmit={signin}
                submitButtonText="Sign In"
            />
            <NavLink
                text="Dont have an account? Sign up instead"
                routeName="Signup"
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});
