"use client";

import { useState, useRef, useEffect } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";
import FormData from "form-data";
import { useRouter } from "next/navigation";

export default function AddnewCategory() {
  let router = useRouter();
  const apiRoute = process.env.API_ROUTE;
  // const userData = JSON.parse(localStorage.getItem("loginResponse"));
  const [userData, setUserData] = useState();
  useEffect(() => {
    const storedData = localStorage.getItem("loginResponse");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  //const userId = userData?.Data?.userId;
const userId = userData?.Data?.userId;
//console.log("first", userId);
  const toastId = useRef(null);
  const [selectedImages, setSelectedImages] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
    console.log(e.target.files);
    console.log(selectedImages);
  };

  /**------------------------------------------------------------------------------------------------------------------------------------------- */
  async function uploadWithFormData() {
    pendingPopup();
    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("categoryName", categoryName);
    bodyContent.append("quizCategoryImage", selectedImages);
    bodyContent.append("status", 1);
    let response = await fetch(`${apiRoute}/addquizcat`, {
      method: "POST",
      body: bodyContent,
    });
    const data = await response.json();
    //console.log(data);
    function successPopup() {
      toast.success(`${data.Message}`);
      toast.dismiss(toastId.current);
      router.push("/Quiz");
    }
    function failPopup() {
      toast.error("Failed");
      toast.dismiss(toastId.current);
    }
    function pendingPopup() {
      toastId.current = toast.loading("Uploading ");
    }
    {
      data.Status === true ? successPopup() : failPopup();
    }
  }
  /**----------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="row">
        {" "}
        <div className="col-md-10">
          {" "}
          <h2>Add New Quiz Category</h2> <p>add category info.</p>{" "}
        </div>{" "}
      </div>
      <div
        className="row"
        style={{ borderBottom: "1px solid #e1e1e1", marginBottom: "25px" }}
      >
        <div className="col-md-3">
          <div className="product_detail_tabs">
            <li className="active">Basic Info</li>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="input-head">Category Name</div>
        </div>
        <div className="col-md-8">
          <div className="input-field">
            <Input
              placeholder=""
              variant="soft"
              size="lg"
              style={{ padding: "12px 15px", fontSize: "15px" }}
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
              value={categoryName}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="input-head">Category Image</div>
        </div>
        <div className="col-md-8">
          <div
            className="input-field"
            style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
          >
            <section className=" ">
              <Button
                component="label"
                variant="contained"
                startIcon={<UploadFileIcon />}
                style={{ textAlign: "center" }}
              >
                Upload file
                <input
                  type="file"
                  name="images"
                  onChange={onSelectFile}
                  multiple
                  accept="image/png , image/jpeg, image/webp"
                  style={{ opacity: "0" }}
                />
              </Button>{" "}
              <br />
              {selectedImages == null ? "" : selectedImages.name}
            </section>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Button
            variant="outlined"
            color="error"
            style={{ width: "100%", fontSize: "15px", padding: "10px" }}
            onClick={() => {
              router.push("/Quiz");
            }}
          >
            {" "}
            Cancel{" "}
          </Button>
        </div>
        <div className="col-md-6">
          <Button
            variant="contained"
            color="success"
            style={{ width: "100%", fontSize: "15px", padding: "10px" }}
            onClick={uploadWithFormData}
          >
            {" "}
            Add Category{" "}
          </Button>
        </div>
      </div>
    </>
  );
}
