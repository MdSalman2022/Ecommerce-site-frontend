import React from "react";

function PaginationSection({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const [active, setActive] = React.useState(1);

  return (
    <nav>
      <ul className="pagination flex items-center justify-center gap-2">
        {pageNumbers.map(pageNumber => (
          <li
            key={pageNumber}
            className={`page-item ${
              currentPage === pageNumber ? "active" : ""
            }`}
          >
            <button
              onClickCapture={() => setActive(pageNumber)}
              className={`page-link btn ${
                active === pageNumber
                  ? "btn-primary  border-none"
                  : "btn-accent border-none"
              }}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PaginationSection;
