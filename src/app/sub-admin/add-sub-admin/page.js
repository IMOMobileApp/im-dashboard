"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Grid, Switch } from "@mui/material";
import { toast } from "react-toastify";

export default function AddSubAdmin() {
  let router = useRouter();
  const apiRoute = process.env.API_ROUTE;
  const [userData, setUserData] = useState();
  useEffect(() => {
    const storedData = localStorage.getItem("loginResponse");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  const [orderView, setOrderView] = useState(false);
  const [treeApprovalView, setTreeApprovalView] = useState(false);
  const [userView, setUserView] = useState(false);
  const [championView, setChampionView] = useState(false);
  const [mediaView, setMediaView] = useState(false);
  const [projectView, setProjectView] = useState(false);
  const [csrProjectView, setCsrProjectView] = useState(false);
  const [treeView, setTreeView] = useState(false);
  const [speciesView, setSpeciesView] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [founderView, setFounderView] = useState(false);
  const [partnerView, setPartnerView] = useState(false);
  const [vanamaliView, setVanamaliView] = useState(false);
  const [policyView, setPolicyView] = useState(false);
  const [leaderView, setLeaderView] = useState(false);
  const [certificateView, setCertificateView] = useState(false);
  const [gicView, setGicView] = useState(false);
  const [wfwView, setWfwView] = useState(false);
  const [giftView, setGiftView] = useState(false);
  const [leadsView, setLeadsView] = useState(false);
  const [websiteView, setWebsiteView] = useState(false);
  const [webBlogView, setWebBlogView] = useState(false);
  const [initiativeView, setInitiativeView] = useState(false);
  const [gitImpactView, setGitImpactView] = useState(false);
  const [waterImpactView, setWaterImpactView] = useState(false);
  const [bannerView, setBannerView] = useState(false);
  const [brochureView, setBrochureView] = useState(false);
  const [seoView, setSeoView] = useState(false);
  const toastId = useRef(null);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const handleOrder = (event) => {
    setOrderView(event.target.checked);
  };
  const handleTreeApproval = (event) => {
    setTreeApprovalView(event.target.checked);
  };
  const handleUserView = (event) => {
    setUserView(event.target.checked);
  };
  const handleChamp = (event) => {
    setChampionView(event.target.checked);
  };
  const handleMedia = (event) => {
    setMediaView(event.target.checked);
  };
  const handleProject = (event) => {
    setProjectView(event.target.checked);
  };
  const handleCSRProject = (event) => {
    setCsrProjectView(event.target.checked);
  };
  const handleTree = (event) => {
    setTreeView(event.target.checked);
  };
  const handleSpecies = (event) => {
    setSpeciesView(event.target.checked);
  };
  const handleMobile = (event) => {
    setMobileView(event.target.checked);
  };
  const handleFounder = (event) => {
    setFounderView(event.target.checked);
  };
  const handlePartner = (event) => {
    setPartnerView(event.target.checked);
  };
  const handleVanamali = (event) => {
    setVanamaliView(event.target.checked);
  };
  const handlePolicy = (event) => {
    setPolicyView(event.target.checked);
  };
  const handleLeader = (event) => {
    setLeaderView(event.target.checked);
  };
  const handleCertificate = (event) => {
    setCertificateView(event.target.checked);
  };
  const handleGic = (event) => {
    setGicView(event.target.checked);
  };
  const handleWfw = (event) => {
    setWfwView(event.target.checked);
  };
  const handleGift = (event) => {
    setGiftView(event.target.checked);
  };
  const handleLeads = (event) => {
    setLeadsView(event.target.checked);
  };
  const handleWebsite = (event) => {
    setWebsiteView(event.target.checked);
  };
  const handleWebBlog = (event) => {
    setWebBlogView(event.target.checked);
  };
  const handleInitiative = (event) => {
    setInitiativeView(event.target.checked);
  };
  const handleGitImpact = (event) => {
    setGitImpactView(event.target.checked);
  };
  const handleWater = (event) => {
    setWaterImpactView(event.target.checked);
  };
  const handleBanner = (event) => {
    setBannerView(event.target.checked);
  };
  const handleBochure = (event) => {
    setBrochureView(event.target.checked);
  };
  const handleSeo = (event) => {
    setSeoView(event.target.checked);
  };
  /*-------------------------------------------------------update Blog-----------------------------------------------------------------------------------*/
  const uploadData = useCallback(async () => {
    pendingPopup();
    let data = JSON.stringify({
      userId: userData?.Data?.userId,
      name: name,
      email: email,
      phone: phone,
      password: password,
      orderView: orderView == true ? "1" : "0",
      treeApproval: treeApprovalView == true ? "1" : "0",
      userView: userView == true ? "1" : "0",
      championView: championView == true ? "1" : "0",
      mediaView: mediaView == true ? "1" : "0",
      projectView: projectView == true ? "1" : "0",
      csrProjectView: csrProjectView == true ? "1" : "0",
      treeView: treeView == true ? "1" : "0",
      speciesView: speciesView == true ? "1" : "0",
      mobileAppView: mobileView == true ? "1" : "0",
      founderView: founderView == true ? "1" : "0",
      partnerView: partnerView == true ? "1" : "0",
      vanamaliView: vanamaliView == true ? "1" : "0",
      policyView: policyView == true ? "1" : "0",
      leaderView: leaderView == true ? "1" : "0",
      certificateView: certificateView == true ? "1" : "0",
      gicView: gicView == true ? "1" : "0",
      wfwView: wfwView == true ? "1" : "0",
      giftView: giftView == true ? "1" : "0",
      leadsView: leadsView == true ? "1" : "0",
      websiteView: websiteView == true ? "1" : "0",
      webBlogView: webBlogView == true ? "1" : "0",
      initiativeView: initiativeView == true ? "1" : "0",
      gitImpactView: gitImpactView == true ? "1" : "0",
      waterImpactView: waterImpactView == true ? "1" : "0",
      bannerView: bannerView == true ? "1" : "0",
      brochureView: brochureView == true ? "1" : "0",
      seoView: seoView == true ? "1" : "0",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/addSubAdmin`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };

    toastId.current = toast.loading("Updating Detail");

    const response = await axios.request(config);
    const data1 = response.data;
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
      toastId.current = toast.loading("Updating Detail");
    }

    {
      data1.Status === true ? successPopup() : failPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    apiRoute,
    bannerView,
    brochureView,
    certificateView,
    championView,
    csrProjectView,
    email,
    founderView,
    gicView,
    giftView,
    gitImpactView,
    initiativeView,
    leaderView,
    leadsView,
    mediaView,
    mobileView,
    name,
    orderView,
    partnerView,
    password,
    phone,
    policyView,
    projectView,
    seoView,
    speciesView,
    treeApprovalView,
    treeView,
    userData,
    userView,
    vanamaliView,
    waterImpactView,
    webBlogView,
    websiteView,
    wfwView,
  ]);

  /**----------------------------------------------------------------update blog--------------------------------------------- */
  /**---------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Add Sub Admin</h2>
            <p>Add subAdmin info and extras.</p>
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
                  <div className="input-head">Name</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Email</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      type="email"
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Phone Number</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      type="number"
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Password</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <Input
                      type="password"
                      placeholder=""
                      variant="soft"
                      size="lg"
                      style={{ padding: "12px 15px", fontSize: "15px" }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <Grid>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)", // 2 columns by default
                    gap: "10px", // spacing between items
                  }}
                >
                  {/* Responsive behavior */}
                  <style>
                    {`
                    @media (min-width: 768px) {
                      div {
                        grid-template-columns: repeat(2, 1fr); // 3 columns on wider screens
                      }
                    }
                  `}
                  </style>
                  {/* Item 1 */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Order View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={orderView}
                        onChange={handleOrder}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      User View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={userView}
                        onChange={handleUserView}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Champion View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={championView}
                        onChange={handleChamp}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  {/* Item 3 */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Media View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={mediaView}
                        onChange={handleMedia}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Project View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={projectView}
                        onChange={handleProject}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      CSR Project View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={csrProjectView}
                        onChange={handleCSRProject}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>

                  {/* Item 6 */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Tree Approval
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={treeApprovalView}
                        onChange={handleTreeApproval}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Tree View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={treeView}
                        onChange={handleTree}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Species View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={speciesView}
                        onChange={handleSpecies}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Mobile App View
                    </div>

                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={mobileView}
                        onChange={handleMobile}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Founders View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={founderView}
                        onChange={handleFounder}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Partner View
                    </div>

                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={partnerView}
                        onChange={handlePartner}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Vanamali View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={vanamaliView}
                        onChange={handleVanamali}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Policy View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={policyView}
                        onChange={handlePolicy}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Leader View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={leaderView}
                        onChange={handleLeader}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Certificate View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={certificateView}
                        onChange={handleCertificate}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      GIC View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={gicView}
                        onChange={handleGic}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      WFW View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={wfwView}
                        onChange={handleWfw}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Gift View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={giftView}
                        onChange={handleGift}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Leads View
                    </div>

                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={leadsView}
                        onChange={handleLeads}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Website View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={websiteView}
                        onChange={handleWebsite}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      WebBlog View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={webBlogView}
                        onChange={handleWebBlog}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Initiative View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={initiativeView}
                        onChange={handleInitiative}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      GitImpact View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={gitImpactView}
                        onChange={handleGitImpact}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Water Impact View
                    </div>

                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={waterImpactView}
                        onChange={handleWater}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Banner View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={bannerView}
                        onChange={handleBanner}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      Brochure View
                    </div>
                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={brochureView}
                        onChange={handleBochure}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        fontSize: "1.1rem",
                      }}
                    >
                      SEO View
                    </div>

                    <div style={{ width: "60%" }}>
                      <Switch
                        checked={seoView}
                        onChange={handleSeo}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>
                </div>
              </Grid>
              <div className="row">
                <div className="col-md-6">
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
                    href="/sub-admin"
                  >
                    {" "}
                    Cancel{" "}
                  </Link>
                </div>
                <div className="col-md-6">
                  <Button
                    variant="contained"
                    color="success"
                    style={{ width: "100%", fontSize: "15px", padding: "10px" }}
                    onClick={uploadData}
                  >
                    {" "}
                    Add Sub Admin
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
