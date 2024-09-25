"use client";

import { useEffect, useState, useRef } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import Loader from "@/app/component/Loader";
import { toast } from "react-toastify";
import Switch from "@mui/material/Switch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function Categorydetail({ params }) {
  const apiRoute = process.env.API_ROUTE;
  // //const userId = process.env.USER_ID;
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
  let router = useRouter();
  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  const [question, setQuestion] = useState();
  const [opt1, setOpt1] = useState();
  const [opt2, setOpt2] = useState();
  const [opt3, setOpt3] = useState();
  const [opt4, setOpt4] = useState();
  const [ans, setAns] = useState();
  const [status, setStatus] = useState();
  const handleAns = (event) => {
    setAns(event.target.value);
  };
  const changeStatus = () => {
    //  console.log(status)
    if (status == 1) {
      setStatus("0");
    } else {
      setStatus("1");
    }
  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ userId: `${userId}`, quizId: params.slug });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/quizdetail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setTitle(result.Data.quizCatName);
        setQuestion(result.Data.quiz);
        setOpt1(result.Data.opt1);
        setOpt2(result.Data.opt2);
        setOpt3(result.Data.opt3);
        setOpt4(result.Data.opt4);
        setAns(result.Data.ans);
        setStatus(result.Data.status);
        setLoading(false);
      });
    if (opt1 == ans) {
      setAns(opt1);
    } else if (opt2 == ans) {
      setAns(opt2);
    } else if (opt3 == ans) {
      setAns(opt3);
    } else if (opt4 == ans) {
      setAns(opt4);
    }
    //  .catch(error => console.log('error', error))
  }, [opt1, opt2, opt3, opt4, ans, params.slug, apiRoute, userId]);
  if (isLoading) return <Loader />;
  if (!data) return <p>No Quiz found</p>;
  /*-------------------------------------------------------update quiz-----------------------------------------------------------------------------------*/

  const uploadWithFormData = () => {
    pendingPopup();
    let data = JSON.stringify({
      userId: `${userId}`,
      quizId: params.slug,
      quiz: question,
      opt1: opt1,
      opt2: opt2,
      opt3: opt3,
      opt4: opt4,
      ans: ans,
      status: status,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/editquiz`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      {
        response.data.Status === true ? successPopup() : failPopup();
      }
      function successPopup() {
        toast.success(`${response.data.Message}`);
        toast.dismiss(toastId.current);
        {
          response.data.Status === true ? router.back() : "";
        }
      }
      function failPopup() {
        toast.error(`${response.data.Message}`);
        toast.dismiss(toastId.current);
      }
    });
    function pendingPopup() {
      toastId.current = toast.loading("Updating Quiz");
    }
  };

  /**----------------------------------------------------------------update quiz--------------------------------------------- */
  /**------delete quiz--------- */
  const deleteQuiz = () => {
    pendingPopup();
    let data = JSON.stringify({ userId: `${userId}`, quizId: params.slug });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/deletequiz`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      {
        response.data.Status === true ? successPopup() : failPopup();
      }
      function successPopup() {
        toast.success(`${response.data.Message}`);
        toast.dismiss(toastId.current);
        {
          response.data.Status === true ? router.back() : "";
        }
      }
      function failPopup() {
        toast.error(`${response.data.Message}`);
        toast.dismiss(toastId.current);
      }
    });
    function pendingPopup() {
      toastId.current = toast.loading("Updating Quiz");
    }
  };
  /**------delete quiz--------- */

  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Quiz </h2>
            <p>Update quiz info and extras.</p>
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
                  {" "}
                  <div className="input-head">
                    Quiz Category Title/Name
                  </div>{" "}
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={title}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <div className="input-head">Quiz Question</div>{" "}
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={question}
                      onChange={(e) => {
                        setQuestion(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <div className="input-head">Option 1</div>{" "}
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={opt1}
                      onChange={(e) => {
                        setOpt1(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <div className="input-head">Option 2</div>{" "}
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={opt2}
                      onChange={(e) => {
                        setOpt2(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <div className="input-head">Option 3</div>{" "}
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={opt3}
                      onChange={(e) => {
                        setOpt3(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <div className="input-head">Option 4</div>{" "}
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={opt4}
                      onChange={(e) => {
                        setOpt4(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <div className="input-head">Correct Answer</div>{" "}
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <FormControl fullWidth>
                      <Select
                        defaultValue={ans}
                        value={ans}
                        onChange={handleAns}
                        style={{ fontSize: "14px" }}
                      >
                        <MenuItem value={opt1}>{opt1}</MenuItem>
                        <MenuItem value={opt2}>{opt2}</MenuItem>
                        <MenuItem value={opt3}>{opt3}</MenuItem>
                        <MenuItem value={opt4}>{opt4}</MenuItem>
                      </Select>
                    </FormControl>
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
                <div className="col-md-4">
                  {" "}
                  <div className="input-head">Created At</div>{" "}
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
              {/* <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Status</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Switch checked={JSON.parse(status) == 1 ? true : false} inputProps={{ 'aria-label': 'controlled' }} onChange={changeStatus}/></div>
                              </div>
                            </div> */}
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
                    href={`/Quiz/QuizListing/${data.quizCat}`}
                  >
                    {" "}
                    Back{" "}
                  </Link>
                </div>
                <div className="col-md-4">
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ width: "100%", fontSize: "15px", padding: "10px" }}
                    onClick={deleteQuiz}
                  >
                    {" "}
                    Delete Quiz{" "}
                  </Button>
                </div>
                <div className="col-md-4">
                  <Button
                    variant="contained"
                    color="success"
                    style={{ width: "100%", fontSize: "15px", padding: "10px" }}
                    onClick={uploadWithFormData}
                  >
                    {" "}
                    Update Quiz{" "}
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
