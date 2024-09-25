"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import FormData from "form-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Textarea from "@mui/joy/Textarea";

import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function AddSpecies() {
  const apiRoute = process.env.API_ROUTE;
  // //const userId = process.env.USER_ID;
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
  let router = useRouter();
  const toastId = useRef(null);
  const [name, setName] = useState();
  const [scienceName, setScienceName] = useState();

  const [shotDesc, setShortDesc] = useState();
  const [selectedImages, setSelectedImages] = useState(null);

  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
    //  console.log(selectedImages)
  };

  // useEffect(()=>{
  //   axios.post(`${apiRoute}/addspecies`, {
  //     userId: `${userId}`
  //   })
  //   .then((response) => {
  //     console.log(response);
  //     setProjectId(response.data.Data)
  //   }, (error) => {
  //     console.log(error);
  //   });
  // },[])

  /*-------------------------------------------------------update species----------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();

    let headersList = {
      Accept: "*/*",
    };

    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("name", name);
    bodyContent.append("scienceName", scienceName);
    bodyContent.append("description", shotDesc);
    bodyContent.append("status", 1);
    bodyContent.append("add_image", selectedImages);

    let response = await fetch(`${apiRoute}/addspecies`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
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
      toastId.current = toast.loading("Adding new Species");
    }
    {
      data1.Status === true ? successPopup() : failPopup();
    }
    {
      data1.Status === true ? router.push("/Species") : "";
    }
  }
  /**----------------------------------------------------------------update species--------------------------------------------- */
  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Add Species</h2>
            <p>Add species info and extras.</p>
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
                  <div className="input-head">scienceName</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <div className="input-field">
                      <Input
                        placeholder=""
                        variant="soft"
                        size="lg"
                        style={{ padding: "12px 15px", fontSize: "15px" }}
                        value={scienceName}
                        onChange={(e) => setScienceName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Species Image</div>
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
                      Upload file
                      <input
                        type="file"
                        name="images"
                        onChange={onSelectFile}
                        multiple
                        accept="image/png , image/jpeg, image/webp"
                        style={{ opacity: "0" }}
                      />
                    </Button>
                    {selectedImages === null ? "" : selectedImages.name}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Species Description</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Textarea
                      disabled={false}
                      minRows={2}
                      size="lg"
                      variant="soft"
                      placeholder=""
                      value={shotDesc}
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      onChange={(e) => setShortDesc(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
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
                <div className="col-md-6">
                  <Button
                    variant="contained"
                    color="success"
                    style={{ width: "100%", fontSize: "15px", padding: "10px" }}
                    onClick={uploadWithFormData}
                  >
                    {" "}
                    Add Species{" "}
                  </Button>
                </div>
              </div>
              {/*-------------------------------------------------------------------------------------------------------------- */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
