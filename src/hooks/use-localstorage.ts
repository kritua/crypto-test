
export function useLocalStorage(key: string) {
    const getStorage = () => {
        const item = localStorage.getItem(key);

        try {
            return item ? JSON.parse(item) : {};
        } catch(e) {
            console.error('The bad item in a local storage', { item, e });
        }

        return {};
    };

    const setStorage = (value: unknown) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    return { getStorage, setStorage };
}
