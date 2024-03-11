import React, { useState } from "react";
import styles from "./Filter.module.css";
import Select from "react-select";
import classNames from "classnames";
import "./index.css";

var CryptoJS = require("crypto-js");
var date_fns = require("date-fns");

const Filter = ({ getIdsList, getItemsList }) => {
    const options = [
        { value: "brand", label: "Бренд" },
        { value: "product", label: "Продукт" },
        { value: "price", label: "Цена" },
    ];
    const [property, setProperty] = useState("");
    const [value, setValue] = useState("");

    const [isValidSelectData, setValidSelectData] = useState(true);
    const [isValidInputData, setValidInputData] = useState(true);
    const onKeyUp = (e) => {
        if (e.code === "Enter") {
            filter();
        }
    };

    const filter = () => {
        if (property === "" || value === "") {
            alert("Не все поля заполнены!");
            if (property === "") {
                setValidSelectData(false);
            }
            if (value === "") {
                setValidInputData(false);
            }
        } else if (property !== "" && value !== "") {
            const params = {};
            const temp = {};

            let tempValue = value;
            if (!Number.isNaN(Number(value))) {
                tempValue = Number(value);
            }

            params["action"] = "filter";
            temp[property.value] = tempValue;
            params["params"] = temp;

            getIdsList(params)
                .then((res) => {
                    if (res.length === 0) {
                        alert("Данные не найдены");

                        getIdsList({
                            action: "get_ids",
                        })
                            .then((res) => getItemsList(res))
                            .catch((err) => console.log(err));
                        return res;
                    }

                    getItemsList(res);
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <section className={styles.filter}>
            <div>
                <label className={styles.label} htmlFor="select">
                    Параметр
                </label>
                <Select
                    className={classNames("select", {
                        "not-valid": !isValidSelectData,
                    })}
                    classNamePrefix="react-select"
                    name="select"
                    options={options}
                    defaultValue={options[0].value}
                    placeholder={"Параметр"}
                    onChange={(value) => setProperty(value)}
                    value={property}
                    onFocus={(e) => setValidSelectData(true)}
                />
            </div>
            <div className={styles.input_container}>
                <label className={styles.label} htmlFor="field">
                    Фильтр
                </label>
                <div className={styles.input_field}>
                    <input
                        className={classNames(styles.input, {
                            "not-valid": !isValidInputData,
                        })}
                        name="field"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="..."
                        onKeyUp={onKeyUp}
                        onFocus={(e) => setValidInputData(true)}
                    />
                </div>
            </div>

            <button className={styles.button} onClick={filter}>
                Фильтровать
            </button>
        </section>
    );
};

export default Filter;
