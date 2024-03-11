import React from "react";
import styles from "./Header.module.css";
const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header_container}>
                <a
                    className={styles.logo}
                    href="https://github.com/ValantisJewelry/TestTaskValantis/blob/main/API.md"
                >
                    Тестовое задание
                </a>
                <a
                    className={styles.author}
                    href="https://hh.ru/resume/648c72ccff0b7146840039ed1f5438534b7073"
                >
                    Кузьмин Н
                </a>
            </div>
        </div>
    );
};

export default Header;
