import React, { useEffect, useState } from "react"
import Lottie from "react-lottie"

import * as location from "../LottieJsonFiles/1055-world-locations.json"
import * as success from "../LottieJsonFiles/1127-success.json"

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

const PracticeLottieExample = () => {
  const [data, setData] = useState([])
  const [loading, setloading] = useState(false)
  const [completed, setcompleted] = useState(false)

  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setData(json)
          setloading(false)

          setTimeout(() => {
            setcompleted(true)
          }, 1000)
        })
    }, 2000)
  }, [])

  return (
    <>
      {!completed && loading && (
        <Lottie options={defaultOptions1} height={200} width={200} />
      )}

      {!completed && !loading && (
        <Lottie options={defaultOptions2} height={200} width={200} />
      )}

      {completed && (
        <ul className="text-primary">
          {data.map((el) => {
            return <li key={el.id}>{el.title}</li>
          })}
        </ul>
      )}
    </>
  )
}

export default PracticeLottieExample
