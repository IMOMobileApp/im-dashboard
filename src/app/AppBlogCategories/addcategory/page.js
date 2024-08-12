"use client";
import { useState, useRef, useEffect } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import FormData from "form-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function AddSpecies() {
  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
  let router = useRouter();
  const toastId = useRef(null);
  const [name, setName] = useState();
  const [selectedImages, setSelectedImages] = useState(null);
  const [status, setStatus] = useState("1");

  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
  };

  useEffect(() => {}, []);

  /*-------------------------------------------------------update species----------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();
    let bodyContent = new FormData();
    bodyContent.append("userId", `${process.env.NEXT_PUBLIC_USERID}`);
    bodyContent.append("catTitle", name);
    bodyContent.append("blogCat_image", selectedImages);
    bodyContent.append("status", status);

    let response = await fetch(`${apiRoute}/addappblogcat`, {
      method: "POST",
      body: bodyContent,
    });
    const data1 = await response.json();
    function successPopup() {
      toast.success(`${data1.Message}`);
      toast.dismiss(toastId.current);
    }
    function failPopup() {
      toast.error(`${data1.Message}`);
      toast.dismiss(toastId.current);
    }
    function pendingPopup() {
      toastId.current = toast.loading("Updating Category");
    }
    {
      data1.Status === true ? successPopup() : failPopup();
    }
    {
      data1.Status === true ? router.push("/AppBlogCategories") : "";
    }
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Add Categories</h2>
            <p>Add Categories info and extras.</p>
          </div>
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
          <div className="col-md-5"></div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="">
              {/*-------------------------------------------------------------------------------------------------------------------------- */}
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Name</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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

                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<UploadFileIcon />}
                      style={{ textAlign: "center" }}
                    >
                      Upload icon
                      <input
                        type="file"
                        name="images"
                        onChange={onSelectFile}
                        multiple
                        accept="image/png , image/jpeg, image/webp"
                        style={{ opacity: "0" }}
                      />
                    </Button>
                    {selectedImages ? selectedImages.name : ""}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                  <Link
                    variant="outlined"
                    color="error"
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      padding: "10px",
                      display: "inline-block",
                      textAlign: "center",
                      border: "1px solid #000",
                      color: "#000",
                    }}
                    href="/Species"
                  >
                    {" "}
                    Cancel{" "}
                  </Link>
                </div>
                <div className="col-md-4">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}