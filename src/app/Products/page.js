"use client";
import { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EnhancedTable from "../component/allProductTable";

export default function Products() {
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
                <AddIcon /> Add Product
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
              <div className="col-md-4">
                <TextField
                  id="outlined-basic"
                  label="Search Product"
                  variant="outlined"
                  fullWidth
                />
              </div>

              <div className="col-md-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Category"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Men</MenuItem>

                    <MenuItem value={2}>Women</MenuItem>

                    <MenuItem value={3}>Child</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-md-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label2">Price</InputLabel>

                  <Select
                    labelId="demo-simple-select-label2"
                    id="demo-simple-select2"
                    value={age}
                    label="Price"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Men</MenuItem>

                    <MenuItem value={2}>Women</MenuItem>

                    <MenuItem value={3}>Child</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12" style={{ marginBottom: "150px" }}>
          <EnhancedTable />
        </div>
      </div>
    </div>
  );
}
