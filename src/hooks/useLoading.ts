import { useState } from "react";

type LoadingHookReturnType = {
    isLoading: boolean;
    startLoading: () => void;
    finishLoading: () => void;
};

const useLoading = (): LoadingHookReturnType => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const startLoading = (): void => {
        setIsLoading(true);
    };

    const finishLoading = (): void => {
        setIsLoading(false);
    };

    return { isLoading, startLoading, finishLoading };
};

export default useLoading;
