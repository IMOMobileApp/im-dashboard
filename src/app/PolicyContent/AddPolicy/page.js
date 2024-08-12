"use client";
import { useState, useRef } from "react";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import FormData from "form-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export default function Addblog() {
  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
  let router = useRouter();
  const toastId = useRef(null);
  const [title, setTitle] = useState();
  const [value, setValue] = useState("");

  /*-------------------------------------------------------update Policy--------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();
    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("policyName", title);
    bodyContent.append("policyText", value);
    let response = await fetch(`${apiRoute}/addpolicy`, {
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
    {
      data1.Status === true ? router.push("/PolicyContent") : "";
    }
  }
  /**----------------------------------------------------------------update blog--------------------------------------------- */
  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Add policy</h2>
            <p>Add policy info and extras.</p>
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

              {/* <div className="row">
                                <div className="col-md-4">
                                    <div className="input-head">Policy Image</div>
                                </div>
                                <div className="col-md-8">
                                    <div className="input-field" style={{border:'1px dashed #d5d6d7',padding:'20px'}}>
                                     <Image src={data.blog_image} alt={data.blog_title}  width={200} height={200}/>
                                    <Button component="label" variant="contained" startIcon={<UploadFileIcon />} style={{textAlign:'center'}}>Upload file
                                    <input type="file" name="images" onChange={onSelectFile}  multiple accept="image/png , image/jpeg, image/webp"  style={{opacity:'0'}}/> 
                                    </Button>
                                    { selectedImages === ! null ? '' : selectedImages.name}
                                    </div>
                                </div>
                              </div> */}

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Policy Details</div>
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
                    Add Policy{" "}
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
