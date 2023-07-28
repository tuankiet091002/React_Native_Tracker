import React from "react";
import { StyleSheet, View } from "react-native";

export default function Spacer({ children }) {
    return <View style={styles.spacer}>{children}</View>;
}

const styles = StyleSheet.create({
    spacer: {
        marginTop: 15,
        marginHorizontal: 10
    },
});
