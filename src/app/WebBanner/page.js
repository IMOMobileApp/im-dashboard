"use client";
import { useEffect, useState, useRef } from "react";
import Input from "@mui/joy/Input";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import Loader from "@/app/component/Loader";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Image from "next/image";
import { toast } from "react-toastify";
import FormData from "form-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Bannerdetail({ params }) {
  const apiRoute = process.env.API_ROUTE;
  // const userId = process.env.USER_ID;
const userData = JSON.parse(localStorage.getItem("loginResponse"));
const userId = userData?.Data?.userId;
//console.log("first", userId);
  let router = useRouter();
  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  const [selectedImages, setSelectedImages] = useState(null);
  const [selectedMobileImages, setSelectedMobileImages] = useState(null);
  const [url, setUrl] = useState();
  const [status, setStatus] = useState();
  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
    //  console.log(selectedImages)
  };

  const onSelectMobileFile = (e) => {
    setSelectedMobileImages(e.target.files[0]);
    //  console.log(selectedImages)
  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ userId: `${userId}` });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/webbannerdetail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setTitle(result.Data.title);
        setSelectedImages(result.Data.desktopImage);
        setSelectedMobileImages(result.Data.mobileImage);
        setUrl(result.Data.url);
        setLoading(false);
      });
    //  .catch(error => console.log('error', error))
  }, [params.slug, apiRoute, userId]);
  if (isLoading) return <Loader />;
  if (!data) return <p>No Banner found</p>;
  /*-------------------------------------------------------update Banner-----------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();
    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("banId", "65f810ed59b0f3921406b0fe");
    bodyContent.append("title", title);
    bodyContent.append("desktopImage", selectedImages);
    bodyContent.append("mobileImage", selectedMobileImages);
    bodyContent.append("status", 1);
    bodyContent.append("url", url);
    let response = await fetch(`${apiRoute}/updatewebbanner`, {
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
      toastId.current = toast.loading("Updating Banner");
    }
    {
      data1.Status === true ? successPopup() : failPopup();
    }
  }
  /**----------------------------------------------------------------update banner--------------------------------------------- */
  /**---------------------------------------------------------------------------------------------------------------------------------------- */

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Update Banner</h2>
            <p>Update banner info and extras.</p>
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
                  <div className="input-head">Media Title/Name</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Link</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Desktop Image</div>
                </div>
                <div className="col-md-8">
                  <div
                    className="input-field"
                    style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                  >
                    <Image
                      src={data.desktopImage}
                      alt={data.ban_title}
                      width={200}
                      height={200}
                    />
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
                        style={{ opacity: "0" }}
                      />
                    </Button>
                    {selectedImages === !null ? selectedImages.name : ""}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Mobile Image</div>
                </div>
                <div className="col-md-8">
                  <div
                    className="input-field"
                    style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                  >
                    <Image
                      src={data.mobileImage}
                      alt={data.ban_title}
                      width={200}
                      height={200}
                    />
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
                        onChange={onSelectMobileFile}
                        multiple
                        style={{ opacity: "0" }}
                      />
                    </Button>
                    {selectedMobileImages === !null
                      ? selectedMobileImages.name
                      : ""}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Created At</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={`${new Date(data.createdAt).getDate()}/${new Date(
                        data.createdAt
                      ).getMonth()}/${new Date(data.createdAt).getFullYear()}`}
                      disabled
                    />
                  </div>
                </div>
              </div>
              {/* <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Status</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Switch checked={JSON.parse(status) == 1 ? true : false} inputProps={{ 'aria-label': 'controlled' }} onChange={changeStatus}/></div>
                              </div>
                            </div> */}
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
                    href="/ListBanner"
                  >
                    {" "}
                    Back{" "}
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
                    Update Media{" "}
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
