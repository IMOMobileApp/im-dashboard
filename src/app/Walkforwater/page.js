"use client";
import { useState, Suspense } from "react";
import TextField from "@mui/material/TextField";
import Loader from "@/app/component/Loader";
import BlogcategoryTable from "./components/webBlogCategoryTable";

export default function caretakers() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">Walk for Water Leads</div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "20px" }}>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6"></div>
              <div className="col-md-3">
                {/* <Button variant="contained" color="error" style={{padding:'10px 20px', fontSize:'13px', marginLeft:'10px'}}><RiDeleteBinLine /> Delete</Button> */}
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div
              style={{
                backgroundColor: "#fff",
                marginBottom: "20px",
                padding: "15px 15px",
              }}
            >
              <div className="row">
                <div className="col-md-12">
                  <TextField
                    id="outlined-basic"
                    label="Search "
                    variant="outlined"
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "150px" }}>
            <Suspense fallback={<Loader />}>
              <BlogcategoryTable />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
