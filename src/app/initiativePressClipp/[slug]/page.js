"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import FormData from "form-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Loader from "@/app/component/Loader";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function AddImages({ params }) {
  const apiRoute = process.env.API_ROUTE;
  // const userId = process.env.USER_ID;
  const userData = JSON.parse(localStorage.getItem("loginResponse"));
  const userId = userData?.Data?.userId;
  //console.log("first", userId);
  let router = useRouter();
  const toastId = useRef(null);

  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [selectedImages, setSelectedImages] = useState(null);
  const [galleryimages, setGalleryimages] = useState([]);
  const [status, setStatus] = useState(true);
  // const [data, setData] = useState();

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

  const fetchAllalbumImages = useCallback(() => {
    let data = JSON.stringify({
      userId: `${userId}`,
      initiativeId: `${params.slug}`,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/listwebpress`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      setGalleryimages(response.data.Data);
      setLoading(false);
    });
  }, [params.slug, apiRoute, userId]);
  useEffect(() => {
    fetchAllalbumImages();
  }, [fetchAllalbumImages, apiRoute, userId]);

  const onSelectGallery = async (e) => {
    const nowImage = e.target.files[0];
    console.log(nowImage);
    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("catId", `${params.slug1}`);
    bodyContent.append("status", status);

    await fetch(`${apiRoute}/addalbum`, {
      method: "POST",
      // Adding body or contents to send
      body: bodyContent,
    })
      // Converting to JSON
      .then(() => {
        // Adding a delay of 4 seconds (4000 milliseconds) before calling fetchProjectDetail()
        setTimeout(() => {
          fetchAllalbumImages();
        }, 100);
      });
    // .then(fetchProjectDetail())
  };
  const deleteGalleryImage = async (e) => {
    const imgId = e;
    console.log(e);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    await fetch(`${apiRoute}/deletewebpress`, {
      // Adding method type
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      // Adding body or contents to send
      body: JSON.stringify({
        userId: `${userId}`,
        imageId: [imgId],
      }),
    }).then(fetchAllalbumImages());
  };
  /**---delete album gallery image-------- */

  if (isLoading) return <Loader />;
  //  if (!data) return <p>No profile data</p>
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
            <h2> Press Clips</h2>
            <p>All Press Clips</p>
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

              {/* <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Publish Date</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"> */}
              {/* defaultValue={date} */}

              {/* {!isLoading && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="YYYY-MM-DD" format="YYYY - MM - DD" value={dayjs(date)} onChange={(newValue) => { setDate(newValue) }} disableFuture />
          </DemoContainer>
        </LocalizationProvider>
      )} */}

              {/* {beginDate && <p>Begin Date: {beginDate}</p>} */}

              {/* </div>
                              </div>
                            </div> */}

              {/* -----------------------------------gallery--------------- ------------*/}
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Images Gallery</div>
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
                            onClick={() => deleteGalleryImage(file.imageId)}
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
                    {/* <Button component="label" variant="contained" startIcon={<UploadFileIcon />} style={{ textAlign: 'center' }}>Upload file
                      <input type="file" name="images" accept="image/png , image/jpeg, image/webp" style={{ opacity: '0' }} onChange={onSelectGallery}/>
                    </Button> <br /> */}
                  </div>
                </div>
              </div>
              {/* -----------------------------------gallery---------------------------- */}

              {/* <div className="row">
                                <div className="col-md-4">
                                    <div className="input-head">Status</div>
                                </div>
                                <div className="col-md-8">
                                    <div className="input-field"> <Switch checked={JSON.parse(status) == 1 ? true : false} inputProps={{ 'aria-label': 'controlled' }} onChange={changeStatus}/> </div>
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
                    href="/InitiativeCategory"
                  >
                    {" "}
                    Cancel{" "}
                  </Link>
                </div>
                <div className="col-md-4">
                  <Link
                    href={`/initiativePressClipp/${params.slug}/addImages`}
                    variant="contained"
                    color="success"
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      padding: "10px",
                      textTransform: "capitalize",
                      border: "1px solid #008000",
                      color: "#000",
                      display: "inline-block",
                      color: "green",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    Add Clips{" "}
                  </Link>
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
