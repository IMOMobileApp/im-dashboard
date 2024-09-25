"use client";

import { useState, useEffect } from "react";

import MenuIcon from "@mui/icons-material/Menu";

import NightlightRoundIcon from "@mui/icons-material/NightlightRound";

import NotificationsIcon from "@mui/icons-material/Notifications";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import WbSunnyIcon from "@mui/icons-material/WbSunny";

import { useDispatch, useSelector } from "react-redux";

import { leftBarShow, leftBarHide } from "@/app/redux/leftbarSlice";

import { dayShow, dayHide } from "@/app/redux/daySlice";

export default function Topbar() {
  const dispatch = useDispatch();

  const showLeftBar = useSelector((state) => state.toggleLeftBar.showLeftBar);

  const [toggleLeftBar, setToggleLeftBar] = useState(showLeftBar);

  const showDay = useSelector((state) => state.toggleDay.showDay);

  const [day, setDay] = useState(showDay);

  // Use useEffect to log changes in showLeftBar

  useEffect(() => {
    //  console.log('Show Left Bar:', showLeftBar);
  }, [showLeftBar, showDay]);

  const handleDay = () => {
    const newDay = !day;

    setDay(newDay);

    if (newDay) {
      dispatch(dayShow({ payload: day }));
    } else {
      dispatch(dayHide({ payload: day }));
    }
  };

  const handleToggleLeftBar = () => {
    const newToggleValue = !toggleLeftBar;

    setToggleLeftBar(newToggleValue);

    if (newToggleValue) {
      dispatch(leftBarShow({ payload: toggleLeftBar }));
    } else {
      dispatch(leftBarHide({ payload: toggleLeftBar }));
    }
  };

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="row">
            <div className="col-md-1 col-xs-2">
              <MenuIcon
                style={{ width: "24px", height: "24px", cursor: "pointer" }}
                onClick={handleToggleLeftBar}
              />
            </div>

            <div className="col-md-9 col-xs-5"></div>

            <div className="col-md-2 col-xs-5">
              <div className="topbar-icon-list">
                <ul>
                  <li onClick={handleDay}>
                    {day ? <WbSunnyIcon /> : <NightlightRoundIcon />}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
