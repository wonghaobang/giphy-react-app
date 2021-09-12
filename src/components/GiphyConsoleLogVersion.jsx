import axios from "axios"
import React, { useState, useEffect } from "react"
import Loader from "./Loader"
import LoadingButtonGroup from "./LoadingButtonGroup"
import PageRangeInput from "./PageRangeInput"
import Paginate from "./Paginate"
import SearchGifs from "./SearchGifs"

const GiphyConsoleLogVersion = () => {
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
    console.log("setIsError: false")
    setIsLoading(true)
    console.log("setIsLoading: true")

    const fetchData = async (offset) => {
      try {
        const results = await axios(
          `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}&offset=${offset}`
        )
        console.log("got my data~~~~~~")
        console.log(results.data.data)
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
          console.log("setting is loading back to false in 2 sec")
          setIsLoading(false)
        }, 2000)
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
      }, 2000)
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

  // dont know why I must use this function so the loading spinner works in the middle properly
  const renderGifs = () => {
    console.log("come here before isLoading")
    if (isLoading && !completed) {
      console.log("isLoading is running...")
      return <Loader type={loadingEffect} currentItems={currentItems} />
    }
    console.log("come here before checkmark")
    if (
      !isLoading &&
      !completed &&
      loadingEffect === "earth" &&
      currentItems.length > 0
    ) {
      console.log("isLoading is running...")
      return <Loader type="checkmark" />
    }
    console.log("come here before length less than or equal to 0")
    if (currentItems.length <= 0) {
      if (loadingEffect === "earth") {
        return <Loader type="empty" />
      }
      return <div className="text-info">No Gifs found for this search...</div>
    }
    console.log("come here showing gifs")
    // technically this should be with 'completed &&' to make logic more complete, but I would have to fix the setTimeOut for other loading screens for setComplete
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

export default GiphyConsoleLogVersion
