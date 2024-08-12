"use client";

import { useState } from "react";

import DownloadIcon from "@mui/icons-material/Download";

import UploadFileIcon from "@mui/icons-material/UploadFile";

import BorderColorIcon from "@mui/icons-material/BorderColor";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import AddIcon from "@mui/icons-material/Add";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import CategoryTable from "./categoryTable";

export default function Categories() {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="page-header">Products</div>
        </div>

        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <div className="row">
            <div className="col-md-3">
              <Button
                variant="outlined"
                style={{
                  padding: "10px 20px",
                  fontSize: "13px",
                  marginLeft: "10px",
                }}
              >
                {" "}
                <UploadFileIcon /> Export
              </Button>

              <Button
                variant="outlined"
                style={{
                  padding: "10px 20px",
                  fontSize: "13px",
                  marginLeft: "10px",
                }}
              >
                {" "}
                <DownloadIcon /> Import
              </Button>
            </div>

            <div className="col-md-4"></div>

            <div className="col-md-5">
              <Button
                variant="contained"
                disabled
                style={{
                  padding: "10px 20px",
                  fontSize: "13px",
                  marginLeft: "10px",
                }}
              >
                <BorderColorIcon /> Bulk Action
              </Button>

              <Button
                variant="contained"
                color="error"
                style={{
                  padding: "10px 20px",
                  fontSize: "13px",
                  marginLeft: "10px",
                }}
              >
                <DeleteForeverIcon /> Delete
              </Button>

              <Button
                variant="contained"
                color="success"
                style={{
                  padding: "10px 20px",
                  fontSize: "13px",
                  marginLeft: "10px",
                }}
              >
                <AddIcon /> Add Category
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
                  label="Search Category"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12" style={{ marginBottom: "150px" }}>
          <CategoryTable />
        </div>
      </div>
    </div>
  );
}
