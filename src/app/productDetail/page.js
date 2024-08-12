"use client";

import { useState } from "react";

//import AddnewProduct from '@/app/component/addNewProduct'

import Button from "@mui/material/Button";

import Switch from "@mui/joy/Switch";

import Typography from "@mui/joy/Typography";

import dynamic from "next/dynamic";

const AddnewProduct = dynamic(
  () => import("../component/addNewProduct"),

  { ssr: false }
);

export default function ProductDetail() {
  const [showCombinationTab, setShowCombinationTab] = useState(false);

  const showVariationTab = () => {
    setShowCombinationTab(!showCombinationTab);
  };

  const [showCombinationBox, setShowCombinationBox] = useState(false);

  const showVariationBox = () => {
    setShowCombinationBox(!showCombinationBox);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Update Products</h2>

            <p>Update products info, combinations and extras.</p>
          </div>

          <div className="col-md-2">
            <Button
              variant="outlined"
              style={{
                fontSize: "15px",
                borderRadius: "50%",
                minWidth: "30px",
                height: "30px",
                padding: "0",
              }}
            >
              x
            </Button>
          </div>
        </div>

        <div
          className="row"
          style={{ borderBottom: "1px solid #e1e1e1", marginBottom: "25px" }}
        >
          <div className="col-md-3">
            <div className="product_detail_tabs">
              <li className={showCombinationTab ? "" : "active"}>Basic Info</li>

              {showCombinationTab ? (
                <li className="" onClick={showVariationBox}>
                  Combination
                </li>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="col-md-5"></div>

          <div className="col-md-4">
            <span>Does this product have variants? </span>

            <Switch
              onChange={showVariationTab}
              slotProps={{
                track: {
                  children: (
                    <>
                      <Typography
                        component="span"
                        level="inherit"
                        sx={{ ml: "10px" }}
                      >
                        {" "}
                        Yes{" "}
                      </Typography>

                      <Typography
                        component="span"
                        level="inherit"
                        sx={{ mr: "8px" }}
                      >
                        {" "}
                        No{" "}
                      </Typography>
                    </>
                  ),
                },
              }}
              sx={{
                "--Switch-thumbSize": "27px",
                "--Switch-trackWidth": "64px",
                "--Switch-trackHeight": "31px",
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="">
              <AddnewProduct />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
