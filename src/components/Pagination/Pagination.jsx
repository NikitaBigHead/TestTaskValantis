import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";
function Pagination({ pageCount, handlePageClick }) {
    return (
        <section className={styles.pagination_section}>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Далее"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="Назад"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </section>
    );
}

export default Pagination;
