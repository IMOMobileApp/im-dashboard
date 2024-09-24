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
  const userData = JSON.parse(localStorage.getItem("loginResponse"));
  const userId = userData?.Data?.userId;
  //console.log("first", userId);
  const toastId = useRef(null);
  const [description, setDescription] = useState("<p></p>");
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
  const [speciesArray, setSpeciesArray] = useState([]);
  const [formValues, setFormValues] = useState([{ name: "", total: "" }]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [poweredby, setPoweredby] = useState();
  const [poweredlogo, setPoweredlogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState();
  const [sequence, setSequence] = useState();
  const [username, setUsername] = useState();
  const [useremail, setUseremail] = useState();
  const [usernumber, setUsernumber] = useState();

  const onSelectLogo = (e) => {
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

  const [opt1, setOpt1] = useState("CSR");
  const [ans, setAns] = useState("CSR");
  const handleAns = (event) => {
    if (event.target.value == "project") {
      setAns("project");
    } else {
      setAns("zodiac");
    }
  };
  /*-------------------------------------------------------update project-----------------------------------------------------------------*/
  async function uploadWithFormData() {
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
    bodyContent.append("userName", username);
    bodyContent.append("userEmail", useremail);
    bodyContent.append("userNumber", usernumber);

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/addCSRproject`,
      { method: "POST", body: bodyContent }
    );
    setIsButtonEnabled(false);

    const data1 = await response.json();
    function successPopup() {
      setIsButtonEnabled(false);
      toast.success(`${data1.Message}`);
      toast.dismiss(toastId.current);
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
    {
      data1.Status === true ? successPopup() : failPopup();
    }
    {
      data1.Status === true ? router.push("/CSRProjects") : "";
    }
    // }
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
    setFormValues((prevFormValues) => {
      const newFormValues = [...prevFormValues];
      newFormValues[index] = { ...newFormValues[index], name: e.target.value };
      return newFormValues;
    });
  };

  const handleChange1 = (index, e) => {
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

  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Add CSR Project</h2>
            <p>Add CSR project info and extras.</p>
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
                  <div className="input-head">CSR Project Title/Name</div>
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
                      }}
                    />
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
                        defaultValue={opt1}
                        value={ans}
                        onChange={handleAns}
                        style={{ fontSize: "14px" }}
                      >
                        <MenuItem value={opt1}>{opt1}</MenuItem>
                      </Select>
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
                      }}
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                    />
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
                  >{logoPreview && (
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
                    <p></p>

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
                  <div className="input-head">Username</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">User Email</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={useremail}
                      onChange={(e) => {
                        setUseremail(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">User Phone</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      type="number"
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={usernumber}
                      onChange={(e) => {
                        setUsernumber(e.target.value);
                      }}
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
                      onChange={(e) => setSequence(e.target.value)}
                    />
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
                      onChange={(e) => setArea(e.target.value)}
                    />
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
                      onChange={(e) => setDistrict(e.target.value)}
                    />
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
                      onChange={(e) => setState(e.target.value)}
                    />
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
                      onChange={(e) => setPincode(e.target.value)}
                    />
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
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                    />
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
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Project Details</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                      style={{ height: "200px", marginBottom: "100px" }}
                    />
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
                    Add CSR Project
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
