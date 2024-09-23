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

export default function Initiativeactegorydetail({ params }) {
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

  const fetchInitiativeDetail = useCallback(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      userId: `${userId}`,
      initiativeId: params.slug,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/detailinitiative`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setStatus(result.Data.status);
        setName(result.Data.title);
        // setScienceName(result.Data.scienceName)
        setLoading(false);
      });
    //  .catch(error => console.log('error', error))
  }, [apiRoute, params.slug]);

  useEffect(() => {
    fetchInitiativeDetail();
  }, [fetchInitiativeDetail]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No data</p>;
  /*-------------------------------------------------------update category---------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      userId: `${userId}`,
      initiativeId: params.slug,
      title: name,
      status: status,
    });

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/editinitiative`,
      { method: "POST", body: raw, headers: myHeaders }
    );

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
  }
  /**----------------------------------------------------------------update category--------------------------------------------- */
  /**--------------------------------------------------------------------delete category------------------------------ */
  // async function deleteCategory(){
  //   pendingPopup1()
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     "userId": `${userId}`,
  //     "catId": params.slug
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //  let deleteResponse = await fetch(`${apiRoute}/deleteblogcat`, requestOptions)
  //     // .then(response => response.text())
  //     // .then(result => console.log(result))
  //     // .catch(error => console.log('error', error));

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
  //     { deleteData.Status === true  ? router.push('/WebBlogCategories') : ''}

  // }
  /**--------------------------------------------------------------------delete category------------------------------- */

  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Category Detail</h2>
            <p>Update blog category info and extras.</p>
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
                  <div className="input-head">Category Name</div>
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
                    href="/InitiativeCategory"
                  >
                    {" "}
                    Back{" "}
                  </Link>
                </div>
                {/* <div className='col-md-4'>
                              <Button variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', textTransform:'capitalize'}} onClick={deleteCategory}>  Delete Category </Button>
                              </div> */}

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
