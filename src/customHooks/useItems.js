import { useState } from "react";
function useItems() {
    const [values, setValues] = useState([]);

    const onChangeValue = (res) => {
        let map = new Map();
        res.forEach((el) => {
            if (!map.has(el.id)) {
                map.set(el.id, el);
            }
        });
        setValues(Array.from(map.values()));
    };
    return [values, onChangeValue];
}
export { useItems };
