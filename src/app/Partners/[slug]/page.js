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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function Caretakerdetail({ params }) {
  let router = useRouter();
  const apiRoute = process.env.API_ROUTE;
  //const [,] = useState();
  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState();
  const [content, setContent] = useState();
  const [facebook, setFacebook] = useState();
  const [twitter, setTwitter] = useState();
  const [linkedin, setLinkedin] = useState();
  const [sequence, setSequence] = useState();
  //const [type, setType] = useState("");
  //const [typeId, setTypeId] = useState()
  const [status, setStatus] = useState();

  const [catList, setCatList] = useState();

  const [preCatId, setPreCatId] = useState();
  const [preCatName, setPrevCatName] = useState();

  const handleAns = (event) => {
    //setType(event.target.value); console.log(event.target.name)
    // setType(event.target.value)
    setPreCatId(event.target.value);
  };

  const [selectedImages, setSelectedImages] = useState(null);
  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
  };

  const fetchCaretakerDetail = useCallback(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      userId: `${process.env.NEXT_PUBLIC_USERID}`,
      governId: params.slug,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/governancedetail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setName(result.Data.name);
        setDesignation(result.Data.designation);
        setContent(result.Data.content);
        // setType(result.Data.type)
        //setTypeId(result.Data.typeId)
        setSequence(result.Data.sequence);
        setPreCatId(result.Data.typeId);
        setPrevCatName(result.Data.type);
        setStatus(result.Data.status);

        setSelectedImages(result.Data.image);
        setLoading(false);
      });
    //  .catch(error => console.log('error', error))
  }, [apiRoute, params.slug]);

  const fetchAllPartnerCategory = useCallback(() => {
    let data = JSON.stringify({ userId: `${process.env.NEXT_PUBLIC_USERID}` });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/governancecatlist`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      setCatList(response.data.Data);
      //  console.log(response.data.Data)
    });
    // .catch((error) => {  console.log(error);  });
  }, [apiRoute]);

  useEffect(() => {
    fetchCaretakerDetail();
    fetchAllPartnerCategory();
  }, [fetchCaretakerDetail,fetchAllPartnerCategory]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No profile data</p>;
  /*-------------------------------------------------------update caretaker---------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();
    let bodyContent = new FormData();
    bodyContent.append("userId", `${process.env.NEXT_PUBLIC_USERID}`);
    bodyContent.append("governId", data.governId);
    bodyContent.append("add_image", selectedImages);
    bodyContent.append("name", name);
    bodyContent.append("designation", designation);
    bodyContent.append("status", status);
    bodyContent.append("content", content);
    bodyContent.append("sequence", sequence);
    bodyContent.append("type", preCatId);

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/updategovernance`,
      { method: "POST", body: bodyContent }
    );

    const data1 = await response.json();
    // console.log(data1)

    function successPopup() {
      toast.success(`${data1.Message}`);
      toast.dismiss(toastId.current);
      router.back()
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
  }
  /**----------------------------------------------------------------update caretaker--------------------------------------------- */
  /**--------------------------------------------------------------------delete ------------------------------ */
  async function deleteBlog() {
    pendingPopup1();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userId: `${process.env.NEXT_PUBLIC_USERID}`,
      governId: [data.governId],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let deleteResponse = await fetch(
      `${apiRoute}/deletegovernance`,
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
      toastId.current = toast.loading("Deleting Partner");
    }

    {
      deleteData.Status === true ? successPopup1() : failPopup1();
    }
    {
      deleteData.Status === true ? router.push("/Partners") : "";
    }
  }
  /**--------------------------------------------------------------------delete ------------------------------- */

  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Founder Detail</h2>
            <p>Update Founder info and extras.</p>
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
                  <div className="input-head"> Name</div>
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
                  <div className="input-head">Designation</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Founder Image</div>
                </div>
                <div className="col-md-8">
                  <div
                    className="input-field"
                    style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                  >
                    <Image
                      src={data.image}
                      alt="project image"
                      width={200}
                      height={200}
                    />
                    {/* {selectedImages.map((i,r)=>{return <Image src={i.pro_image}  width={200} height={200} key={i._id} alt="project gallery"/> })} */}
                    <p></p>
                    <br />
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
                        accept="image/png , image/jpeg, image/webp"
                        style={{ opacity: "0" }}
                      />
                    </Button>{" "}
                    <br />
                    {selectedImages === !null ? "" : selectedImages.name}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Introduction</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Type</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    {/* <Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={type} onChange={(e)=>setType(e.target.value)}/> */}
                    <FormControl fullWidth>
                      <Select
                        defaultValue={preCatName}
                        value={preCatId}
                        onChange={handleAns}
                        style={{ fontSize: "14px" }}
                      >
                        {catList?.map((item, i) => (
                          <MenuItem
                            value={item.catId}
                            key={item.catId}
                            name={item.catName}
                          >
                            {item.catName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Sequence</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={sequence}
                      onChange={(e) => setSequence(e.target.value)}
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
                      onChange={() => setStatus(status == 1 ? 5 : 1)}
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
                      placeholder="Type in here…"
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
                    href="/Partners"
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
                    Delete Partner{" "}
                  </Button>
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
