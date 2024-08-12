"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Loader from "@/app/component/Loader";
import BannerTable from "./components/bannerTable";
export default function Blogs() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="page-header">Banners</div>
        </div>
        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-7"></div>
            <div className="col-md-2">
              <Button
                variant="contained"
                color="success"
                style={{
                  padding: "10px 20px",
                  fontSize: "13px",
                  marginLeft: "10px",
                }}
              >
                <AddIcon />{" "}
                <Link href="/ListBanner/AddBanner" style={{ color: "#fff" }}>
                  Add Media
                </Link>
              </Button>
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
                  label="Search Banner"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12" style={{ marginBottom: "150px" }}>
          <Suspense fallback={<Loader />}>
            <BannerTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
