"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import Loader from "@/app/component/Loader";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Gicimpacct() {
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
  const [co2, setCo2] = useState();
  const [o2, setO2] = useState();
  const [individuals, setIndividuals] = useState();
  const [employees, setEmployees] = useState();
  const [date, setDate] = useState();

  const fetchCaretakerDetail = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ userId: `${userData?.Data?.userId}` });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/greenimpactdetail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data.saplingPlanted);
        setCo2(result.Data.co2Absorbed);
        setO2(result.Data.literProduced);
        setIndividuals(result.Data.individuals);
        setEmployees(result.Data.corporateEmployee);
        setDate(result.Data.createdAt);

        setLoading(false);
      });
    //  .catch(error => console.log('error', error))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  useEffect(() => {
    if(userData){
    fetchCaretakerDetail();
    }
  }, [userData]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No data found</p>;
  /*-------------------------------------------------------update ---------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      userId: `${userData?.Data?.userId}`,
      saplingPlanted: data,
      co2Absorbed: co2,
      literProduced: o2,
      individuals: individuals,
      corporateEmployee: employees,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/addgreenimpact`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === true) {
          successPopup(result);
        } else {
          failPopup(result);
        }
      })
      .catch((error) => console.error(error));

    function successPopup(result) {
      toast.success(`${result.Message}`);
      toast.dismiss(toastId.current);
    }
    function failPopup(result) {
      toast.error(`${result.Message}`);
      toast.dismiss(toastId.current);
    }
    function pendingPopup() {
      toastId.current = toast.loading("Updating Detail");
    }
  }
  /**----------------------------------------------------------------update--------------------------------------------- */

  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Green India Challenge Impact</h2>
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
                  <div className="input-head"> Saplings Planted (Million)</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data}
                      onChange={(e) => {
                        setData(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">
                    CO2 Liters Absorbed Annually (Billion)
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={co2}
                      onChange={(e) => setCo2(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">
                    O2 Liters Produced Annually ( Billion ){" "}
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={o2}
                      onChange={(e) => setO2(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Individuals (Million) </div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={individuals}
                      onChange={(e) => setIndividuals(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Corporate Employees </div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={employees}
                      onChange={(e) => setEmployees(e.target.value)}
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
                      value={`${new Date(date).getDate()}/${
                        new Date(date).getMonth() + 1
                      }/${new Date(date).getFullYear()}`}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2"></div>
                {/* <div className='col-md-4'>
                              <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href="/GicImpact">  Back </Link>
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
