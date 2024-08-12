"use client";

import { useEffect, useState, useRef, useMemo } from "react";

import Input from "@mui/joy/Input";
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

export default function Policydetail({ params }) {
  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
  let router = useRouter();

  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [value1, setValue] = useState("<p>hey this is text editor</p>");
  const [title, setTitle] = useState();
  const [selectedImages, setSelectedImages] = useState(null);
  //   const [status, setStatus] = useState()
  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
    //  console.log(selectedImages)
  };

  const handleQuillChange = (value) => {
    // Replace <p> with <div> in the HTML content
    // const modifiedContent = value.replace(/<p>/g, `<div>`).replace(/<\/p>/g, '</div>');
    // Set the modified content to state
    //  setValue(modifiedContent);
    setValue(value);
  };
  {
    /*  const MemoizedReactQuill = useMemo(({ value, onChange, modules, style }) => (
        <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} style={style} />
	)); */
  }

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ userId: `${userId}`, policyId: params.slug });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/policydetail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setValue(result.Data.policyText);
        setTitle(result.Data.policyName);
        setSelectedImages(result.Data.policy_image);
        setLoading(false);
      });
    //  .catch(error => console.log('error', error))
  }, [params.slug, apiRoute, userId]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No profile data</p>;
  /*-------------------------------------------------------update Blog-----------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    const modifiedContent = value1
      .replace(/<p>/g, `<div>`)
      .replace(/<\/p>/g, "</div>");
    pendingPopup();

    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("policyId", params.slug);
    bodyContent.append("policyName", title);
    bodyContent.append("about_image", selectedImages);
    bodyContent.append("policyText", modifiedContent);

    let response = await fetch(`${apiRoute}/editpolicy`, {
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
      toastId.current = toast.loading("Updating Policy");
    }

    {
      data1.Status === true ? successPopup() : failPopup();
    }
  }
  /**----------------------------------------------------------------update blog--------------------------------------------- */
  /**--------------------------------------------------------------------delete Blog------------------------------ */
  // async function deleteBlog(){
  //   pendingPopup1()
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({ "userId": `${userId}`, "blogId": [data._id]});

  //   var requestOptions = {method: 'POST',headers: myHeaders,body: raw,redirect: 'follow'};
  //  let deleteResponse = await fetch(`${apiRoute}/deleteblog`, requestOptions)
  //     let deleteData = await deleteResponse.json()
  //     function successPopup1(){
  //       toast.success(`${deleteData.Message}` )
  //       toast.dismiss(toastId.current);
  //                              }
  //     function failPopup1(){
  //     toast.error(`${deleteData.Message}`)
  //     toast.dismiss(toastId.current);
  //                         }
  //     function pendingPopup1(){
  //       toastId.current =  toast.loading('Deleting Blog') }
  //     { deleteData.Status === true  ?    successPopup1() : failPopup1()}
  //     { deleteData.Status === true  ? router.push('/Blogs') : ''}

  // }
  /**--------------------------------------------------------------------delete Blog------------------------------- */

  //   (function () {
  //     if (typeof EventTarget !== "undefined") {
  //         let func = EventTarget.prototype.addEventListener;
  //         EventTarget.prototype.addEventListener = function (type, fn, capture) {
  //             this.func = func;
  //             if(typeof capture !== "boolean"){
  //                 capture = capture || {};
  //                 capture.passive = false;
  //             }
  //             this.func(type, fn, capture);
  //         };
  //     };
  // }());
  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Update Policy</h2>
            <p>Update policy info and extras.</p>
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
                  <div className="input-head">Policy Title/Name</div>
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

              {data.policy_image ? (
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-head">Policy Image</div>
                  </div>
                  <div className="col-md-8">
                    <div
                      className="input-field"
                      style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                    >
                      <Image
                        src={data.policy_image}
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
              ) : (
                ""
              )}

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
                <div className="col-md-4">
                  <div className="input-head">Policy Details</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <ReactQuill
                      theme="snow"
                      value={value1}
                      onChange={handleQuillChange}
                      modules={modules}
                      style={{ height: "200px", marginBottom: "100px" }}
                    />
                    {/*  <MemoizedReactQuill
  value={value1}
  onChange={handleQuillChange}
  modules={modules}
  style={{ height: '200px', marginBottom: '100px' }}
/>*/}
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
                    href="/PolicyContent"
                  >
                    {" "}
                    Back{" "}
                  </Link>
                </div>
                {/* <div className='col-md-4'>
                              <Button variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px'}} onClick={deleteBlog}>  Delete Policy </Button>
                              </div> */}
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
                    Update Policy{" "}
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
