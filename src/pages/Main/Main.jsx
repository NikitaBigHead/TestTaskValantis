import React, { useEffect, useState } from "react";
import ListItems from "../../components/ListItems/ListItems";
import { useItems } from "../../customHooks/useItems";
import Pagination from "../../components/Pagination/Pagination";
import Filter from "../../components/Filter/Filter";
import styles from "./Main.module.css";

var CryptoJS = require("crypto-js");
var date_fns = require("date-fns");

const Main = () => {
    const [isLoading, setLoading] = useState(true);

    const [ids, setIds] = useState([]);
    const [offset, setOffset] = useState(0);
    const [itemsLength, setItemsLength] = useState(0);
    const [items, setItems] = useItems([]);

    const itemsPerPage = 50;
    const currentIds = ids.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(itemsLength / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % itemsLength;
        setOffset(newOffset);
        getItemsList(currentIds);
    };

    const getClearArr = (arr) => {
        let map = new Map();
        arr.forEach((el) => {
            if (!map.has(el)) {
                map.set(el, el);
            }
        });
        return Array.from(map.values());
    };

    const getItemsList = async (res) => {
        setLoading((prev) => true);

        let responce = await fetch("https://api.valantis.store:41000/", {
            method: "POST",
            headers: {
                "X-Auth": CryptoJS.MD5(
                    "Valantis_" + date_fns.format(new Date(), "yyyyMMdd")
                ),
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                action: "get_items",
                params: {
                    ids: res,
                },
            }),
        });
        if (responce.ok) {
            res = await responce.json();
            setItems(res.result);
            setLoading((prev) => false);
        } else {
            getItemsList(res);
            console.log(responce.status);
        }
    };

    const getIdsList = (body) => {
        return new Promise(async (resolve, rejected) => {
            let res = await fetch("https://api.valantis.store:41000/", {
                method: "POST",
                headers: {
                    "X-Auth": CryptoJS.MD5(
                        "Valantis_" + date_fns.format(new Date(), "yyyyMMdd")
                    ),
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                res = await res.json();
                let result = getClearArr(res.result);
                setItemsLength(result.length);
                setIds(result);

                resolve(result.slice(offset, offset + itemsPerPage));
            } else {
                getIdsList({
                    action: "get_ids",
                });
                rejected(res.status);
            }
        });
    };

    useEffect(() => {
        getIdsList({
            action: "get_ids",
        })
            .then((res) => getItemsList(res))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={styles.main}>
            <Filter getIdsList={getIdsList} getItemsList={getItemsList} />
            <ListItems items={items} isLoading={isLoading} />
            <Pagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
            />
        </div>
    );
};

export default Main;
