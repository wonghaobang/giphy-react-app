import React from "react"

const Paginate = ({
  currentPage,
  itemsPerPage,
  totalItems,
  handleSetCurrentPage,
}) => {
  const pageNumbers = []
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="pagination justify-content-start flex-wrap">
        <li className="page-item">
          <button className="page-link" onClick={() => handleSetCurrentPage(1)}>
            &laquo;
          </button>
        </li>
        {pageNumbers.map((number) => {
          return (
            <li
              key={number}
              className={`page-item ${
                number === parseInt(currentPage) ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handleSetCurrentPage(number)}
              >
                {number}
              </button>
            </li>
          )
        })}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => handleSetCurrentPage(totalPages)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Paginate
