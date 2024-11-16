import { useF, useS } from "./useReactHooks";

export const useGetUrl = () => {
    const [fullUrl, setFullUrl] = useS("");

    useF(() => {
        if (typeof window !== "undefined") {
            setFullUrl(window.location.href);
        }
    }, []);

    return fullUrl;
};