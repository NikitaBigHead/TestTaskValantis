import React from "react";
import styles from "./ListItems.module.css";
import "./index.css";
const ListItems = ({ items, isLoading }) => {
    return (
        <section className={styles.table_section}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.header_row}>
                        <td className={styles.column_name}>Идентификатор</td>
                        <td className={styles.column_name}>Бренд</td>
                        <td className={styles.column_name}>Продукт</td>
                        <td className={styles.column_name}>Цена</td>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr className={styles.loading}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    )}
                    {!isLoading &&
                        items.map((el, index) => (
                            <tr className={styles.body_row} key={el.id}>
                                <td className={styles.body_td}>{el.id}</td>
                                <td className={styles.body_td}>{el.brand}</td>
                                <td className={styles.body_td}>{el.product}</td>
                                <td className={styles.body_td}>{el.price}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </section>
    );
};

export default ListItems;
