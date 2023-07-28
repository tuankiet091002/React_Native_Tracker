import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const instance = axios.create({
    baseURL:
        "https://f976-2001-ee0-51a5-9490-4a9-2edb-ccf5-2a69.ngrok-free.app",
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

export default instance;
