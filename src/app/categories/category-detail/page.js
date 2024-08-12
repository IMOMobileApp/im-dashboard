"use client";

//import Categorybox from '../categoryBox'

import dynamic from "next/dynamic";

const Categorybox = dynamic(
  () => import("../categoryBox"),

  { ssr: false }
);

export default function ProductDetail() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Update Category</h2>

            <p>
              Updated your Product category and necessary information from here
            </p>
          </div>
        </div>

        <div
          className="row"
          style={{ borderBottom: "1px solid #e1e1e1", marginBottom: "25px" }}
        >
          <div className="col-md-3">
            <div className="product_detail_tabs">
              <li className="active">Basic Info</li>
            </div>
          </div>

          <div className="col-md-5"></div>

          <div className="col-md-4">
            <span>Does this product have variants? </span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="">
              <Categorybox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
