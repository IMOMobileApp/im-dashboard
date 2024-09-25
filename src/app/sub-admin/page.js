"use client";

import { useState } from "react";
import EnhancedTable from "./components/sub-admin-list";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import Link from "next/link";
export default function Products() {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="page-header">Sub Admin</div>
        </div>
        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <div className="row">
            <div className="col-md-5"></div>
            <div className="col-md-5"></div>

            <div className="col-md-2">
              <Button
                variant="contained"
                color="success"
                style={{
                  padding: "10px 15px",
                  fontSize: "13px",
                  width: "100%",
                }}
              >
                <Link
                  href="/sub-admin/add-sub-admin"
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    width: "100%",
                    display: "block",
                  }}
                >
                  <AddIcon /> Add Sub Admin
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="col-md-12" style={{ marginBottom: "150px" }}>
          {" "}
          <EnhancedTable />{" "}
        </div>
      </div>
    </div>
  );
}
