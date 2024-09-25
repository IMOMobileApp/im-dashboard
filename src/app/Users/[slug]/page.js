"use client";

import { useEffect, useState } from "react";

import Input from "@mui/joy/Input";

import Button from "@mui/material/Button";

import Switch from "@mui/material/Switch";

import Loader from "@/app/component/Loader";

import Link from "next/link";

export default function Userdetail({ params }) {
  const apiRoute = process.env.API_ROUTE;
  const [userData, setUserData] = useState();
  useEffect(() => {
    const storedData = localStorage.getItem("loginResponse");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
 
  const userId = userData?.Data?.userId;
  console.log("first", userId);

  const [data, setData] = useState();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ userId: `${userId}`, findId: params.slug });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${apiRoute}/userdetail`, requestOptions)
      .then((response) => response.json())

      .then((result) => {
        setData(result.Data);

        setLoading(false);
      });

    //  .catch(error => console.log('error', error))

    // console.log(data?.Data);
  }, [params.slug, apiRoute, userId]); //console.log(data?.Data);

  if (isLoading) return <Loader />;

  if (!data) return <p>No profile data</p>;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>User Detail</h2>
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
                  <div className="input-head">User Name</div>
                </div>

                <div className="col-md-8">
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
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Email</div>
                </div>

                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.email}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Phone</div>
                </div>

                <div className="col-md-8">
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
                <div className="col-md-4">
                  <div className="input-head">Created Date</div>
                </div>

                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={`${new Date(data.createdAt).getDate()}/${new Date(
                        data.createdAt
                      ).getMonth()}/${new Date(data.createdAt).getFullYear()}`}
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
                      checked={true}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ width: "100%", fontSize: "15px", padding: "10px" }}
                  >
                    {" "}
                    <Link href="/Users" style={{ color: "#d32f2f" }}>
                      Back
                    </Link>{" "}
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
