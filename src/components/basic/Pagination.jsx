import { useState } from "react";

const Pagination = ({ total, active, setPage, onClickCallback }) => {
  const [currentPage, setCurrentPage] = useState(active);

  let pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(
      <li
        className={i === currentPage ? "active" : null}
        onClick={() => {
          setCurrentPage(i);
          setPage(i);
          onClickCallback();
        }}
      >
        <button id={i}>{i}</button>
      </li>
    );
  }

  return (
    <div class="pagination">
      <ul>{pages}</ul>
    </div>
  );
};

export default Pagination;
