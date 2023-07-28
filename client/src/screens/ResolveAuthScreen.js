import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";

import { Context as AuthContext } from "../contexts/AuthContext";

export default function ResolveAuthScreen() {
    const { tryLocalSignin } = useContext(AuthContext);
    useEffect(() => {
        tryLocalSignin();
    }, []);

    return (
        <View>
            <Text>ResolveAuthScreen</Text>
        </View>
    );
}
