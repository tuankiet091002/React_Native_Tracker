import { useEffect, useState } from "react";
import {
    Accuracy,
    requestForegroundPermissionsAsync,
    watchPositionAsync,
} from "expo-location";

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);

    useEffect(() => {
        let subscriber;

        const startWatching = async () => {
            try {
                const { granted } = await requestForegroundPermissionsAsync();
                if (!granted) {
                    throw new Error("Location permission not granted");
                }
                const sub = await watchPositionAsync(
                    {
                        accuracy: Accuracy.BestForNavigation,
                        timeInterval: 1000,
                        distanceInterval: 10,
                    },
                    callback
                );
                subscriber = sub;
            } catch (e) {
                setErr(e);
            }
        };

        if (shouldTrack) {
            startWatching();
        }

        return () => {
            if (subscriber) subscriber.remove();
        };
    }, [shouldTrack, callback]);

    return [err];
};
