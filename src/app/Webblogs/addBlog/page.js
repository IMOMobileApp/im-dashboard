"use client";
import { useEffect, useState, useRef, useCallback } from "react";
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

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Addblog() {
  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
  let router = useRouter();
  const toastId = useRef(null);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [selectedImages, setSelectedImages] = useState(null);
  const [value, setValue] = useState("<p></p>");
  const [status, setStatus] = useState("1");
  const [blogCat, setBlogCat] = useState();
  const [preCatId, setPreCatId] = useState();
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");

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

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    // handlers: {
    //   image: this.imageHandler
    // },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const fetchAllWebcategoryAPI = useCallback(() => {
    let data = JSON.stringify({ userId: `${userId}` });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/listblogcat`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      setBlogCat(response.data.Data);
      setPreCatId(response.data.Data[0]); // setting the initial category name and id
    });
  }, [apiRoute, userId]);

  const handleCat = (event) => {
    setPreCatId(event.target.value);
    //setPrevCatName(event.target.value)
    // console.log(event.target.value)
  };
  /**----fetch all blog category----- */
  useEffect(() => {
    fetchAllWebcategoryAPI();
  }, [fetchAllWebcategoryAPI,apiRoute, userId]);
  /*-------------------------------------------------------update Blog-----------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();
    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("catId", preCatId);
    bodyContent.append("title", title);
    bodyContent.append("blog_image", selectedImages);
    bodyContent.append("desc", desc);
    bodyContent.append("detail", value);
    bodyContent.append("date", date);
    bodyContent.append("status", status);
    bodyContent.append("author", author);
    bodyContent.append("metaTitle", metaTitle);
    bodyContent.append("metaDesc", metaDesc);
    bodyContent.append("metaKeyword", metaKeyword);
    // bodyContent.append("sdesc", shotDesc);
    //  bodyContent.append("voiceText", shotDesc);
    let response = await fetch(`${apiRoute}/addwebblog`, {
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
      data1.Status === true ? router.push("/Webblogs") : "";
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
                              {list.categoryName}
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
                  <div className="input-head">Blog Images</div>
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
                    {selectedImages == null ? "" : selectedImages.name}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Author</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        {" "}
                        <DatePicker
                          label="YYYY-MM-DD"
                          format="YYYY - MM - DD"
                          value={dayjs(date)}
                          onChange={(newValue) => {
                            setDate(dayjs(newValue).format("YYYY-MM-DD"));
                          }}
                          disableFuture
                        />{" "}
                      </DemoContainer>
                    </LocalizationProvider>

                    {/* <Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={`${new Date(data.createdAt).getDate()}/${new Date(data.createdAt).getMonth()}/${new Date(data.createdAt).getFullYear()}`} disabled/> */}
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
                      value={value}
                      onChange={setValue}
                      style={{ height: "400px", marginBottom: "100px" }}
                      modules={modules}
                      // forwardedRef={editorRef}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Meta Title</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Meta Description</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Textarea
                      disabled={false}
                      minRows={4}
                      size="xl"
                      placeholder="Meta Description"
                      value={metaDesc}
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      onChange={(e) => setMetaDesc(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Meta Keyword</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={metaKeyword}
                      onChange={(e) => setMetaKeyword(e.target.value)}
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
                    href="/Webblogs"
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
              {/*-------------------------------------------------------------------------------------------------------------- */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
