"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/loginSlice";
import { toast } from "react-toastify";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const toastId = useRef(null);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sendvalid, setSendvalid] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const apiRoute = process.env.API_ROUTE;

  const getLogin = async () => {
    setSendvalid(true);
    try {
      const requestData = {
        email: email && email.trim(),
        password: password && password.trim(),
      };
      await dispatch(login(requestData));
    } catch (error) {
      // Handle error
    }
  };

  function successPopup() {
    toast.success("Login Successfully");
    toast.dismiss(toastId.current);
  }
  function failPopup() {
    toast.error("Login Failed");
    toast.dismiss(toastId.current);
  }
  function pendingPopup() {
    toastId.current = toast.loading("Validating credentials");
  }

  useEffect(() => {
    const loginCredentials = JSON.parse(localStorage.getItem("loginResponse"));
    const userID = loginCredentials?.Status;
    if (userID) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }

    if (sendvalid) {
      if (authState.status === "validating") {
        pendingPopup();
      } else if (authState.data.Status === true) {
        successPopup();
      } else if (authState.data.Status === false) {
        failPopup();
      }
    }
  }, [authState, sendvalid, router]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>

          <div className="col-md-10">
            <div className="login_cover">
              <div className="login_cover_img">
                <Image
                  src={`${apiRoute}/const_img/home-sec2-img.webp`}
                  fill={true}
                  alt="login"
                />
              </div>

              <div className="login_cover_field">
                <Image
                  src={`${apiRoute}/const_img/logo-black.png`}
                  alt="logo"
                  height={50}
                  width={250}
                  style={{ margin: "0 auto", marginBottom: "20px" }}
                />
                <h2>Login</h2>

                <div className="loginput-box">
                  <label>Email</label>

                  <input
                    type="text"
                    placeholder="your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="loginput-box">
                  <label>Password</label>

                  <input
                    type={showpassword ? "text" : "password"}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="eye"
                    onClick={() => {
                      setShowpassword(!showpassword);
                    }}
                  >
                    {showpassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <RemoveRedEyeIcon />
                    )}
                  </button>
                </div>

                <div className="loginput-box">
                  <button
                    className="btn btn-success btn-lg"
                    style={{ width: "100%" }}
                    onClick={getLogin}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
