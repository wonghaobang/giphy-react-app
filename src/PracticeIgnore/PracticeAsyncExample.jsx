import React, { useState, useEffect } from "react"
import axios from "axios"

const PracticeAsyncExample = () => {
  const [isMale, setIsMale] = useState(false)
  console.log("hello 1")

  useEffect(() => {
    const fetchData = async (offset) => {
      console.log("log before axios")
      const results = await axios(
        `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}&offset=${offset}`
      )

      console.log("log after axios 2")
      setIsMale(!isMale)
      console.log(results)

      console.log("log after axios 3")
      console.log("log after axios 4")
      console.log("log after axios 5")
      return results
    }
    console.log("initial render before api call")
    fetchData(0).then((results) => console.log(results))
    console.log("initial render after api call")
  }, [])

  console.log("hello 1.5")

  return (
    <div>
      {console.log("hello 2")}
      <button
        onClick={() => {
          console.log("hello world 2.1")
          setIsMale(!isMale)
          console.log("hello world 2.2")
        }}
      >
        click me
      </button>
      {console.log("hello 3")}
      <div className="text-info">{isMale.toString()}</div>
    </div>
  )
}

export default PracticeAsyncExample
