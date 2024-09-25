"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import Loader from "@/app/component/Loader";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Caretakerdetail({ params }) {
  let router = useRouter();
  const apiRoute = process.env.API_ROUTE;
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
  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState(null);
  const [reportList, setReportList] = useState([]);

  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
    //  console.log(selectedImages)
  };

  const fetchSpeciesDetail = useCallback(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      userId: `${userId}`,
      postId: params.slug,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/reportPostDetail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setSelectedImages(result.Data.post_image);
        setReportList(result.Data.reportList);
        setLoading(false);
      });
    //  .catch(error => console.log('error', error))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiRoute, params.slug]);

  useEffect(() => {
    fetchSpeciesDetail();
  }, [fetchSpeciesDetail]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No data</p>;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    userId: `${userId}`,
    postId: params.slug,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const rejectReport = async () => {
    pendingPopup();
    let response = await fetch(`${apiRoute}/ignorePostReport`, requestOptions);
    const data1 = await response.json();
    {
      data1.Status === true ? successPopup(data1) : failPopup(data1);
    }
    {
      data1.Status === true ? router.push("/ReportPost") : "";
    }
  };

  const approveReport = async () => {
    pendingPopup();
    let response = await fetch(`${apiRoute}/disablePost`, requestOptions);
    const data1 = await response.json();
    console.log(data1);
    {
      data1.Status === true ? successPopup(data1) : failPopup(data1);
    }
    {
      data1.Status === true ? router.push("/ReportPost") : "";
    }
  };

  function successPopup(data1) {
    toast.success(`${data1.Message}`);
    toast.dismiss(toastId.current);
  }
  function failPopup(data1) {
    toast.error(`${data1.Message}`);
    toast.dismiss(toastId.current);
  }
  function pendingPopup() {
    toastId.current = toast.loading("Updating Detail");
  }
  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Query Detail</h2>
          </div>
        </div>

        <div
          className="row"
          style={{ borderBottom: "1px solid #e1e1e1", marginBottom: "25px" }}
        >
          <div className="col-md-3">
            <div className="product_detail_tabs">
              <li className="active">Post Info</li>
            </div>
          </div>
          <div className="col-md-5"></div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="">
              {/*-------------------------------------------------------------------------------------------------------------------------- */}
              <div className="row">
                <div className="col-md-2">
                  <div className="input-head"> User Name</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.postUserName}
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="input-head"> User ID</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.postUserId}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <div className="input-head"> Activity Name</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.activityName || "nill"}
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="input-head"> Caption </div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.caption || "nill"}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <div className="input-head">Site Images</div>
                </div>
                <div className="col-md-10">
                  <div
                    className="input-field"
                    style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                  >
                    <Image
                      src={selectedImages}
                      alt="site image"
                      width={200}
                      height={200}
                      style={{ marginRight: "10px", border: "1px solid #000" }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <div className="input-head">Date</div>
                </div>
                <div className="col-md-10">
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
                <div className="col-md-12">
                  <table className="table-bordered table table-hover table-condensed table-responsive table-striped">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportList.map((item, i) => (
                        <tr key={i}>
                          <td>{item.userName}</td>
                          <td>{item.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                    href="/Walkforwater"
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
                    onClick={rejectReport}
                  >
                    {" "}
                    Reject{" "}
                  </Button>
                </div>

                <div className="col-md-4">
                  <Button
                    variant="contained"
                    color="success"
                    style={{ width: "100%", fontSize: "15px", padding: "10px" }}
                    onClick={approveReport}
                  >
                    {" "}
                    Approve
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
