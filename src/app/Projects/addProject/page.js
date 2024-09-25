"use client";

import { useState, useRef, useEffect } from "react";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";
import FormData from "form-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Addproject() {
  let router = useRouter();
  const toastId = useRef(null);
    // const userData = JSON.parse(localStorage.getItem("loginResponse"));
  const [userData, setUserData] = useState();
  useEffect(() => {
    const storedData = localStorage.getItem("loginResponse");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  const userId = userData?.Data?.userId;
  //console.log("first", userId);
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
  const [selectedImages, setSelectedImages] = useState();
  const [imagePreview, setImagePreview] = useState();
  console.log(selectedImages);
  const [speciesArray, setSpeciesArray] = useState([]);
  const [formValues, setFormValues] = useState([{ name: "", total: "" }]);
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
  const [poweredby, setPoweredby] = useState();
  const [poweredlogo, setPoweredlogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState();
  const [sequence, setSequence] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

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
    setSelectedImages(e.target.files[0]);
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

  const [opt1, setOpt1] = useState("project");
  const [opt2, setOpt2] = useState("zodiac");
  const [ans, setAns] = useState("project");
  const handleAns = (event) => {
    setError({ ...error, projectType: false });
    if (event.target.value == "project") {
      setAns("project");
    } else {
      setAns("zodiac");
    }
  };
  /*-------------------------------------------------------update project-----------------------------------------------------------------*/
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
      species: !formValues,
      logo: !poweredlogo,
      thumbnail: !selectedImages,
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

    pendingPopup();
    let bodyContent = new FormData();
    bodyContent.append("userId", `${userId}`);
    bodyContent.append("name", name);
    bodyContent.append("project_image", selectedImages);
    bodyContent.append("description", description);
    bodyContent.append("short_desc", shortDesc);
    bodyContent.append("area", area);
    bodyContent.append("district", district);
    bodyContent.append("state", state);
    bodyContent.append("pincode", pincode);
    bodyContent.append("latitude", latitude);
    bodyContent.append("longitude", longitude);
    bodyContent.append("type", ans);
    bodyContent.append("poweredName", poweredby);
    bodyContent.append("powered_image", poweredlogo);
    bodyContent.append("speciesArray", JSON.stringify(formValues));
    bodyContent.append("status", 1);
    bodyContent.append("sequence", sequence);

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/addproject`,
      { method: "POST", body: bodyContent }
    );

    setIsButtonEnabled(false);
    const data1 = await response.json();

    function successPopup() {
      toast.success(`${data1.Message}`);
      toast.dismiss(toastId.current);
      setIsButtonEnabled(false);
      router.back();
    }
    function failPopup() {
      toast.error(`${data1.Message}`);
      toast.dismiss(toastId.current);
      setIsButtonEnabled(true);
    }
    function pendingPopup() {
      toastId.current = toast.loading("Updating Projects");
      setIsButtonEnabled(true);
    }

    if (data1.Status === true) {
      successPopup();
    } else {
      failPopup();
    }
  }
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

  const getSpecies = async () => {
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
  };

  useEffect(() => {
    getSpecies();
    speciesArray;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setFormValues([...formValues, { name: "", total: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  const handleQuillChange = (value) => {
    setError({ ...error, description: false });
    setDescription(value);
  };
  /**------------------------------------------------------------fetch species list- &functionality------- */

  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Add Project</h2>
            <p>Add project info and extras.</p>
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
                  <div className="input-head">
                    Project Thumbnail Image (1500px * 500px)
                  </div>
                </div>
                <div className="col-md-8">
                  <div
                    className="input-field"
                    style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
                  >
                    {imagePreview && (
                      <Image
                        src={imagePreview}
                        alt="project image"
                        width={200}
                        height={200}
                      />
                    )}
                    <br />
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
                        accept="image/png , image/jpeg, image/webp"
                        style={{ opacity: "0" }}
                      />
                    </Button>{" "}
                    {error.thumbnail && (
                      <span className="error-text">Thumbnail is required.</span>
                    )}
                    <br />
                    {selectedImages?.name}
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
                    {logoPreview && (
                      <Image
                        src={logoPreview}
                        alt="project image"
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
                    {poweredlogo === null ? "" : poweredlogo.name}
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

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Species</div>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-head">Select Species</div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-head">Quantity</div>
                    </div>
                  </div>

                  {formValues.map((element, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-5">
                        {/* <input type="text" name="species" value={formValues[index].species} onChange={e => handleChange(index, e)} /> */}
                        <div className="input-field">
                          <FormControl fullWidth>
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
                          </FormControl>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="input-field">
                          <Input
                            type="text"
                            name="quantity"
                            value={formValues[index].total}
                            onChange={(e) => handleChange1(index, e)}
                            variant="soft"
                            size="lg"
                            style={{ padding: "12px 15px", fontSize: "15px" }}
                            placeholder=""
                          />
                          {error.quantity && (
                            <span className="error-text">
                              Quantity is required.
                            </span>
                          )}
                        </div>
                      </div>
                      {index ? (
                        <div className="col-md-2">
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
                      ) : null}
                    </div>
                  ))}

                  <div className="col-md-4">
                    <div className="input-field">
                      {formValues.length > speciesArray.length - 1 ? (
                        ""
                      ) : (
                        <Button
                          variant="outlined"
                          color="success"
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
                      {/* <button className="button submit" type="submit" onClick={(event)=> handleSubmit(event)}>Submit</button> */}
                    </div>
                  </div>
                </div>
              </div>

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
                  <div className="input-head">Longitude</div>
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
                  <div className="input-head">Product Details</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    {/* <TextEditor item={data.blog_desc} /> */}
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={handleQuillChange}
                      style={{
                        height: "200px",
                        marginBottom: error.description ? "40px" : "80px",
                      }}
                    />
                    {error.description && (
                      <span className="error-text">Details are required.</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2"></div>
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
                <div className="col-md-4">
                  <Button
                    variant="contained"
                    color="success"
                    style={{ width: "100%", fontSize: "15px", padding: "10px" }}
                    onClick={throttledUpload}
                    disabled={!isButtonEnabled}
                  >
                    {" "}
                    Add Project
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
