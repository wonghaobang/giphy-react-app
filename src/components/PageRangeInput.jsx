import React from "react"

const PageRangeInput = ({
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div className="w-25">
      <h5 className="text-danger">{itemsPerPage} gifs per page</h5>
      <input
        type="range"
        className="custom-range"
        min="1"
        max="50"
        value={itemsPerPage}
        onChange={(event) => {
          sessionStorage.setItem(
            "itemsPerPageInSessionStorage",
            event.target.value
          )
          setItemsPerPage(event.target.value)
          if ((currentPage - 1) * event.target.value >= 50) {
            const adjustCurrentPage = Math.ceil(50 / event.target.value)
            sessionStorage.setItem(
              "currentPageInSessionStorage",
              adjustCurrentPage
            )
            setCurrentPage(adjustCurrentPage)
          }
        }}
      />
    </div>
  )
}

export default PageRangeInput
