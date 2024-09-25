"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Input from "@mui/joy/Input";
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

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Textarea } from "@mui/joy";

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
    // ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export default function Blogdetail({ params }) {
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
  const [value1, setValue] = useState("<p>hey this is text editor</p>");
  const [title, setTitle] = useState();
  const [shotDesc, setShortDesc] = useState();
  const [selectedImages, setSelectedImages] = useState(null);
  const [voiceText, setVoiceText] = useState();
  const [status, setStatus] = useState();
  const [preCatId, setPreCatId] = useState();
  const [preCatName, setPrevCatName] = useState();
  const [blogCat, setBlogCat] = useState();
  const [author, setAuthor] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [date, setDate] = useState("");
  const [beginDate, setBeginDate] = useState("");

  //  const beginDate = date ? dayjs(date).format('YYYY-MM-DD') : '';

  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
    //  console.log(selectedImages)
  };

  const handleQuillChange = (value) => {
    const letterSpacing = "20px";
    const fontSize = "18px";
    const fontFamily = "Montserrat, sans-serif";
    // Replace <p> with <div> in the HTML content
    // const modifiedContent = value.replace(/<p>/g, `<div style="letter-spacing: ${letterSpacing}; font-size: ${fontSize};font-family: ${fontFamily};">`).replace(/<\/p>/g, '</div>');
    const modifiedContent = value;
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
  const fetchAllWebcategoryAPI = () => {
    let data = JSON.stringify({ userId: `${userData?.Data?.userId}` });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/listblogcat`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      setBlogCat(response.data.Data);
    });
  };

  const handleCat = (event) => {
    setPreCatId(event.target.value);
    //setPrevCatName(event.target.value)
    // console.log(event.target.value)
  };
  /**----fetch all blog category----- */

  useEffect(() => {
    const getDetails=()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      userId: `${userData?.Data?.userId}`,
      webBlogId: params.slug,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/detailwebblog`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setValue(result.Data.webBlog_detail);
        setTitle(result.Data.webBlog_title);
        setShortDesc(result.Data.short_desc);
        setSelectedImages(result.Data.webBlog_image);
        setStatus(result.Data.status);
        setVoiceText(result.Data.voiceText);
        setPreCatId(result.Data.catId);
        setPrevCatName(result.Data.catName); //date
        setDate(result.Data.date);
        setMetaTitle(result.Data.metaTitle);
        setMetaDesc(result.Data.metaDesc);
        setMetaKeyword(result.Data.metaKeyword);
        setAuthor(result.Data.author);
        setLoading(false);
      });
    }
    console.log("first");
    if (userData) {
      fetchAllWebcategoryAPI();
      getDetails()
    }
  }, [ params.slug, apiRoute, userData]);

  useEffect(() => {
    // Update beginDate whenever date changes
    if (date) {
      setBeginDate(dayjs(date).format("YYYY-MM-DD"));
    }
  }, [date]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No profile data</p>;
  /*-------------------------------------------------------update Blog-----------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();

    let bodyContent = new FormData();
    bodyContent.append("userId", `${userData?.Data?.userId}`);
    bodyContent.append("webBlogId", data._id);
    bodyContent.append("catId", preCatId);
    bodyContent.append("title", title);
    bodyContent.append("blog_image", selectedImages);
    bodyContent.append("date", beginDate);
    bodyContent.append("status", status);
    bodyContent.append("detail", value1);
    bodyContent.append("metaTitle", metaTitle);
    bodyContent.append("metaDesc", metaDesc);
    bodyContent.append("metaKeyword", metaKeyword);
    // bodyContent.append("desc", value1);
    // bodyContent.append("meta", data.meta_title); //
    // bodyContent.append("sdesc", shotDesc);
    // bodyContent.append("voiceText", voiceText);

    let response = await fetch(`${apiRoute}/editwebblog`, {
      method: "POST",
      body: bodyContent,
    });

    const data1 = await response.json();
    console.log(date);
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
      userId: `${userData?.Data?.userId}`,
      webBlogId: [data.webBlogId],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let deleteResponse = await fetch(
      `${apiRoute}/deletewebblog`,
      requestOptions
    );
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
      deleteData.Status === true ? router.push("/Webblogs") : "";
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
                    <Image
                      src={data.webBlog_image}
                      alt={data.webBlog_title}
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
                  <div className="input-head">Publish Date</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    {!isLoading && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="YYYY-MM-DD"
                            format="YYYY - MM - DD"
                            value={dayjs(date)}
                            onChange={(newValue) => {
                              setDate(newValue);
                            }}
                            disableFuture
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    )}
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
                    href="/Webblogs"
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
