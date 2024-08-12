"use client";
import { useState, useRef } from "react";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";
import FormData from "form-data";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Addchampion() {
  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
  let router = useRouter();
  const toastId = useRef(null);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [selectedImages, setSelectedImages] = useState(null);
  const [status, setStatus] = useState("1");
  const [imageName, setImagename] = useState("");
  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
    setImagename(e.target.files[0].name);
  };
  const changeStatus = () => {
    if (status == 1) {
      setStatus("0");
    } else {
      setStatus("1");
    }
  };
  /*-------------------------------------------------------update Blog-----------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();
    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("title", title);
    bodyContent.append("add_image", selectedImages);
    bodyContent.append("link", desc);
    bodyContent.append("status", status);
    let response = await fetch(`${apiRoute}/addperipheral`, {
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
      toastId.current = toast.loading("Adding Peripheral");
    }
    {
      data1.Status === true ? successPopup() : failPopup();
    }
    {
      data1.Status === true ? router.push("/Peripherals") : "";
    }
  }
  /**----------------------------------------------------------------update blog--------------------------------------------- */
  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Add Celebrity</h2>
            <p>Add Celebrity info and extras.</p>
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
                  <div className="input-head">Peripheral Name</div>
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
                  <div className="input-head">Peripheral Link</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Textarea
                      disabled={false}
                      minRows={1}
                      size="lg"
                      variant="soft"
                      placeholder=""
                      value={desc}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Peripheral Image</div>
                </div>
                <div className="col-md-8">
                  <div
                    className="input-field"
                    style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                  >
                    {/* <Image src={data.blog_image} alt={data.blog_title}  width={200} height={200}/> */}
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
                    <br />
                    {imageName ? imageName : ""}
                    {/* { selectedImages === ! null ? '' : selectedImages.name} */}
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
                      onChange={changeStatus}
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
                    href="/Peripherals"
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
                    Add Peripheral{" "}
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
