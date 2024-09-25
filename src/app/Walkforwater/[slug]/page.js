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

export default function Caretakerdetail({ params }) {
  let router = useRouter();
  const apiRoute = process.env.API_ROUTE;
  const [userData, setUserData] = useState();
  useEffect(() => {
    const storedData = localStorage.getItem("loginResponse");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState(null);

  const onSelectFile = (e) => {
    setSelectedImages(e.target.files[0]);
    //  console.log(selectedImages)
  };

  const fetchSpeciesDetail = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      userId: `${userData?.Data?.userId}`,
      formId: params.slug,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/siteformdetail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setSelectedImages(result.Data.siteImage);
        // setScienceName(result.Data.scienceName)
        setLoading(false);
      });
    //  .catch(error => console.log('error', error))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  useEffect(() => {
    if(userData){
    fetchSpeciesDetail();
    }
  }, [userData]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No data</p>;

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
                <div className="col-md-2">
                  <div className="input-head"> Name</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.name}
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="input-head"> Mobile Number</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.phone}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <div className="input-head"> Email</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.email || "nill"}
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="input-head"> Dist</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.district || "nill"}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <div className="input-head"> State</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.state}
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="input-head"> Pin Code</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.pincode}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <div className="input-head"> Latitude</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.latitude || "nill"}
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="input-head"> Longitude</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.longitude || "nill"}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <div className="input-head"> Annual Rainfall</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.annualRain || "nill"}
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="input-head"> Address</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.address || "nill"}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <div className="input-head"> City</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.city || "nill"}
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="input-head"> Total Plot Area (sq.ft.)</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.totalPlotArea || "nill"}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <div className="input-head"> Total Roof Area (sq.ft.)</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.totalRoofArea || "nill"}
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="input-head"> Type of Property</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.propertyType || "nill"}
                    />
                  </div>
                </div>
              </div>
              {data.storageTank == "1" ? (
                <>
                  <div className="row">
                    <div className="col-md-2">
                      <div className="input-head"> Type of Storage Tank :</div>
                    </div>
                    <div className="col-md-4">
                      <div className="input-field">
                        <Input
                          placeholder=""
                          variant="soft"
                          size="lg"
                          style={{ padding: "12px 15px", fontSize: "15px" }}
                          value={data.typeOfStorage || "nill"}
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="input-head">
                        {" "}
                        Capacity of Storage Tank(Ltr) :
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input-field">
                        <Input
                          placeholder=""
                          variant="soft"
                          size="lg"
                          style={{ padding: "12px 15px", fontSize: "15px" }}
                          value={data.capacity || "nill"}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="row">
                <div className="col-md-2">
                  <div className="input-head">Enquiry Type</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.inquiryType || "nill"}
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="input-head">Additional information</div>
                </div>
                <div className="col-md-4">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.additionalInfo || "nill"}
                    />
                  </div>
                </div>
              </div>

              {data?.existingBorewell == "1"
                ? data?.allBorewell?.map((item, i) => {
                    return (
                      <div className="row" key={i}>
                        <div className="col-md-12">
                          <div
                            className="input-head"
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              marginTop: "20px",
                            }}
                          >
                            Borewell {i + 1}
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="input-head">Status of Borewell</div>
                        </div>
                        <div className="col-md-2">
                          <Input
                            placeholder=""
                            variant="soft"
                            size="lg"
                            style={{ padding: "12px 15px", fontSize: "15px" }}
                            value={item.status || "nill"}
                          />
                        </div>
                        <div className="col-md-2">
                          <div className="input-head">
                            Depth of Borewell (sqft)
                          </div>
                        </div>
                        <div className="col-md-2">
                          <Input
                            placeholder=""
                            variant="soft"
                            size="lg"
                            style={{ padding: "12px 15px", fontSize: "15px" }}
                            value={item.borewellDepth || "nill"}
                          />
                        </div>
                        <div className="col-md-2">
                          <div className="input-head">
                            Depth of Water (sqft)
                          </div>
                        </div>
                        <div className="col-md-2">
                          <Input
                            placeholder=""
                            variant="soft"
                            size="lg"
                            style={{ padding: "12px 15px", fontSize: "15px" }}
                            value={item.waterDepth || "nill"}
                          />
                        </div>
                      </div>
                    );
                  })
                : ""}

              <div className="row">
                <div className="col-md-2">
                  <div className="input-head">Site Images</div>
                </div>
                <div className="col-md-10">
                  <div
                    className="input-field"
                    style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                  >
                    {selectedImages?.map((item, i) => (
                      <Image
                        src={item}
                        alt="site image"
                        width={200}
                        height={200}
                        key={i}
                        style={{
                          marginRight: "10px",
                          border: "1px solid #000",
                        }}
                      />
                    ))}
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
                {/* <div className='col-md-4'>
                              <Button variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', textTransform:'capitalize'}} onClick={deleteCategory}>  Delete Category </Button>
                              </div> */}
                {/*                               
                              <div className='col-md-4'>
                              <Button variant="contained" color="success" style={{width:'100%', fontSize:'15px',padding:'10px'}} onClick={uploadWithFormData}> Update Details</Button>
                              </div> */}
              </div>

              {/*-------------------------------------------------------------------------------------------------------------- */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
