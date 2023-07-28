import React, { useContext, useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Context as AuthContext } from "../contexts/AuthContext";

import Spacer from "./Spacer";

export default function NavLink({ text, routeName }) {
    const navigation = useNavigation();
    const { clearErrorMessage } = useContext(AuthContext);

    useEffect(() => {
        const unsubscribe = navigation.addListener("blur", () => {
            clearErrorMessage()
        });
        return unsubscribe
    }, []);

    return (
        <Pressable
            onPress={() => navigation.navigate(routeName)}
            style={({ pressed }) => pressed && { opacity: 0.5 }}
        >
            <Spacer>
                <Text style={styles.link}>{text}</Text>
            </Spacer>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    link: {
        color: "blue",
    },
});
