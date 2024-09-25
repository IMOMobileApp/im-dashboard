"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";
import FormData from "form-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export default function Addblog() {
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
  const [title, setTitle] = useState();
  const [shotDesc, setShotDesc] = useState();
  const [desc, setDesc] = useState();
  const [selectedImages, setSelectedImages] = useState(null);
  const [seeds, setSeeds] = useState();
  const [value, setValue] = useState("<p>hey this is text editor</p>");
  const [status, setStatus] = useState("1");
  const [blogCat, setBlogCat] = useState();
  const [preCatId, setPreCatId] = useState();
  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
  };
  const changeStatus = () => {
    if (status == 1) {
      setStatus("0");
    } else {
      setStatus("1");
    }
  };
  const fetchAllWebcategoryAPI = useCallback(() => {
    let data = JSON.stringify({ userId: `${userId}` });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/listappblogcat`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      setBlogCat(response.data.Data);
      setPreCatId(response.data.Data[0]);
    });
  }, [apiRoute, userId]);

  const handleCat = (event) => {
    setPreCatId(event.target.value);
  };
  useEffect(() => {
    fetchAllWebcategoryAPI();
  }, [fetchAllWebcategoryAPI,apiRoute, userId]);
  /*-------------------------------------------------------update Blog-----------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();
    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("title", title);
    bodyContent.append("blog_image", selectedImages);
    bodyContent.append("detail", value);
    bodyContent.append("meta", title); //
    bodyContent.append("desc", desc);
    bodyContent.append("status", status);
    bodyContent.append("sdesc", shotDesc);
    bodyContent.append("seeds", seeds);
    bodyContent.append("catId", preCatId);
    let response = await fetch(`${apiRoute}/addblog`, {
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
      toastId.current = toast.loading("Updating Blog");
    }
    {
      data1.Status === true ? successPopup() : failPopup();
    }
    {
      data1.Status === true ? router.push("/Blogs") : "";
    }
  }
  /**----------------------------------------------------------------update blog--------------------------------------------- */
  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Add Blog</h2>
            <p>Add blog info and extras.</p>
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
                  <div className="input-head">Blog Title/Name</div>
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
                  <div className="input-head">Blog Category</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <FormControl fullWidth>
                      <Select
                        defaultValue={preCatId?.catId}
                        value={preCatId?.categoryName}
                        onChange={handleCat}
                        style={{ fontSize: "14px" }}
                      >
                        {blogCat?.map((list, i) => {
                          return (
                            <MenuItem value={list.catId} key={list.catId}>
                              {list.catTitle}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Description</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Textarea
                      disabled={false}
                      minRows={2}
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
                  <div className="input-head">Blog Images</div>
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
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Seeds</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={seeds}
                      onChange={(e) => {
                        setSeeds(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Blog Details</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <ReactQuill
                      theme="snow"
                      value={value}
                      onChange={setValue}
                      style={{ height: "200px", marginBottom: "100px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Blogs Speech Content</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <div className="input-field">
                      <Textarea
                        disabled={false}
                        minRows={2}
                        size="lg"
                        variant="soft"
                        placeholder=""
                        value={shotDesc}
                        style={{ padding: "12px 15px", fontSize: "15px" }}
                        onChange={(e) => setShotDesc(e.target.value)}
                      />
                    </div>
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
                    href="/Blogs"
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
                    Add Blog{" "}
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
