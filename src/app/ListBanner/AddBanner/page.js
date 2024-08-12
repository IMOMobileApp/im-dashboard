"use client";
import { useState, useRef } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";
import FormData from "form-data";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Link from "next/link";

export default function AddnewProduct() {
  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
  const toastId = useRef(null);
  const [selectedImages, setSelectedImages] = useState(null);
  const [bannerName, setBannerName] = useState("banner new");
  const changeBannerName = (e) => {
    setBannerName(e.target.value);
  };

  const onSelectFile = (e) => {
    setSelectedImages(e.target.files);
    // console.log(e.target.files)
    // console.log(selectedImages)
    // console.log(selectedImages)
  };

  const [mediaImage, setImage] = useState("image");
  const [mediaVideo, setVideo] = useState("video");
  const [mediatype, setMediaType] = useState("image");
  const handleMediaType = (event) => {
    if (event.target.value == "image") {
      setMediaType("image");
    } else {
      setMediaType("video");
    }
  };

  const [inventory, setInventory] = useState("inventory");
  const [nonInventoryType, setNonInventoryType] = useState("app");
  const [inventoryType, setInventoryType] = useState("inventory");
  const handleInventoryType = (event) => {
    console.log(event.target.value);
    setNonInventoryType(event.target.value);
    // if(event.target.value == 'inventory'){ setInventoryType('inventory') }
    // else{setInventoryType('app')}
  };

  /**------------------------------------------------------------------------------------------------------------------------------------------- */
  async function uploadWithFormData() {
    pendingPopup();
    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("title", bannerName);
    bodyContent.append("banner_image", selectedImages[0]);
    bodyContent.append("status", 1);
    bodyContent.append("type", inventoryType);
    bodyContent.append("mediaType", mediatype);
    let response = await fetch(`${apiRoute}/addbanner`, {
      method: "POST",
      body: bodyContent,
    });
    const data = await response.json();
    //  console.log(data);
    //  console.log(userId, bannerName, selectedImages, 1, inventoryType, mediatype);
    function successPopup() {
      toast.success(`${data.Message}`);
      toast.dismiss(toastId.current);
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
          <h2>Change/Update Media</h2> <p>Update Media info.</p>{" "}
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
          <div className="input-head">Media Title/Name</div>
        </div>
        <div className="col-md-8">
          <div className="input-field">
            <Input
              placeholder=""
              variant="soft"
              size="lg"
              style={{ padding: "12px 15px", fontSize: "15px" }}
              onChange={changeBannerName}
              value={bannerName}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="input-head">Media Type</div>
        </div>
        <div className="col-md-8">
          <div className="input-field">
            <FormControl fullWidth>
              <Select
                defaultValue={mediaImage}
                value={mediatype}
                onChange={handleMediaType}
                style={{ fontSize: "14px" }}
              >
                <MenuItem value={mediaImage}>{mediaImage}</MenuItem>
                <MenuItem value={mediaVideo}>{mediaVideo}</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="input-head">Banner Images</div>
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
                  style={{ opacity: "0" }}
                />
              </Button>{" "}
              <br />
              {selectedImages === null ? "" : selectedImages[0].name}
            </section>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="input-head">Type</div>
        </div>
        <div className="col-md-8">
          <div className="input-field">
            <FormControl fullWidth>
              <Select
                defaultValue={nonInventoryType}
                value={nonInventoryType}
                onChange={handleInventoryType}
                style={{ fontSize: "14px" }}
              >
                <MenuItem value="app">App</MenuItem>
                <MenuItem value="inventory">Inventory</MenuItem>
              </Select>
            </FormControl>
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
            href="/ListBanner"
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
            Update Media{" "}
          </Button>
        </div>
      </div>
    </>
  );
}
