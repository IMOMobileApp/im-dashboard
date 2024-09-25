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
  const [userData, setUserData] = useState();
  useEffect(() => {
    const storedData = localStorage.getItem("loginResponse");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [description, setDescription] = useState(
    "<p>hey this is text editor</p>"
  );
  const [name, setName] = useState();
  const [shortDesc, setShortDesc] = useState();
  const [area, setArea] = useState("");
  const [district, setDistrict] = useState();
  const [state, setState] = useState();
  const [pincode, setPincode] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [selectedImages, setSelectedImages] = useState(null);
  const [imagePreview, setImagePreview] = useState();
  const [galleryimages, setGalleryimages] = useState([]);
  const [status, setStatus] = useState(1);
  const [speciesArray, setSpeciesArray] = useState([]);
  const [formValues, setFormValues] = useState([
    { name: "", total: "", planted: "" },
  ]);
  const [isEditable, setEditable] = useState();
  const [sequence, setSequence] = useState();
  const [poweredby, setPoweredby] = useState();
  const [poweredlogo, setPoweredlogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState();

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

  const changeProjectStatus = () => {
    setStatus(status == 1 ? 0 : 1);
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

  const handleQuillChange = (value) => {
    const letterSpacing = "20px";
    const fontSize = "18px";
    const fontFamily = "Montserrat, sans-serif";
    setDescription(value);
  };

  const [opt1, setOpt1] = useState("CSR");
  const [opt2, setOpt2] = useState("zodiac");
  const [ans, setAns] = useState("CSR");
  const handleAns = (event) => {
    setAns(event.target.value);
  };
  /**---------------fetch project gallery----------- */
  const onSelectGallery = async (e) => {
    const nowImage = e.target.files[0];
    let bodyContent = new FormData();
    bodyContent.append("userId", `${userData?.Data?.userId}`);
    bodyContent.append("projectId", params.slug);
    bodyContent.append("pro_image", nowImage);
    await fetch(`${apiRoute}/addprogallery`, {
      // Adding method type
      method: "POST",
      // Adding body or contents to send
      body: bodyContent,
    })
      // Converting to JSON
      .then(() => {
        // Adding a delay of 4 seconds (4000 milliseconds) before calling fetchProjectDetail()
        setTimeout(() => {
          fetchProjectDetail();
        }, 100);
      });
    // .then(fetchProjectDetail())
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
        userId: `${userData?.Data?.userId}`,
        galId: [imgId],
      }),
    }).then(fetchProjectDetail());
  };
  /**---delete gallery image-------- */
  /**---fetch-project details--- */
  const fetchProjectDetail = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      userId: `${userData?.Data?.userId}`,
      proId: params.slug,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${apiRoute}/detailCSRproject`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Data);
        setGalleryimages(result.imageGallery);
        setSelectedImages(result.Data.image);
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
        setUsername(result.Data.userName);
        setUseremail(result.Data.userEmail);
        setUsernumber(result.Data.userNumber);
        setLoading(false);
      })
      //  .catch(error => console.log('error', error))
      .then
      //console.log(galleryimages)
      ();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  useEffect(() => {
    if(userData){
    fetchProjectDetail();
    }
    getSpecies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  /**---fetch-project details--- */

  if (isLoading) return <Loader />;
  if (!data) return <p>No profile data</p>;
  /*-------------------------------------------------------update project-------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    const modifiedContent = description
      .replace(/<p>/g, `<div>`)
      .replace(/<\/p>/g, "</div>");
    pendingPopup();

    let bodyContent = new FormData();
    bodyContent.append("userId", `${userData?.Data?.userId}`);
    bodyContent.append("proId", data.proId);
    bodyContent.append("project_image", selectedImages);
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
    bodyContent.append("userName", username);
    bodyContent.append("userEmail", useremail);
    bodyContent.append("userNumber", usernumber);
    bodyContent.append("speciesArray", JSON.stringify(formValues));

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/editCSRproject`,
      { method: "POST", body: bodyContent }
    );

    const data1 = await response.json();
    // console.log(data1)

    function successPopup() {
      toast.success(`${data1.Message}`);
      toast.dismiss(toastId.current);
      router.back();
    }
    function failPopup() {
      toast.error(`${data1.Message}`);
      toast.dismiss(toastId.current);
    }
    function pendingPopup() {
      toastId.current = toast.loading("Updating Project");
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
      userId: `${userData?.Data?.userId}`,
      proId: [data.proId],
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
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

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
      deleteData.Status === true ? router.push("/CSRProjects") : "";
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
          userId: `${userData?.Data?.userId}`,
          speciesArray: speciesArray,
        }),
      }
    );

    const arrSpec = await species.json();
    setSpeciesArray(arrSpec.Data);
  }

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
      // if(   e.target.value < newFormValues[index].total){
      //   newFormValues[index] = { ...newFormValues[index] };
      //   return newFormValues;
      // }
      // else{
      //   newFormValues[index] = { ...newFormValues[index], total: e.target.value };
      //   return newFormValues;
      // }
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

  /**------------------------------------------------------------fetch species list- &functionality------- */

  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>CSR Project Detail</h2>
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
                        defaultValue={ans}
                        value={ans}
                        onChange={handleAns}
                        style={{ fontSize: "14px" }}
                      >
                        <MenuItem value={opt1}>{opt1}</MenuItem>
                        {/* <MenuItem value={opt2}>{opt2}</MenuItem>  */}
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
                    {/* {selectedImages.map((i,r)=>{return <Image src={i.pro_image}  width={200} height={200} key={i._id} alt="project gallery"/> })} */}
                    <p></p>
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
                    {selectedImages === !null ? "" : selectedImages.name}
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
                  <div className="input-head">longitude</div>
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
                    href="/CSRProjects"
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
                    onClick={uploadWithFormData}
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
