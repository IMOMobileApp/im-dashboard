"use client";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Input from "@mui/joy/Input";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";
import FormData from "form-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Addblog({ params }) {
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
  const [title, setTitle] = useState();
  const [url, setUrl] = useState([]);
  const [status, setStatus] = useState("1");
  //const [data, setData] = useState();
  const [date, setDate] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const changeStatus = () => {
    if (status == 1) {
      setStatus("0");
    } else {
      setStatus("1");
    }
  };
  const fetchAllWebcategoryAPI = () => {
    let data = JSON.stringify({
      userId: `${userData?.Data?.userId}`,
      videoId: `${params.slug1}`,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/detailwebvideo`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      setTitle(response.data.Data.title);
      setUrl(response.data.Data.url);
      setStatus(response.data.Data.status);
      setDate(response.data.Data.date);
    });
  }

  useEffect(() => {
    if (date) {
      setBeginDate(dayjs(date).format("YYYY-MM-DD"));
    }
  }, [date]);

  useEffect(() => {
    if(userData){
    fetchAllWebcategoryAPI();
    }
  }, [userData]);
  /*-------------------------------------------------------update album--------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    let data = JSON.stringify({
      userId: `${userData?.Data?.userId}`,
      videoId: `${params.slug1}`,
      initiativeId: `${params.slug}`,
      title: title,
      url: url,
      date: beginDate,
      status: status,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/editwebvideo`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };

    axios.request(config).then((response) => {
      //  pendingPopup()
      console.log(response.data);

      const data1 = response.data;
      function successPopup() {
        toast.success(`${data1.Message}`);
        toast.dismiss(toastId.current);
      }
      function failPopup() {
        toast.error(`${data1.Message}`);
        toast.dismiss(toastId.current);
      }
      function pendingPopup() {
        toastId.current = toast.loading("Adding Video");
      }

      {
        data1.Status === true ? successPopup() : failPopup();
      }
      {
        data1.Status === true
          ? router.push(`/InitiativeVideos/${params.slug}`)
          : "";
      }
    });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Add Videos</h2>
            <p>Add Videos info and extras.</p>
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
                  <div className="input-head">Video Title/Name</div>
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
                  <div className="input-head">Video URL</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
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
                        <DatePicker
                          label="YYYY-MM-DD"
                          format="YYYY - MM - DD"
                          value={dayjs(date)}
                          onChange={(newValue) => {
                            setDate(dayjs(newValue).format("YYYY-MM-DD"));
                          }}
                          disableFuture
                        />
                      </DemoContainer>
                    </LocalizationProvider>
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
                    href={`/InitiativeVideos/${params.slug}`}
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
                    Update Video{" "}
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
