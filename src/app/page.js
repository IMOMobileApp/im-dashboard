"use client";
import dynamic from "next/dynamic";
import Topbar from "./component/Topbar";
//import Leftbar from './component/Leftbar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { withAuth } from "./utils/withAuth";
import { useCallback, useEffect } from "react";
const Leftbar = dynamic(() => import("./component/Leftbar"), { ssr: false });

const Home = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter();
  const findPath = useCallback(() => {
    if (pathName == "/") {
      router.push("/dashboard");
    }
  }, [router, pathName]);

  useEffect(() => {
    findPath();
  }, [findPath]);
  const { showLeftBar, payload } = useSelector((state) => state.toggleLeftBar);
  const { showDay } = useSelector((state) => state.toggleDay);

  return (

      <div
        className={showDay ? "day page-wrapper" : "night page-wrapper"}
        style={{ display: "flex" }}
      >
        {!showLeftBar ? (
          ""
        ) : pathName != "/login" ? (
          <Leftbar suppressHydrationWarning />
        ) : (
          ""
        )}

        <div className="pagewrapper">
          {pathName != "/login" ? <Topbar /> : ""}
          <div className="dashboard-page">
            <ToastContainer position="top-center" autoClose={1000} />
            {children}
          </div>
        </div>
      </div>
  );
};
export default withAuth(Home);
