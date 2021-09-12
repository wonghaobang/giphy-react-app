import React from "react"
import ReactLoading from "react-loading"
import Lottie from "react-lottie"
import * as location from "../LottieJsonFiles/1055-world-locations.json"
import * as success from "../LottieJsonFiles/1127-success.json"
import * as empty from "../LottieJsonFiles/13525-empty.json"

const LocationOptions = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

const SuccessOptions = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

const EmptyOptions = {
  loop: true,
  autoplay: true,
  animationData: empty.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

const Loader = ({ type, currentItems }) => {
  const Skeleton = () => {
    return currentItems.map((el, index) => {
      return (
        <div
          key={index}
          className="loadingGif"
          style={{
            width: `${el.images.fixed_height.width}px`,
            height: `${el.images.fixed_height.height}px`,
          }}
        ></div>
      )
    })
  }

  const Circle = () => (
    <div>
      {/* <i
        className="fas fa-circle-notch fa-2x fa-spin"
        style={{ color: "#2196f3" }}
      ></i> */}
      <ReactLoading type={"spin"} color={"#2196f3"} height={35} width={35} />
    </div>
  )

  const ThreeDot = () => (
    <div className="custom">
      <div className="balls">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
      </div>
      <span className="customText">Loading...</span>
    </div>
  )

  const Bar = () => (
    <ReactLoading type={"bars"} color={"#03fc4e"} height={70} width={70} />
  )

  const Spoke = () => (
    <ReactLoading type={"spokes"} color={"#cacaca"} height={45} width={45} />
  )

  const Earth = () => (
    <Lottie options={LocationOptions} height={300} width={300} />
  )

  const CheckMark = () => (
    <Lottie options={SuccessOptions} height={200} width={200} />
  )

  const EmptyMagnifier = () => (
    <Lottie options={EmptyOptions} height={200} width={200} />
  )

  if (type === "skeleton") return <Skeleton />
  if (type === "circle") return <Circle />
  if (type === "dot") return <ThreeDot />
  if (type === "bar") return <Bar />
  if (type === "spoke") return <Spoke />
  if (type === "earth") return <Earth />
  if (type === "checkmark") return <CheckMark />
  if (type === "empty") return <EmptyMagnifier />
}

export default Loader
