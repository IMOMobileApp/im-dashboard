"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import CertificateTable from "./components/allCertificateTable";
export default function Products() {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="page-header">Green India Challenge Certificates</div>
        </div>

        <div className="col-md-12" style={{ marginBottom: "150px" }}>
          {" "}
          <CertificateTable />{" "}
        </div>
      </div>
    </div>
  );
}
