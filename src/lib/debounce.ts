const debounce = (callback: (value: string) => Promise<void>, delay: number) => {
    let timerId: number | undefined;
    return (value: string) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(value);
        }, delay);
    }
}

export default debounce;