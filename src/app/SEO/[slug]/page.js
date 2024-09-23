"use client";

import { useEffect, useState, useRef, useMemo } from "react";

import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import Loader from "@/app/component/Loader";
import { toast } from "react-toastify";
import Textarea from "@mui/joy/Textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Seodetail({ params }) {
  const apiRoute = process.env.API_ROUTE;
  // const userId = process.env.USER_ID;
const userData = JSON.parse(localStorage.getItem("loginResponse"));
const userId = userData?.Data?.userId;
//console.log("first", userId);
  let router = useRouter();

  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [value1, setValue] = useState("");
  const [title, setTitle] = useState();
  const [keywords, setKeywords] = useState();

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ type: params.slug });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/metaDetail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setValue(result.Data.metaDesc);
        setTitle(result.Data.metaTitle);
        setKeywords(result.Data.metaKeyword);
        setLoading(false);
      });
    //  .catch(error => console.log('error', error))
  }, [params.slug, apiRoute, userId]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No data</p>;
  /*-------------------------------------------------------update Blog-----------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      userId: `${userId}`,
      metaTitle: title,
      metaDesc: value1,
      metaKeyword: keywords,
      type: params.slug,
    });

    let response = await fetch(`${apiRoute}/addMeta`, {
      method: "POST",
      body: raw,
      headers: myHeaders,
    });

    const data1 = await response.json();

    function successPopup() {
      toast.success(`${data1.Message}`);
      toast.dismiss(toastId.current);
      router.back();
    }
    function failPopup() {
      toast.error(`${data1.Message}`);
      toast.dismiss(toastId.current);
    }
    function pendingPopup() {
      toastId.current = toast.loading("Updating SEO");
    }

    {
      data1.Status === true ? successPopup() : failPopup();
    }
  }
  /**----------------------------------------------------------------update blog--------------------------------------------- */

  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Update SEO</h2>
            <p>Update SEO info and extras.</p>
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
                  <div className="input-head">Website Page Name</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      disabled
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{
                        padding: "12px 15px",
                        fontSize: "15px",
                        textTransform: "uppercase",
                      }}
                      value={data.type}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">SEO Title/Name</div>
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
                  <div className="input-head">
                    SEO Keywords/Tags ( Please use CSV )
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">SEO descriptions</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Textarea
                      value={value1}
                      onChange={(e) => setValue(e.target.value)}
                      style={{
                        height: "200px",
                        width: "100%",
                        marginBottom: "100px",
                      }}
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
                    href="/SEO"
                  >
                    {" "}
                    Back{" "}
                  </Link>
                </div>

                <div className="col-md-4">
                  <Button
                    variant="contained"
                    color="success"
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      padding: "10px",
                      textTransform: "capitalize",
                    }}
                    onClick={uploadWithFormData}
                  >
                    {" "}
                    Update SEO{" "}
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
