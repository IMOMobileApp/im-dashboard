"use client";
import { useState, Suspense } from "react";
import Loader from "@/app/component/Loader";
import ProjectTreeTable from "../components/treeTable";

export default function Projects({ params }) {
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
            <ProjectTreeTable urlSlug={params.slug} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
