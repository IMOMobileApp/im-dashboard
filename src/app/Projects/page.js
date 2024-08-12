"use client";
import { useState, Suspense } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Loader from "@/app/component/Loader";
import Link from "next/link";
import ProjectTable from "./components/projectTable";

export default function Projects() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="page-header">Projects</div>
        </div>

        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-7"></div>

            <div className="col-md-2">
              {/* <Button variant="contained" color="error" style={{padding:'10px 20px', fontSize:'13px', marginLeft:'10px'}}><RiDeleteBinLine /> Delete</Button> */}
              <Button
                variant="contained"
                color="success"
                style={{
                  padding: "10px 20px",
                  fontSize: "13px",
                  marginLeft: "6px",
                }}
              >
                <Link href="/Projects/addProject" style={{ color: "#fff" }}>
                  <AddIcon /> Add Project
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
                  label="Search Project"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12" style={{ marginBottom: "150px" }}>
          <Suspense fallback={<Loader />}>
            <ProjectTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
