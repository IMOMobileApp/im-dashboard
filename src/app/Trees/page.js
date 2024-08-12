"use client";
import { useState, Suspense } from "react";
import Loader from "@/app/component/Loader";
import ProjectTable from "./components/projectTable";

export default function Projects() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="page-header">Trees</div>
        </div>

        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <div className="row"></div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-12" style={{ marginBottom: "150px" }}>
          <Suspense fallback={<Loader />}>
            <ProjectTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
