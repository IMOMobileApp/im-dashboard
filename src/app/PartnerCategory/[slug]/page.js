"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import Loader from "@/app/component/Loader";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Switch from "@mui/material/Switch";

export default function Caretakerdetail({ params }) {
  let router = useRouter();
  const apiRoute = process.env.API_ROUTE;
  //const [,] = useState();
  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState();
  const [status, setStatus] = useState();
  const [content, setContent] = useState();
  const [userData, setUserData] = useState();
  useEffect(() => {
    const storedData = localStorage.getItem("loginResponse");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const fetchCaretakerDetail = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      userId: `${userData?.Data?.userId}`,
      catId: params.slug,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/governancecatdetail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setName(result.Data.catName);
        setDesignation(result.Data.sequence);
        setContent(result.Data.content);
        setStatus(result.Data.status);
        setLoading(false);
      });
    //  .catch(error => console.log('error', error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    if (userData) {
      fetchCaretakerDetail();
    }
  }, [userData]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No profile data</p>;
  /*-------------------------------------------------------update caretaker---------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      userId: `${userData?.Data?.userId}`,
      catId: data.catId,
      catName: name,
      sequence: designation,
      status: status,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/updategovernancecat`,
      requestOptions
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

  /**--------------------------------------------------------------------delete ------------------------------- */

  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Category Detail</h2>
            <p>Partner Category info and extras.</p>
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
                  <div className="input-head">Series no.</div>
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
                      type="number"
                      min="1"
                      max="100"
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
                    href="/PartnerCategory"
                  >
                    {" "}
                    Back{" "}
                  </Link>
                </div>
                {/* <div className='col-md-4'>
                              <Button variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', textTransform:'capitalize'}} onClick={deleteBlog}>  Delete Category </Button>
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
