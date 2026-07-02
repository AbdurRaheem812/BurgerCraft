import React from "react";

function BurgerVisualizer({ ingredients }) {
  return (
    <div className="col-lg-6 col-md-10 d-flex justify-content-center text-center">
      <div
        className="bg-white p-5 rounded-5 shadow d-flex flex-column align-items-center justify-content-center w-100"
        style={{ maxWidth: "450px", minHeight: "400px" }}
      >
        <div className="bread-top mb-1"></div>
        {ingredients.map((item, index) => (
          <div key={index} className={`${item} my-1`}></div>
        ))}
        <div className="bread-bottom mt-1"></div>
      </div>
    </div>
  );
}

export default BurgerVisualizer;