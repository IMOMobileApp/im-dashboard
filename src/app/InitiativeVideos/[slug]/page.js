"use client";
import { useState, Suspense } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Loader from "@/app/component/Loader";
import Link from "next/link";
import VideoTable from "../components/videoTable";
export default function InitiativeAlbum({ params }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="page-header">Videos Link</div>
        </div>
        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6"></div>
            <div className="col-md-3">
              <Button
                variant="contained"
                color="success"
                style={{
                  padding: "10px 20px",
                  fontSize: "13px",
                  marginLeft: "10px",
                }}
              >
                <Link
                  href={`/InitiativeVideos/${params.slug}/addVideo`}
                  style={{ color: "#fff" }}
                >
                  <AddIcon /> Add Video Links
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="col-md-12" style={{ marginBottom: "150px" }}>
          <Suspense fallback={<Loader />}>
            <VideoTable videoId={params.slug} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
