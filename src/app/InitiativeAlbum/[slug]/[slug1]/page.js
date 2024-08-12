"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Input from "@mui/joy/Input";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";
import FormData from "form-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Loader from "@/app/component/Loader";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Addblog({ params }) {
  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
  let router = useRouter();
  const toastId = useRef(null);

  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [selectedImages, setSelectedImages] = useState(null);
  const [galleryimages, setGalleryimages] = useState([]);
  const [status, setStatus] = useState(true);
  const [data, setData] = useState();

  const [date, setDate] = useState("");
  const [beginDate, setBeginDate] = useState("");

  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
    console.log(selectedImages);
  };
  const changeStatus = () => {
    if (status == 1) {
      setStatus("0");
    } else {
      setStatus("1");
    }
  };

  const fetchAllWebcategoryAPI = useCallback(() => {
    let data = JSON.stringify({
      userId: `${userId}`,
      catId: `${params.slug1}`,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/detailalbumcat`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      setData(response.data.Data);
      setTitle(response.data.Data.title);
      setStatus(response.data.Data.status);
      setSelectedImages(response.data.Data.image);
      setDate(response.data.Data.date);
      setLoading(false);
    });
  }, [params.slug1, apiRoute, userId]);

  /**----fetch all album----- */
  /**---fetch all gallery album images--- */
  const fetchAllalbumImages = useCallback(() => {
    let data = JSON.stringify({
      userId: `${userId}`,
      catId: `${params.slug1}`,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/listalbum`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      setGalleryimages(response.data.Data);
      setLoading(false);
    });
  }, [params.slug1, apiRoute, userId]);
  useEffect(() => {
    fetchAllWebcategoryAPI();
    fetchAllalbumImages();
  }, [fetchAllalbumImages, fetchAllWebcategoryAPI, apiRoute, userId]);

  useEffect(() => {
    if (date) {
      setBeginDate(dayjs(date).format("YYYY-MM-DD"));
    }
  }, [date]);

  const onSelectGallery = async (e) => {
    const nowImage = Array.from(e.target.files);
    console.log(nowImage, typeof nowImage);
    let bodyContent = new FormData();
    bodyContent.append("userId", `${process.env.NEXT_PUBLIC_USERID}`);
    bodyContent.append("catId", `${params.slug1}`);
    //bodyContent.append("album_image", nowImage);
    bodyContent.append("status", status);

    // Append each image separately with a unique key and append in bodyContent
    nowImage.forEach((image, index) => {
      bodyContent.append("album_image", image);
    });

    await fetch(`${apiRoute}/addalbum`, {
      // Adding method type
      method: "POST",
      // Adding body or contents to send
      body: bodyContent,
    })
      .then(setLoading(true))
      // Converting to JSON
      .then(() => {
        // Adding a delay of 4 seconds (4000 milliseconds) before calling fetchProjectDetail()
        setTimeout(() => {
          fetchAllalbumImages();
        }, 100);
        setLoading(false);
      });
    // .then(fetchProjectDetail())
  };
  /**---------------add gallery album images----------- */
  /**---delete album gallery image-------- */
  const deleteGalleryImage = async (e) => {
    const imgId = e;
    console.log(e);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    await fetch(`${apiRoute}/deletealbum`, {
      // Adding method type
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      // Adding body or contents to send
      body: JSON.stringify({
        userId: `${process.env.NEXT_PUBLIC_USERID}`,
        albumId: [imgId],
      }),
    }).then(fetchAllalbumImages());
  };
  /**---delete album gallery image-------- */

  if (isLoading) return <Loader />;
  if (!data) return <p>No profile data</p>;
  /*-------------------------------------------------------update album--------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();
    console.log(title, selectedImages, status, date);

    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("catId", `${params.slug1}`);
    bodyContent.append("title", title);
    bodyContent.append("albumCat_image", selectedImages);
    bodyContent.append("status", status);
    bodyContent.append("initiativeId", `${params.slug}`);
    bodyContent.append("date", beginDate);

    let response = await fetch(`${apiRoute}/editalbumcat`, {
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
      toastId.current = toast.loading("Updating Album");
    }
    {
      data1.Status === true ? successPopup() : failPopup();
    }
    // { data1.Status === true  ? router.push(`/InitiativeAlbum/${params.slug}`) : ''}
  }
  /**----------------------------------------------------------------update album--------------------------------------------- */
  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2> Album Detail</h2>
            <p> Album info and extras.</p>
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
                  <div className="input-head">Album Title/Name</div>
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
                  <div className="input-head">Album Image</div>
                </div>
                <div className="col-md-8">
                  <div
                    className="input-field"
                    style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                  >
                    {selectedImages ? (
                      <Image
                        src={selectedImages}
                        alt={title}
                        width={100}
                        height={100}
                      />
                    ) : (
                      ""
                    )}

                    <p></p>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<UploadFileIcon />}
                      style={{ textAlign: "center" }}
                    >
                      Change image
                      <input
                        type="file"
                        name="images"
                        onChange={onSelectFile}
                        accept="image/png , image/jpeg, image/webp"
                        style={{ opacity: "0" }}
                      />
                    </Button>
                    <p> {selectedImages == null ? "" : selectedImages.name}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Publish Date</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    {/* defaultValue={date} */}

                    {!isLoading && (
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
                    )}

                    {/* {beginDate && <p>Begin Date: {beginDate}</p>} */}
                  </div>
                </div>
              </div>

              {/* -----------------------------------gallery--------------- ------------*/}
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Album Gallery</div>
                </div>
                <div className="col-md-8">
                  <div
                    className="input-field"
                    style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                  >
                    {galleryimages?.map((file, i) => {
                      return (
                        <div
                          key={file.albumId}
                          style={{
                            display: "inline-block",
                            position: "relative",
                          }}
                        >
                          <Image
                            src={file.image}
                            alt="project image"
                            width={100}
                            height={100}
                            style={{
                              marginRight: "10px",
                              marginBottom: "10px",
                            }}
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteGalleryImage(file.albumId)}
                          >
                            <HighlightOffIcon
                              style={{
                                color: "#e90000",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          </span>
                        </div>
                      );
                    })}
                    <p></p>
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
                        accept="image/png , image/jpeg, image/webp"
                        multiple
                        style={{ opacity: "0" }}
                        onChange={onSelectGallery}
                      />
                    </Button>{" "}
                    <br />
                  </div>
                </div>
              </div>
              {/* -----------------------------------gallery---------------------------- */}

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Status</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    {" "}
                    <Switch
                      checked={JSON.parse(status) == 1 ? true : false}
                      inputProps={{ "aria-label": "controlled" }}
                      onChange={changeStatus}
                    />{" "}
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
                    href={`/InitiativeAlbum/${params.slug}`}
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
                    Update Album{" "}
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
