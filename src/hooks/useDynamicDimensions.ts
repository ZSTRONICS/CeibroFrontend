import { useEffect, useRef, useState } from 'react';

interface UseDynamicDimensionsProps {
    debounceTime?: number;
}

export interface DynamicDimensions {
    width: number;
    height: number;
}

const useDynamicDimensions = ({
    debounceTime = 100,
}: UseDynamicDimensionsProps = {}) => {
    const [dimensions, setDimensions] = useState<DynamicDimensions>({
        width: 0,
        height: 0,
    });

    const containerRef = useRef<HTMLDivElement>(null);

    const updateDimensions = () => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            setDimensions({ width, height });
        }
    };
    useEffect(() => {
        const debouncedUpdate = debounce(updateDimensions, debounceTime);
        // Initial update
        updateDimensions();

        // Event listeners
        window.addEventListener('resize', debouncedUpdate);
        const observer = new IntersectionObserver(debouncedUpdate);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        // Cleanup
        return () => {
            window.removeEventListener('resize', debouncedUpdate);
            observer.disconnect();
        };
    }, [dimensions.width, dimensions.height, containerRef]);

    return { containerRef, dimensions, updateDimensions };
};


const debounce = <F extends (...args: any[]) => void>(func: F, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<F>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

export default useDynamicDimensions;
