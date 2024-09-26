"use client";

import * as React from "react";

import Backdrop from "@mui/material/Backdrop";

import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";

export default function Loader() {
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        {/* <CircularProgress color="inherit" /> */}
        <Image src="/logo-black.png" alt="loader" width={50} height={50} />
      </Backdrop>
    </div>
  );
}
