"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Loader from "@/app/component/Loader";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Image from "next/image";
import { toast } from "react-toastify";
import FormData from "form-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Switch from "@mui/material/Switch";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export default function Projectdetail({ params }) {
  let router = useRouter();
  const apiRoute = process.env.API_ROUTE;
  const userData = JSON.parse(localStorage.getItem("loginResponse"));
  const userId = userData?.Data?.userId;
  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [shortDesc, setShortDesc] = useState();
  const [area, setArea] = useState("");
  const [district, setDistrict] = useState();
  const [state, setState] = useState();
  const [pincode, setPincode] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [selectedPreviewImages, setSelectedPreviewImages] = useState(null);
  const [imagePreview, setImagePreview] = useState();
  const [galleryimages, setGalleryimages] = useState([]);
  const [status, setStatus] = useState(1);
  const [speciesArray, setSpeciesArray] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [formValues, setFormValues] = useState([
    { name: "", total: "", planted: "" },
  ]);
  const [isEditable, setEditable] = useState();
  const [sequence, setSequence] = useState();
  const [poweredby, setPoweredby] = useState();
  const [poweredlogo, setPoweredlogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState();
  const [error, setError] = useState({
    name: false,
    shortDesc: false,
    description: false,
    sequence: false,
    area: false,
    state: false,
    district: false,
    longitude: false,
    latitude: false,
    pincode: false,
    projectType: false,
    species: false,
    logo: false,
    thumbnail: false,
    quantity: false,
  });

  const onSelectLogo = (e) => {
    setError({ ...error, logo: false });
    setPoweredlogo(e.target.files[0]);
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileURL = event.target.result;
        setLogoPreview(fileURL);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        setError({ ...error, logo: false });
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const onSelectFile = (e) => {
    setError({ ...error, thumbnail: false });
    setSelectedPreviewImages(e.target.files[0]);
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileURL = event.target.result;
        setImagePreview(fileURL);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        setError({ ...error, logo: false });
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const changeProjectStatus = () => {
    setStatus(status == 1 ? 0 : 1);
  };

  const handleQuillChange = (value) => {
    setError({ ...error, description: false });
    setDescription(value);
  };

  const [opt1, setOpt1] = useState("project");
  const [opt2, setOpt2] = useState("zodiac");
  const [ans, setAns] = useState();
  const handleAns = (event) => {
    setError({ ...error, projectType: false });
    setAns(event.target.value);
  };
  /**---------------fetch project gallery----------- */
  const onSelectGallery = async (e) => {
    const nowImage = e.target.files[0];
    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("projectId", params.slug);
    bodyContent.append("pro_image", nowImage);
    await fetch(`${apiRoute}/addprogallery`, {
      // Adding method type
      method: "POST",
      body: bodyContent,
    }).then(() => {
      // Adding a delay of 4 seconds (4000 milliseconds) before calling fetchProjectDetail()
      setTimeout(() => {
        fetchProjectDetail();
      }, 100);
    });
  };

  /**---------------fetch project gallery----------- */
  /**---delete gallery image-------- */
  const deleteGalleryImage = async (e) => {
    const imgId = e;
    console.log(e);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    await fetch(`${apiRoute}/deleteimagegal`, {
      // Adding method type
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      // Adding body or contents to send
      body: JSON.stringify({
        userId: `${userId}`,
        galId: [imgId],
      }),
    }).then(fetchProjectDetail());
  };

  const fetchProjectDetail = useCallback(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      userId: `${userId}`,
      proId: params.slug,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/detailproject`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setGalleryimages(result.imageGallery);
        setSelectedPreviewImages(result.Data.image);
        setDescription(result.Data.description);
        setName(result.Data.name);
        setShortDesc(result.Data.short_desc);
        setArea(result.Data.area);
        setDistrict(result.Data.district);
        setState(result.Data.state);
        setPincode(result.Data.pincode);
        setLatitude(result.Data.latitude);
        setLongitude(result.Data.longitude);
        setAns(result.Data.type);
        setStatus(result.Data.status);
        setFormValues(result.Data.speciesArray);
        setEditable(result.Data.isEditable);
        setPoweredby(result.Data.poweredName);
        setPoweredlogo(result.Data.poweredImage);
        setSequence(result.Data.sequence);
        setLoading(false);
      })
      //  .catch(error => console.log('error', error))
      .then
      //console.log(galleryimages)
      ();
  }, [apiRoute, params.slug]);
  useEffect(() => {
    fetchProjectDetail();
    getSpecies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProjectDetail]);
  /**---fetch-project details--- */

  if (isLoading) return <Loader />;
  if (!data) return <p>No profile data</p>;
  /*-------------------------------------------------------update project-------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    const newError = {
      name: !name,
      shortDesc: !shortDesc,
      description: !description,
      sequence: !sequence,
      area: !area,
      state: !state,
      district: !district,
      longitude: !longitude,
      latitude: !latitude,
      pincode: !pincode,
      projectType: !ans,
      species: formValues[0].name?.length === 0 || !formValues[0].total,
      // Uncomment this if need to add validation for this field also
      // || formValues[0].planted === 0,
      logo: !poweredlogo,
      thumbnail: !selectedPreviewImages,
      quantity: !formValues,
    };
    setError(newError);

    if (
      newError.name ||
      newError.shortDesc ||
      newError.description ||
      newError.sequence ||
      newError.area ||
      newError.state ||
      newError.district ||
      newError.longitude ||
      newError.latitude ||
      newError.pincode ||
      newError.projectType ||
      newError.species ||
      newError.logo ||
      newError.thumbnail ||
      newError.quantity
    ) {
      return; // Don't call the API if fields are empty
    }
    const modifiedContent = description
      .replace(/<p>/g, `<div>`)
      .replace(/<\/p>/g, "</div>");
    pendingPopup();

    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("proId", data.projectId);
    bodyContent.append("project_image", selectedPreviewImages);
    bodyContent.append("name", name);
    bodyContent.append("short_desc", shortDesc);
    bodyContent.append("description", modifiedContent);
    bodyContent.append("district", district);
    bodyContent.append("state", state);
    bodyContent.append("pincode", pincode);
    bodyContent.append("area", area);
    bodyContent.append("latitude", latitude);
    bodyContent.append("longitude", longitude);
    bodyContent.append("type", ans);
    bodyContent.append("poweredName", poweredby);
    bodyContent.append("powered_image", poweredlogo);
    bodyContent.append("status", status);
    bodyContent.append("sequence", sequence);
    bodyContent.append("speciesArray", JSON.stringify(formValues));

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/editproject`,
      { method: "POST", body: bodyContent }
    );
    setIsButtonEnabled(false);
    const data1 = await response.json();
    // console.log(data1)

    function successPopup() {
      toast.success(`${data1.Message}`);
      toast.dismiss(toastId.current);
      setIsButtonEnabled(false);router.back();
      router.push("/Projects");
    }
    function failPopup() {
      toast.error(`${data1.Message}`);
      toast.dismiss(toastId.current);
      setIsButtonEnabled(true);
    }
    function pendingPopup() {
      toastId.current = toast.loading("Updating Project");
      setIsButtonEnabled(true);
    }

    {
      data1.Status === true ? successPopup() : failPopup();
    }
  }
  /**----------------------------------------------------------------update project--------------------------------------------- */
  /**--------------------------------------------------------------------delete project------------------------------ */
  async function deleteProject() {
    pendingPopup1();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userId: `${userId}`,
      proId: [data.projectId],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let deleteResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/deleteproject`,
      requestOptions
    );

    let deleteData = await deleteResponse.json();

    function successPopup1() {
      toast.success(`${deleteData.Message}`);
      toast.dismiss(toastId.current);
    }
    function failPopup1() {
      toast.error(`${deleteData.Message}`);
      toast.dismiss(toastId.current);
    }
    function pendingPopup1() {
      toastId.current = toast.loading("Deleting Project");
    }

    {
      deleteData.Status === true ? successPopup1() : failPopup1();
    }
    {
      deleteData.Status === true ? router.push("/Projects") : "";
    }
  }
  /**--------------------------------------------------------------------delete project------------------------------- */

  /**----------------------------------------------------fetch species list & functionality-------- */
  async function getSpecies() {
    const species = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/specieslist`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: `${userId}`,
          speciesArray: speciesArray,
        }),
      }
    );

    const arrSpec = await species.json();
    setSpeciesArray(arrSpec.Data);
  }

  const handleChange = (index, e) => {
    setError({ ...error, species: false });
    setFormValues((prevFormValues) => {
      const newFormValues = [...prevFormValues];
      newFormValues[index] = { ...newFormValues[index], name: e.target.value };
      return newFormValues;
    });
  };

  const handleChange1 = (index, e) => {
    setError({ ...error, quantity: false });
    setFormValues((prevFormValues) => {
      const newFormValues = [...prevFormValues];
      newFormValues[index] = { ...newFormValues[index], total: e.target.value };
      return newFormValues;
    });
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "", total: "", planted: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  const throttledUpload = throttle(uploadWithFormData, 5000);
  /**------------------------------------------------------------fetch species list- &functionality------- */

  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Project Detail</h2>
            <p>Update project info and extras.</p>
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
                  <div className="input-head">Project Title/Name</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError({ ...error, name: false });
                      }}
                    />
                    {error.name && (
                      <span className="error-text">Name is required.</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Project Type</div>
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
                      </Select>
                      {error.projectType && (
                        <span className="error-text">
                          Project Type is required.
                        </span>
                      )}
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Short Description</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Textarea
                      disabled={false}
                      minRows={2}
                      size="lg"
                      variant="soft"
                      placeholder=""
                      value={shortDesc}
                      onChange={(e) => {
                        setShortDesc(e.target.value);
                        setError({ ...error, shortDesc: false });
                      }}
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                    />
                    {error.shortDesc && (
                      <span className="error-text">shortDesc is required.</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Powered by Logo</div>
                </div>
                <div className="col-md-8">
                  <div
                    className="input-field"
                    style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                  >
                    {logoPreview ? (
                      <Image
                        src={logoPreview}
                        alt={data.name}
                        width={200}
                        height={200}
                      />
                    ) : (
                      <Image
                        src={data.poweredImage}
                        alt={data.name}
                        width={200}
                        height={200}
                      />
                    )}
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
                        onChange={onSelectLogo}
                        multiple
                        accept="image/png , image/jpeg, image/webp"
                        style={{ opacity: "0" }}
                      />
                    </Button>
                    {error.logo && (
                      <span className="error-text">
                        {"  "}Logo is required.
                      </span>
                    )}
                    {poweredlogo === !null ? "" : poweredlogo.name}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Powered by Content</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Textarea
                      disabled={false}
                      minRows={1}
                      size="lg"
                      variant="soft"
                      placeholder=""
                      value={poweredby}
                      onChange={(e) => {
                        setPoweredby(e.target.value);
                      }}
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Sequence no.</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      type="number"
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={sequence}
                      onChange={(e) => {
                        setSequence(e.target.value);
                        setError({ ...error, sequence: false });
                      }}
                    />
                    {error.sequence && (
                      <span className="error-text">Sequence is required.</span>
                    )}
                  </div>
                </div>
              </div>
              {/* ------------------------------------------------------------------------------------------------------------------------------------------------------- */}

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Species</div>
                </div>

                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="input-head">Select Species</div>
                    </div>
                    <div className="col-md-4">
                      <div className="input-head">Quantity</div>
                    </div>
                    <div className="col-md-4">
                      <div className="input-head">Planted</div>
                    </div>
                  </div>

                  {formValues.map((element, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-4">
                        <div className="input-field">
                          <FormControl
                            fullWidth
                            // {...(isEditable ? { disabled: false } : {disabled: true})}
                          >
                            <Select
                              style={{ fontSize: "14px" }}
                              name="species"
                              value={element.name}
                              onChange={(e) => handleChange(index, e)}
                            >
                              {speciesArray
                                .filter(
                                  (name) =>
                                    !formValues.some(
                                      (value, i) =>
                                        i !== index && value.name === name.name
                                    )
                                )
                                .map((item) => (
                                  <MenuItem value={item.name} key={item._id}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                            </Select>
                            {error.formValues && (
                              <span className="error-text">
                                Species is required.
                              </span>
                            )}
                            {error.species && (
                              <span className="error-text">
                                Species is required.
                              </span>
                            )}
                          </FormControl>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-field">
                          <Input
                            type="number"
                            name="quantity"
                            value={formValues[index].total}
                            onChange={(e) => handleChange1(index, e)}
                            variant="soft"
                            size="lg"
                            style={{ padding: "12px 15px", fontSize: "15px" }}
                            placeholder=""
                            // {...(isEditable ? { disabled: false } : {disabled: true})}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="input-field">
                          <Input
                            type="text"
                            name=""
                            value={formValues[index].planted}
                            variant="soft"
                            size="lg"
                            style={{ padding: "12px 15px", fontSize: "15px" }}
                            placeholder=""
                            disabled
                          />
                          {error.quantity && (
                            <span className="error-text">
                              Quantity is required.
                            </span>
                          )}
                        </div>
                      </div>
                      {index ? (
                        //  (isEditable ?
                        <div className="col-md-2">
                          {" "}
                          <DeleteForeverIcon
                            onClick={() => removeFormFields(index)}
                            style={{
                              color: "red",
                              fontSize: "20px",
                              cursor: "pointer",
                              marginTop: "5px",
                            }}
                          />
                        </div>
                      ) : (
                        //  : null )
                        ""
                      )}
                    </div>
                  ))}

                  <div className="col-md-4">
                    <div className="input-field">
                      {/*                          
                      { formValues.length > speciesArray.length - 1 ? '': <Button variant="outlined" color="success" style={{width:'100%', fontSize:'12px',padding:'7px'}}  onClick={() => addFormFields()}><AddCircleOutlineIcon  /> Add More Species</Button> } */}

                      {/* {isEditable && formValues.length < speciesArray.length && ( */}
                      {formValues.length < speciesArray.length && (
                        <Button
                          variant="outlined"
                          color="primary" // Change to a valid color value
                          style={{
                            width: "100%",
                            fontSize: "12px",
                            padding: "7px",
                          }}
                          onClick={() => addFormFields()}
                        >
                          <AddCircleOutlineIcon /> Add More Species
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------------------------------------------------------------------------------------------- */}

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">
                    Project Thumbnail Image (1500px * 500px)
                  </div>
                </div>
                <div className="col-md-8">
                  <div
                    className="input-field"
                    style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                  >
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt={data.name}
                        width={200}
                        height={200}
                      />
                    ) : (
                      <Image
                        src={data.image}
                        alt={data.name}
                        width={200}
                        height={200}
                      />
                    )}

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
                        accept="image/png, image/jpeg, image/webp"
                        style={{ opacity: "0" }}
                      />
                    </Button>
                    {error.thumbnail && (
                      <span className="error-text">Thumbnail is required.</span>
                    )}
                    {selectedPreviewImages === !null
                      ? ""
                      : selectedPreviewImages.name}
                  </div>
                </div>
              </div>
              {/* -----------------------------------gallery--------------- ------------*/}
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">
                    Project Gallery (500px * 500px)
                  </div>
                </div>
                <div className="col-md-8">
                  <div
                    className="input-field"
                    style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                  >
                    {galleryimages?.map((file, i) => {
                      return (
                        <div
                          key={file._id}
                          style={{
                            display: "inline-block",
                            position: "relative",
                          }}
                        >
                          <Image
                            src={file.pro_image}
                            alt="project image"
                            width={100}
                            height={100}
                            style={{
                              marginRight: "10px",
                              marginBottom: "10px",
                            }}
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteGalleryImage(file._id)}
                          >
                            <HighlightOffIcon
                              style={{
                                color: "#e90000",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          </span>
                        </div>
                      );
                    })}
                    <p></p>
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
                        accept="image/png , image/jpeg, image/webp"
                        style={{ opacity: "0" }}
                        onChange={onSelectGallery}
                      />
                    </Button>{" "}
                    <br />
                  </div>
                </div>
              </div>
              {/* -----------------------------------gallery---------------------------- */}
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Area</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={area}
                      onChange={(e) => {
                        setArea(e.target.value);
                        setError({ ...error, area: false });
                      }}
                    />
                    {error.area && (
                      <span className="error-text">Area is required.</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">District</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                        setError({ ...error, district: false });
                      }}
                    />
                    {error.district && (
                      <span className="error-text">District is required.</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">State</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        setError({ ...error, state: false });
                      }}
                    />
                    {error.state && (
                      <span className="error-text">State is required.</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Pincode</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={pincode}
                      onChange={(e) => {
                        setPincode(e.target.value);
                        setError({ ...error, pincode: false });
                      }}
                    />
                    {error.pincode && (
                      <span className="error-text">Pincode is required.</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Latitude</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      type="number"
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={latitude}
                      onChange={(e) => {
                        setLatitude(e.target.value);
                        setError({ ...error, latitude: false });
                      }}
                    />
                    {error.latitude && (
                      <span className="error-text">Latitude is required.</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">longitude</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      type="number"
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={longitude}
                      onChange={(e) => {
                        setLongitude(e.target.value);
                        setError({ ...error, longitude: false });
                      }}
                    />
                    {error.longitude && (
                      <span className="error-text">Longitude is required.</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Created At</div>
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
                  <div className="input-head">Project Detail</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={handleQuillChange}
                      modules={modules}
                      style={{ height: "400px", marginBottom: "100px" }}
                    />
                    {error.description && (
                      <span className="error-text">Details are required.</span>
                    )}
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
                      onChange={() => changeProjectStatus()}
                    />
                  </div>
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
                    href="/Projects"
                  >
                    {" "}
                    Back{" "}
                  </Link>
                </div>
                {data.isEditable ? (
                  <div className="col-md-4">
                    <Button
                      variant="outlined"
                      color="error"
                      style={{
                        width: "100%",
                        fontSize: "15px",
                        padding: "10px",
                      }}
                      onClick={deleteProject}
                    >
                      {" "}
                      Delete Project{" "}
                    </Button>
                  </div>
                ) : (
                  ""
                )}
                <div className="col-md-4">
                  <Button
                    variant="contained"
                    color="success"
                    style={{ width: "100%", fontSize: "15px", padding: "10px" }}
                    onClick={throttledUpload}
                    disabled={!isButtonEnabled}
                  >
                    {" "}
                    Update Project
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
