import axios from "axios"
import React, { useState, useEffect } from "react"
import Loader from "./Loader"
import LoadingButtonGroup from "./LoadingButtonGroup"
import PageRangeInput from "./PageRangeInput"
import Paginate from "./Paginate"
import SearchGifs from "./SearchGifs"

const Giphy = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [loadingEffect, setLoadingEffect] = useState(
    sessionStorage.getItem("loadingEffectInSessionStorage")
  )
  const [completed, setCompleted] = useState(false)

  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem("currentPageInSessionStorage")
  )
  const [itemsPerPage, setItemsPerPage] = useState(
    sessionStorage.getItem("itemsPerPageInSessionStorage")
  )
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    setIsError(false)
    setIsLoading(true)

    const fetchData = async (offset) => {
      try {
        const results = await axios(
          `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}&offset=${offset}`
        )
        sessionStorage.setItem(
          "dataInSessionStorage",
          JSON.stringify(results.data.data)
        )
        setData(results.data.data)
      } catch (err) {
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 3000)
      } finally {
        // setTimeOut has to be in this place because I need to get the gifs size for skeleton loading
        setTimeout(() => {
          setIsLoading(false)
          setTimeout(() => {
            setCompleted(true)
          }, 1000)
        }, 1700)
      }
    }

    if (sessionStorage.getItem("dataInSessionStorage") === null) {
      fetchData(0)
    } else {
      setData(JSON.parse(sessionStorage.getItem("dataInSessionStorage")))
      setTimeout(() => {
        setIsLoading(false)
        setTimeout(() => {
          setCompleted(true)
        }, 1000)
      }, 1700)
    }
  }, [])

  if (loadingEffect === null) {
    sessionStorage.setItem("loadingEffectInSessionStorage", "skeleton")
    setLoadingEffect("skeleton")
  }
  if (currentPage === null) {
    sessionStorage.setItem("currentPageInSessionStorage", 1)
    setCurrentPage(1)
  }
  if (itemsPerPage === null) {
    sessionStorage.setItem("itemsPerPageInSessionStorage", 5)
    setItemsPerPage(5)
  }

  const renderGifs = () => {
    if (isLoading && !completed) {
      return <Loader type={loadingEffect} currentItems={currentItems} />
    }
    if (
      !isLoading &&
      !completed &&
      loadingEffect === "earth" &&
      currentItems.length > 0
    ) {
      return <Loader type="checkmark" />
    }
    if (currentItems.length <= 0) {
      if (loadingEffect === "earth") {
        return <Loader type="empty" />
      }
      return <div className="text-info">No Gifs found for this search...</div>
    }
    return currentItems.map((el, index) => {
      return (
        <div key={index}>
          <img
            src={el.images.fixed_height.url}
            alt={el.title}
            className="gif"
          />
        </div>
      )
    })
  }

  const handleSetLoading = (type) => {
    sessionStorage.setItem("loadingEffectInSessionStorage", type)
    setLoadingEffect(type)
    window.location.reload()
  }

  const handleSetCurrentPage = (pageNumber) => {
    sessionStorage.setItem("currentPageInSessionStorage", pageNumber)
    setCurrentPage(pageNumber)
  }

  return (
    <div className="m-2">
      {isError && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Gifs, please try again in a few minutes
        </div>
      )}

      <LoadingButtonGroup
        loadingEffect={loadingEffect}
        handleSetLoading={handleSetLoading}
      />

      <SearchGifs
        setIsError={setIsError}
        setIsLoading={setIsLoading}
        setData={setData}
        setCurrentPage={setCurrentPage}
        setCompleted={setCompleted}
      />

      <PageRangeInput
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Paginate
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        handleSetCurrentPage={handleSetCurrentPage}
      />

      {!isError && <div className="container gifs">{renderGifs()}</div>}
    </div>
  )
}

export default Giphy
