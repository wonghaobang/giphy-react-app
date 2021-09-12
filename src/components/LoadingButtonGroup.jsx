import React from "react"

const LoadingButtonGroup = ({ loadingEffect, handleSetLoading }) => {
  return (
    <div
      className="btn-group btn-group-sm"
      role="group"
      data-toggle="tooltip"
      data-placement="bottom"
      title="click to change loading type"
    >
      <button
        type="button"
        className={`btn btn-outline-info ${
          loadingEffect === "skeleton" ? "active" : ""
        }`}
        onClick={() => {
          handleSetLoading("skeleton")
        }}
      >
        <i className="fas fa-skull-crossbones mr-1"></i>
        Skeleton
      </button>

      <button
        type="button"
        className={`btn btn-outline-info ${
          loadingEffect === "earth" ? "active" : ""
        }`}
        onClick={() => {
          handleSetLoading("earth")
        }}
      >
        {/* <i className="fas fa-globe mr-1"></i> */}
        <i className="fas fa-globe-americas mr-1"></i>
        Earth
      </button>

      <button
        type="button"
        className={`btn btn-outline-info ${
          loadingEffect === "dot" ? "active" : ""
        }`}
        onClick={() => {
          handleSetLoading("dot")
        }}
      >
        <i className="fas fa-ellipsis-h mr-1"></i>
        Three-dots Bounce
      </button>

      <button
        type="button"
        className={`btn btn-outline-info ${
          loadingEffect === "circle" ? "active" : ""
        }`}
        onClick={() => {
          handleSetLoading("circle")
        }}
      >
        <i className="fas fa-circle-notch mr-1"></i>
        Circular
      </button>

      <button
        type="button"
        className={`btn btn-outline-info ${
          loadingEffect === "bar" ? "active" : ""
        }`}
        onClick={() => {
          handleSetLoading("bar")
        }}
      >
        <i className="fas fa-signal mr-1"></i>
        Bars
      </button>

      <button
        type="button"
        className={`btn btn-outline-info ${
          loadingEffect === "spoke" ? "active" : ""
        }`}
        onClick={() => {
          handleSetLoading("spoke")
        }}
      >
        <i className="fas fa-asterisk mr-1"></i>
        Spokes
      </button>
    </div>
  )
}

export default LoadingButtonGroup
