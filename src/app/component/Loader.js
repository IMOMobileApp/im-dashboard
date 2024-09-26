"use client";

import * as React from "react";

import Backdrop from "@mui/material/Backdrop";

import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";

export default function Loader() {
  const [open, setOpen] = React.useState(true);
  const loader = process.env.LOADER;
  const apiRoute = process.env.API_ROUTE;
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Image src={`${apiRoute}/const_img${loader}`} alt="loader" width={50} height={50} />
      </Backdrop>
    </div>
  );
}
