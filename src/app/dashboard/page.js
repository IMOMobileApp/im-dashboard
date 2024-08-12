"use client";
import { Suspense, useState, useEffect } from "react";
import LayersIcon from "@mui/icons-material/Layers";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AutorenewSharpIcon from "@mui/icons-material/AutorenewSharp";
import StyleSharpIcon from "@mui/icons-material/StyleSharp";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import LineChart from "../component/LineChart";
import PieChart from "../component/PieChart";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
//import EnhancedTable from '../component/dataTable'
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import Loader from "@/app/component/Loader";
import ProjectTable from "@/app/Projects/components/projectTable";

const apiRoute = process.env.API_ROUTE;
const userId = process.env.USER_ID;

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  userId: `${userId}`,
});
var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

export default function Dashboard() {
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${apiRoute}/adminhome`, requestOptions);
      const projects = await res.json();
      //console.log(projects)
      setData(projects);
      return projects;
    }

    getData();
  }, []);
  // const data = await getData()

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Dashboard Overview</h3>
            <div className="dashboard-sale-box-row">
              <div
                className="dashboard-sale-box"
                style={{ backgroundColor: "#0694a2" }}
              >
                <LayersIcon style={{ fontSize: "45px" }} />
                <p>Today&apos;s Order</p>
                <b> {data?.Data.Orders.today.orders}</b>
                <br />
                <span>
                  Amount : ₹ {data?.Data.Orders.today.amount} Coin : ₹
                  {data?.Data.Orders.today.coin}
                </span>
              </div>

              <div
                className="dashboard-sale-box"
                style={{ backgroundColor: "#ff8a4c" }}
              >
                <LayersIcon style={{ fontSize: "45px" }} />
                <p>Yesterday Orders</p>
                <b> {data?.Data.Orders.yesterday.orders}</b>
                <br />
                <span>
                  Amount : ₹ {data?.Data.Orders.yesterday.amount} Coin : ₹{" "}
                  {data?.Data.Orders.yesterday.coin}
                </span>
              </div>

              <div
                className="dashboard-sale-box"
                style={{ backgroundColor: "#3f83f8" }}
              >
                <ShoppingCartOutlinedIcon style={{ fontSize: "45px" }} />
                <p>This Month Order</p>
                <b>{data?.Data.Orders.month.orders}</b>
                <br />
                <span>
                  Amount : ₹ {data?.Data.Orders.month.amount} Coin : ₹{" "}
                  {data?.Data.Orders.month.coin}
                </span>
              </div>

              <div
                className="dashboard-sale-box"
                style={{ backgroundColor: "#0e9f6e" }}
              >
                <StyleSharpIcon style={{ fontSize: "45px" }} />
                <p>All-Time Order</p>
                <b>{data?.Data.Orders.all.orders}</b>
                <br />
                <span>
                  Amount : ₹ {data?.Data.Orders.all.amount} Coin : ₹{" "}
                  {data?.Data.Orders.all.coin}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="dashboard-order-row">
              <div className="dashboard-order-box">
                <div
                  className="dashboard-order-icon"
                  style={{ backgroundColor: "#feecdc" }}
                >
                  <ShoppingCartOutlinedIcon style={{ color: "#d03801" }} />
                </div>
                <div className="dashboard-order-txt">
                  <span>Total Order</span>
                  <p>{data?.Data.OrderStatus.totalOrder}</p>
                </div>
              </div>

              <div className="dashboard-order-box">
                <div
                  className="dashboard-order-icon"
                  style={{ backgroundColor: "#e1effe" }}
                >
                  <AutorenewSharpIcon style={{ color: "#1c64f2" }} />
                </div>
                <div className="dashboard-order-txt">
                  <span>Orders Pending</span>
                  <p>{data?.Data.OrderStatus.pendingOrder}</p>
                </div>
              </div>

              <div className="dashboard-order-box">
                <div
                  className="dashboard-order-icon"
                  style={{ backgroundColor: "#d5f5f6" }}
                >
                  <LocalShippingSharpIcon style={{ color: "#047481" }} />
                </div>
                <div className="dashboard-order-txt">
                  <span>Orders Processing</span>
                  <p>{data?.Data.OrderStatus.processOrder}</p>
                </div>
              </div>

              <div className="dashboard-order-box">
                <div
                  className="dashboard-order-icon"
                  style={{ backgroundColor: "#def7ec" }}
                >
                  <DoneSharpIcon style={{ color: "#057a55" }} />
                </div>
                <div className="dashboard-order-txt">
                  <span>Orders Delivered</span>
                  <p>{data?.Data.OrderStatus.deliverOrder}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Suspense fallback={<Loader />}>
              <div className="dashboard-bar-chart">
                <LineChart />
              </div>
            </Suspense>
          </div>
          <div className="col-md-6">
            <div className="dashboard-bar-chart">
              <PieChart />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-2">
            <div
              className="dashboard-value-box"
              style={{
                backgroundColor: "rgb(56 116 255 / .05)",
                borderColor: "#3874ffcc",
              }}
            >
              <div className="dashboard-value-box-icon">
                <span>Trees</span>
                <div
                  className="dashboard-value-box-icon1"
                  style={{ borderColor: "#3874ffcc" }}
                >
                  <ParkOutlinedIcon style={{ color: "#3874ffcc" }} />
                </div>
              </div>
              <div className="dashboard-value-box-count">
                <span>
                  This Week : <b>{data?.Data.Trees.weekTree}</b>
                </span>
                <span>
                  Total : <b>{data?.Data.Trees.totalTree}</b>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="dashboard-value-box"
              style={{
                backgroundColor: "rgb(254 120 49 / .05)",
                borderColor: "#fe7831cc",
              }}
            >
              <div className="dashboard-value-box-icon">
                <span>Users</span>
                <div
                  className="dashboard-value-box-icon1"
                  style={{ borderColor: "#fe7831cc" }}
                >
                  <Person3OutlinedIcon style={{ color: "#fe7831cc" }} />
                </div>
              </div>
              <div className="dashboard-value-box-count">
                <span>
                  This Week : <b>{data?.Data.Users.weekUser}</b>
                </span>
                <span>
                  Total : <b>{data?.Data.Users.totalUser}</b>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="dashboard-value-box"
              style={{
                backgroundColor: "rgb(168 85 247 / .05)",
                borderColor: "#a855f7cc",
              }}
            >
              <div className="dashboard-value-box-icon">
                <span>Trees</span>
                <div
                  className="dashboard-value-box-icon1"
                  style={{ borderColor: "#a855f7cc" }}
                >
                  <ShareOutlinedIcon style={{ color: "#a855f7cc" }} />
                </div>
              </div>
              <div className="dashboard-value-box-count">
                <span>
                  This Week : <b>{data?.Data.Post.weekPost}</b>
                </span>
                <span>
                  Total : <b>{data?.Data.Post.totalPost}</b>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="dashboard-value-box"
              style={{
                backgroundColor: "rgb(6 148 162 / .05)",
                borderColor: "#0694a2cc",
              }}
            >
              <div className="dashboard-value-box-icon">
                <span>Caretakers</span>
                <div
                  className="dashboard-value-box-icon1"
                  style={{ borderColor: "#0694a2cc" }}
                >
                  <GroupAddOutlinedIcon style={{ color: "#0694a2cc" }} />
                </div>
              </div>
              <div className="dashboard-value-box-count">
                {/* <span>This Week : <b>{data.Data.Post.weekPost}</b></span>  */}
                <span>
                  Total : <b>{data?.Data.careTaker}</b>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="dashboard-value-box"
              style={{
                backgroundColor: "rgb(255 138 76 / .05)",
                borderColor: "#ff8a4ccc",
              }}
            >
              <div className="dashboard-value-box-icon">
                <span>Steps count</span>
                <div
                  className="dashboard-value-box-icon1"
                  style={{ borderColor: "#ff8a4ccc" }}
                >
                  <DirectionsWalkOutlinedIcon style={{ color: "#ff8a4ccc" }} />
                </div>
              </div>
              <div className="dashboard-value-box-count">
                <span>
                  This Week : <b>{data?.Data.Steps.weekSteps}</b>
                </span>
                <span>
                  Total : <b>{data?.Data.Steps.totalSteps}</b>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="dashboard-value-box"
              style={{
                backgroundColor: "rgb(63 131 248 / 5%)",
                borderColor: "#3f83f8cc",
              }}
            >
              <div className="dashboard-value-box-icon">
                <span>Coin disbursed</span>
                <div
                  className="dashboard-value-box-icon1"
                  style={{ borderColor: "#3f83f8cc" }}
                >
                  <CurrencyExchangeOutlinedIcon
                    style={{ color: "#3f83f8cc" }}
                  />
                </div>
              </div>
              <div className="dashboard-value-box-count">
                {/* <span>This Week : <b>{data.Data.Post.weekPost}</b></span>  */}
                <span>
                  Total : <b>{data?.Data.coinDisbursed}</b>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="dashboard-table">
              <Suspense fallback={<Loader />}>
                {" "}
                <ProjectTable />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
