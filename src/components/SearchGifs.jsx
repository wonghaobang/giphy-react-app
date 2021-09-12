import axios from "axios"
import React, { useState } from "react"

const SearchGifs = ({
  setIsError,
  setIsLoading,
  setData,
  setCurrentPage,
  setCompleted,
}) => {
  const [search, setSearch] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    const fetchData = async (offset) => {
      setCompleted(false)
      setIsError(false)
      setIsLoading(true)
      try {
        const results = await axios(
          `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${search}&offset=${offset}`
        )
        sessionStorage.setItem(
          "dataInSessionStorage",
          JSON.stringify(results.data.data)
        )
        sessionStorage.setItem("currentPageInSessionStorage", 1)
        setData(results.data.data)
        setCurrentPage(1)
      } catch (err) {
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 3000)
      } finally {
        setTimeout(() => {
          setIsLoading(false)
          setTimeout(() => {
            setCompleted(true)
          }, 1000)
        }, 1700)
      }
    }

    fetchData(0)
  }

  return (
    <form action="" className="form-inline justify-content-center mt-1">
      <input
        type="text"
        placeholder="Search"
        className="form-control w-25"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
        <i className="fa fa-search"></i>
      </button>

      <button
        type="button"
        className="btn btn-danger ml-2"
        onClick={() => {
          sessionStorage.removeItem("dataInSessionStorage")
          sessionStorage.removeItem("itemsPerPageInSessionStorage")
          sessionStorage.removeItem("currentPageInSessionStorage")
          window.location.reload()
        }}
      >
        <i className="fas fa-chart-line mr-1 text-dark"></i>
        Trending Gifs
      </button>
    </form>
  )
}

export default SearchGifs
