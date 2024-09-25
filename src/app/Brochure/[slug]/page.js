"use client";

import { useEffect, useState, useRef, useMemo } from "react";

import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import Loader from "@/app/component/Loader";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function Seodetail({ params }) {
  const apiRoute = process.env.API_ROUTE;
  const [userData, setUserData] = useState();
  useEffect(() => {
    const storedData = localStorage.getItem("loginResponse");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  let router = useRouter();

  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  const [selectedImages, setSelectedImages] = useState(null);

  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  useEffect(() => {
    const getDetails=()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ type: params.slug });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/detailBrochure`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setSelectedImages(result.Data.file);
        setTitle(result.Data.title);
        // setKeywords(result.Data.metaKeyword)
        setLoading(false);
      });
    }
    if(userData){
      getDetails()
    }
    //  .catch(error => console.log('error', error))
  }, [params.slug, apiRoute, userData]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No data</p>;
  /*-------------------------------------------------------update Blog-----------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();
    let bodyContent = new FormData();
    bodyContent.append("userId", `${userData?.Data?.userId}`);
    bodyContent.append("add_image", selectedImages);
    bodyContent.append("title", title);
    bodyContent.append("type", params.slug);

    let response = await fetch(`${apiRoute}/addBrochure`, {
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
      toastId.current = toast.loading("Updating SEO");
    }

    {
      data1.Status === true ? successPopup() : failPopup();
    }
  }
  /**----------------------------------------------------------------update blog--------------------------------------------- */

  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Update Brochure</h2>
            <p>Update Brochure info and extras.</p>
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
                  <div className="input-head">Page Name</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      disabled
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{
                        padding: "12px 15px",
                        fontSize: "15px",
                        textTransform: "uppercase",
                      }}
                      value={data.type}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Brochure Title/Name</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Change Brochure</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
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
                        accept="application/pdf"
                        style={{ opacity: "0" }}
                      />
                    </Button>
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
                    href="/Brochure"
                  >
                    {" "}
                    Back{" "}
                  </Link>
                </div>

                <div className="col-md-4">
                  <Button
                    variant="contained"
                    color="success"
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      padding: "10px",
                      textTransform: "capitalize",
                    }}
                    onClick={uploadWithFormData}
                  >
                    {" "}
                    Update Brochure{" "}
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
