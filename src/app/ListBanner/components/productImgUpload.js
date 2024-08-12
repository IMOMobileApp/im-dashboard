"use client";

import { useState } from "react";

import Button from "@mui/material/Button";

import UploadFileIcon from "@mui/icons-material/UploadFile";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import Image from "next/image";

export default function UploadImg() {
  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;

    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME

    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));

    URL.revokeObjectURL(image);
  }

  return (
    <section className=" ">
      <Button
        component="label"
        variant="contained"
        startIcon={<UploadFileIcon />}
        style={{ textAlign: "center" }}
      >
        Upload file
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
          style={{ opacity: "0" }}
        />
      </Button>

      {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            {" "}
            You can&apos;t upload more than 10 images!{" "}
            <span>
              {" "}
              please delete <b> {selectedImages.length - 10}</b> of them{" "}
            </span>
          </p>
        ) : (
          <span className="upload-btn">
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </span>
        ))}

      <div className="thumbsContainer">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image} className="thumbInner">
                <Image
                  src={image}
                  alt="upload"
                  className="thumbInner-img"
                  layout={fill}
                />

                {/* <button onClick={() => deleteHandler(image)}> delete image </button>  */}

                <HighlightOffIcon
                  style={{
                    color: "red",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    fontSize: "13px",
                    zIndex: "10",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteHandler(image)}
                />

                <p>{index + 1}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
}
