import { useEffect, useRef, useState } from 'react';

interface UseDynamicDimensionsProps {
    debounceTime?: number;
}

interface DynamicDimensions {
    width: number;
    height: number;
}

const useDynamicDimensions = ({
    debounceTime = 300,
}: UseDynamicDimensionsProps = {}) => {
    const [dimensions, setDimensions] = useState<DynamicDimensions>({
        width: 0,
        height: 0,
    });

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };

        const debouncedUpdate = debounce(updateDimensions, debounceTime);

        // Initial update
        updateDimensions();

        // Event listeners
        window.addEventListener('resize', debouncedUpdate);

        // Cleanup
        return () => {
            window.removeEventListener('resize', debouncedUpdate);
        };
    }, [debounceTime]);

    return { containerRef, dimensions };
};

/**
 * Creates a debounced function that delays invoking 'func' until
 *  after 'delay' milliseconds have elapsed since the last time the debounced function was invoked.
 *
 * @param {() => void} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @return {() => void} A debounced version of the original function.
 */
const debounce = (func: () => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;

    return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
    };
};

export default useDynamicDimensions;
