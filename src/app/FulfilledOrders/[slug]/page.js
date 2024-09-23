"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import Input from "@mui/joy/Input";
import Loader from "@/app/component/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FulfilledTreeTable from "../components/fulfilledTreeTable";

export default function Fulfilleddetail({ params }) {
  const apiRoute = process.env.API_ROUTE;
  // const userId = process.env.USER_ID;
const userData = JSON.parse(localStorage.getItem("loginResponse"));
const userId = userData?.Data?.userId;
//console.log("first", userId);
  let router = useRouter();

  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [careTaker, setCareTaker] = useState();
  const [isLoading, setLoading] = useState(true);
  //   const [title, setTitle]= useState();
  //   const [shotDesc, setShortDesc]= useState();

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ userId: `${userId}`, orderId: params.slug });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/completedorderdetail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setCareTaker(result.careTaker);
        setLoading(false);
      });
    //  .catch(error => console.log('error', error))
  }, [params.slug, apiRoute, userId]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No profile data</p>;

  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Fulfilled Orders</h2>
            <p>Order info and extras.</p>
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
                  <div className="input-head">Order ID</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.orderId}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Created On</div>
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

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">User ID</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.userId}
                      disabled
                    />
                  </div>
                </div>
              </div>

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
                      value={data.userName}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Gifted ?</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.isGifted}
                      disabled
                    />
                  </div>
                </div>
              </div>
              {data.gitfStatus == 1 ? (
                ""
              ) : (
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-head">Gift ID</div>
                  </div>
                  <div className="col-md-8">
                    <div className="input-field">
                      <Input
                        placeholder=""
                        variant="soft"
                        size="lg"
                        style={{ padding: "12px 15px", fontSize: "15px" }}
                        value={data.giftId}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              )}

              {data.gitfStatus == 1 ? (
                ""
              ) : (
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-head">Gift Email ID</div>
                  </div>
                  <div className="col-md-8">
                    <div className="input-field">
                      <Input
                        placeholder=""
                        variant="soft"
                        size="lg"
                        style={{ padding: "12px 15px", fontSize: "15px" }}
                        value={data.giftEmail}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Project ID</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.projectId}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Project Name</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.projectName}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Gardener Name</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.acceptedByName}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Gardener ID</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.acceptedById}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">No. of Trees</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.qty}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Coins</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.seeds}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Amount</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={data.amount}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12" style={{ marginBottom: "150px" }}>
                  <Suspense fallback={<Loader />}>
                    <FulfilledTreeTable orderURL={params.slug} />
                  </Suspense>
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
                    href="/FulfilledOrders"
                  >
                    {" "}
                    Back{" "}
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
