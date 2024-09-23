"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
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
import axios from "axios";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export default function Blogdetail({ params }) {
  const apiRoute = process.env.API_ROUTE;
  // const userId = process.env.USER_ID;
const userData = JSON.parse(localStorage.getItem("loginResponse"));
const userId = userData?.Data?.userId;
//console.log("first", userId);
  let router = useRouter();

  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [value1, setValue] = useState("<p>hey this is text editor</p>");
  const [title, setTitle] = useState();
  const [shotDesc, setShortDesc] = useState();
  const [selectedImages, setSelectedImages] = useState(null);
  const [seeds, setSeeds] = useState();
  const [voiceText, setVoiceText] = useState();
  const [status, setStatus] = useState();
  const [preCatId, setPreCatId] = useState();
  const [preCatName, setPrevCatName] = useState();
  const [blogCat, setBlogCat] = useState();

  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
    //  console.log(selectedImages)
  };

  const handleQuillChange = (value) => {
    // Replace <p> with <div> in the HTML content
    const modifiedContent = value
      .replace(/<p>/g, `<div>`)
      .replace(/<\/p>/g, "</div>");
    // Set the modified content to state
    setValue(modifiedContent);
  };

  const changeStatus = () => {
    //  console.log(status)
    if (status == 1) {
      setStatus("0");
    } else {
      setStatus("1");
    }
  };

  /**---fetch all blog category--- */
  const fetchAllAppcategoryAPI = useCallback(() => {
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
    });
  }, [apiRoute, userId]);

  const handleCat = (event) => {
    setPreCatId(event.target.value);
    //setPrevCatName(event.target.value)
    // console.log(event.target.value)
  };
  /**----fetch all blog category----- */

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ userId: `${userId}`, blogId: params.slug });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/detailblog`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setValue(result.Data.blog_detail);
        setTitle(result.Data.blog_title);
        setShortDesc(result.Data.short_desc);
        setSelectedImages(result.Data.blog_image);
        setStatus(result.Data.status);
        setVoiceText(result.Data.voiceText);
        setSeeds(result.Data.seeds);
        setPreCatId(result.Data.catId);
        setPrevCatName(result.Data.catName);
        setLoading(false);
      });
    //  .catch(error => console.log('error', error))

    fetchAllAppcategoryAPI();
  }, [fetchAllAppcategoryAPI,params.slug, apiRoute, userId]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No profile data</p>;
  /*-------------------------------------------------------update Blog-----------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();

    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("blogId", data._id);
    bodyContent.append("title", title);
    bodyContent.append("blog_image", selectedImages);
    bodyContent.append("meta", data.meta_title); //
    bodyContent.append("detail", value1);
    bodyContent.append("desc", value1);
    bodyContent.append("status", status);
    bodyContent.append("sdesc", shotDesc);
    bodyContent.append("voiceText", voiceText);
    bodyContent.append("seeds", seeds);
    bodyContent.append("catId", preCatId);

    let response = await fetch(`${apiRoute}/editblog`, {
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
  }
  /**----------------------------------------------------------------update blog--------------------------------------------- */
  /**--------------------------------------------------------------------delete Blog------------------------------ */
  async function deleteBlog() {
    pendingPopup1();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userId: `${userId}`,
      blogId: [data._id],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let deleteResponse = await fetch(`${apiRoute}/deleteblog`, requestOptions);
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

    let deleteData = await deleteResponse.json();

    function successPopup1() {
      toast.success(`${deleteData.Message}`);
      toast.dismiss(toastId.current);
    }
    function failPopup1() {
      toast.error(`${deleteData.Message}`);
      toast.dismiss(toastId.current);
    }
    function pendingPopup1() {
      toastId.current = toast.loading("Deleting Blog");
    }

    {
      deleteData.Status === true ? successPopup1() : failPopup1();
    }
    {
      deleteData.Status === true ? router.push("/Blogs") : "";
    }
  }
  /**--------------------------------------------------------------------delete Blog------------------------------- */
  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Update Blog</h2>
            <p>Update blog info and extras.</p>
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
                  <div className="input-head">Category</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <FormControl fullWidth>
                      <Select
                        defaultValue={preCatName}
                        value={preCatId}
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
                  <div className="input-head">Short Description</div>
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
                  <div className="input-head">Blog Images</div>
                </div>
                <div className="col-md-8">
                  <div
                    className="input-field"
                    style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                  >
                    <Image
                      src={data.blog_image}
                      alt={data.blog_title}
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
                  <div className="input-head">Coins</div>
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

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Blog Details</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    {/* <TextEditor item={data.blog_desc} /> */}
                    <ReactQuill
                      theme="snow"
                      value={value1}
                      onChange={handleQuillChange}
                      modules={modules}
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
                        value={voiceText}
                        style={{ padding: "12px 15px", fontSize: "15px" }}
                        onChange={(e) => setVoiceText(e.target.value)}
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
                    href="/Blogs"
                  >
                    {" "}
                    Back{" "}
                  </Link>
                </div>
                <div className="col-md-4">
                  <Button
                    variant="outlined"
                    color="error"
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      padding: "10px",
                      textTransform: "capitalize",
                    }}
                    onClick={deleteBlog}
                  >
                    {" "}
                    Delete Blog{" "}
                  </Button>
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
                    Update Blog{" "}
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
