"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import Loader from "@/app/component/Loader";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Image from "next/image";
import { toast } from "react-toastify";
import FormData from "form-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Switch from "@mui/material/Switch";
import Textarea from "@mui/joy/Textarea";

export default function Caretakerdetail({ params }) {
  let router = useRouter();
  const apiRoute = process.env.API_ROUTE;
  const userData = JSON.parse(localStorage.getItem("loginResponse"));
  const userId = userData?.Data?.userId;
  //console.log("first", userId);
  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState();
  const [name, setName] = useState();
  const [scienceName, setScienceName] = useState();
  const [shotDesc, setShortDesc] = useState();
  const [selectedImages, setSelectedImages] = useState(null);

  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
    //  console.log(selectedImages)
  };

  const fetchSpeciesDetail = useCallback(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      userId: `${userId}`,
      speciesId: params.slug,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/speciesdetail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setStatus(result.Data.status);
        setName(result.Data.name);
        setScienceName(result.Data.scienceName);
        setSelectedImages(result.Data.image);
        setShortDesc(result.Data.description);
        setLoading(false);
      });
    //  .catch(error => console.log('error', error))
  }, [apiRoute, params.slug]);

  useEffect(() => {
    fetchSpeciesDetail();
  }, [fetchSpeciesDetail]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No profile data</p>;
  /*-------------------------------------------------------update caretaker---------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();

    let headersList = {
      Accept: "*/*",
    };

    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("speciesId", params.slug);
    bodyContent.append("name", name);
    bodyContent.append("scienceName", scienceName);
    bodyContent.append("description", shotDesc);
    bodyContent.append("status", status);
    bodyContent.append("add_image", selectedImages);

    let response = await fetch(`${apiRoute}/updatespecies`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    const data1 = await response.json();
    // console.log(data1)

    function successPopup() {
      toast.success(`${data1.Message}`);
      toast.dismiss(toastId.current);
    }
    function failPopup() {
      toast.error(`${data1.Message}`);
      toast.dismiss(toastId.current);
    }
    function pendingPopup() {
      toastId.current = toast.loading("Updating Detail");
    }

    {
      data1.Status === true ? successPopup() : failPopup();
    }

    //   pendingPopup()
    //   var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // var raw = JSON.stringify({
    //   "userId": `${userId}`,
    //   "speciesId": params.slug,
    //   "name": name,
    //   "scienceName": scienceName,
    //   "status": status
    // });

    //    let response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/updatespecies`, { method: "POST", body: raw, headers: myHeaders,});

    //    const data1 = await response.json();
    //   // console.log(data1)

    //    function successPopup(){
    //     toast.success(`${data1.Message}` )
    //     toast.dismiss(toastId.current);
    //                            }
    //   function failPopup(){
    //   toast.error(`${data1.Message}`)
    //   toast.dismiss(toastId.current);
    //                       }
    //   function pendingPopup(){
    //     toastId.current =  toast.loading('Updating Detail') }

    //   { data1.Status === true  ?    successPopup() : failPopup()}
  }
  /**----------------------------------------------------------------update caretaker--------------------------------------------- */

  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Species Detail</h2>
            <p>Update species info and extras.</p>
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
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Science Name</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={scienceName}
                      onChange={(e) => {
                        setScienceName(e.target.value);
                      }}
                    />
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
                    <Image
                      src={data.image}
                      alt={data.image}
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
                        accept="image/png , image/jpeg, image/webp"
                        style={{ opacity: "0" }}
                      />
                    </Button>
                    {selectedImages === !null ? "" : selectedImages.name}
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
                <div className="col-md-4">
                  <div className="input-head">Status</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Switch
                      checked={JSON.parse(status) == 1 ? true : false}
                      inputProps={{ "aria-label": "controlled" }}
                      onChange={() => setStatus(status == 1 ? 2 : 1)}
                    />
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
                      value={`${new Date(data.createdAt).getDate()}/${
                        new Date(data.createdAt).getMonth() + 1
                      }/${new Date(data.createdAt).getFullYear()}`}
                      disabled
                    />
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
                    Update Details
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
