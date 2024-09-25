"use client";
import Image from "next/image";
import Link from "next/link";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import { useState } from "react";
import Person2Icon from "@mui/icons-material/Person2";
import ImageIcon from "@mui/icons-material/Image";
import BookIcon from "@mui/icons-material/Book";
import QuizIcon from "@mui/icons-material/Quiz";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import Person4Icon from "@mui/icons-material/Person4";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ForestIcon from "@mui/icons-material/Forest";
import ParkIcon from "@mui/icons-material/Park";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LanguageIcon from "@mui/icons-material/Language";
import GrassIcon from "@mui/icons-material/Grass";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Groups3Icon from "@mui/icons-material/Groups3";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import SystemSecurityUpdateGoodIcon from "@mui/icons-material/SystemSecurityUpdateGood";

export default function Leftbar() {
  const logoBlack = process.env.LOGO_BLACK;
  const logoWhite = process.env.LOGO_WHITE;
  const apiRoute = process.env.API_ROUTE;
  const userData = JSON.parse(localStorage.getItem("loginResponse"));
  const adminType = userData?.Data?.adminType;
  const adminRoles = userData?.Data?.adminRoles;

  const router = useRouter();
  const [active, setActive] = useState(false);
  const [weblist, setWeblist] = useState(false);
  const { showDay } = useSelector((state) => state.toggleDay);
  const viewList = () => {
    setActive(!active);
  };
  const viewWeb = (e) => {
    setWeblist(!weblist);
  };
  const openSubmenu = (e) => {
    console.log(e.target.parentNode.nextSibling);
    if (e.target.parentNode.nextSibling.style.display == "block") {
      e.target.parentNode.nextSibling.style.display = "none";
    } else {
      e.target.parentNode.nextSibling.style.display = "block";
    }
  };

  const removeLogin = () => {
    localStorage.removeItem("loginResponse");
    toast.success("Logout Successfully");
    router.push("/login");
  };

  return (
    <>
      <div className="leftbar">
        <div className="leftbar_div">
          <div className="leftbar-logo">
            <Link href="/dashboard">
              <Image
                src={
                  showDay
                    ? `${apiRoute}/const_img${logoBlack}`
                    : `${apiRoute}/const_img${logoWhite}`
                }
                alt="logo"
                height={40}
                width={200}
              />
            </Link>
          </div>
          {adminType === "subAdmin" ? (
            <div className="leftbar-links">
              <ul>
                <li>
                  <Link href="/dashboard">
                    <DashboardCustomizeOutlinedIcon /> <span>Dashboard</span>
                  </Link>
                </li>
                {adminRoles?.orderView === "1" && (
                  <li className={active ? "active" : ""}>
                    <div onClick={viewList}>
                      <ListIcon />
                      <span>Orders</span>
                    </div>
                    <ul>
                      <li>
                        <Link href="/NewOrders">- New Orders</Link>
                      </li>
                      <li>
                        <Link href="/PendingOrders">- Pending Orders</Link>
                      </li>
                      <li>
                        <Link href="/FulfilledOrders">- Fulfilled Orders</Link>
                      </li>
                      <li>
                        <Link href="/CSROrders">- CSR Orders</Link>
                      </li>
                      <li>
                        <Link href="/RedeemOrders">- Redeem Orders</Link>
                      </li>
                    </ul>
                  </li>
                )}
                {adminRoles?.userView === "1" && (
                  <li>
                    <Link href="/Users">
                      <Person2Icon /> <span>Users</span>
                    </Link>
                  </li>
                )}
                {adminRoles?.championView === "1" && (
                  <li>
                    <Link href="/Champions">
                      <EmojiEventsIcon /> <span>Champions</span>
                    </Link>
                  </li>
                )}
                {adminRoles?.mediaView === "1" && (
                  <li>
                    <Link href="/ListBanner">
                      <ImageIcon />
                      <span>Media</span>
                    </Link>{" "}
                  </li>
                )}
                {adminRoles?.projectView === "1" && (
                  <li>
                    <Link href="/Projects">
                      <ForestIcon /> <span>Projects</span>
                    </Link>
                  </li>
                )}
                {adminRoles?.csrProjectView === "1" && (
                  <li>
                    <Link href="/CSRProjects">
                      <ForestIcon /> <span>CSR Projects</span>
                    </Link>
                  </li>
                )}
                {adminRoles?.treeView === "1" && (
                  <li>
                    <Link href="/Trees">
                      <ParkIcon /> <span>Trees</span>
                    </Link>
                  </li>
                )}
                {adminRoles?.speciesView === "1" && (
                  <li>
                    <Link href="/Species">
                      <GrassIcon /> <span>Species</span>
                    </Link>
                  </li>
                )}
                {adminRoles?.mobileAppView === "1" && (
                  <li>
                    <div onClick={(e) => openSubmenu(e)}>
                      <SystemSecurityUpdateGoodIcon /> <span>Mobile App</span>
                    </div>
                    <ul>
                      <li>
                        <div onClick={(e) => openSubmenu(e)}>
                          <BookIcon /> <span>App Blogs</span>
                        </div>

                        <ul style={{ paddingLeft: "25px" }}>
                          <li>
                            <Link href="/AppBlogCategories">- Categories</Link>
                          </li>
                          <li>
                            <Link href="/Blogs">- Blogs</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="/ReportPost">
                          <ReportProblemIcon /> <span> Reported Post</span>
                        </Link>{" "}
                      </li>

                      <li>
                        <Link href="/Quiz">
                          <QuizIcon /> <span> Quiz</span>
                        </Link>{" "}
                      </li>
                      <li>
                        <Link href="/Notification">
                          <CircleNotificationsIcon /> <span> Notification</span>
                        </Link>{" "}
                      </li>
                    </ul>
                  </li>
                )}
                {adminRoles?.founderView === "1" && (
                  <li>
                    <Link href="/Founders">
                      <Groups3Icon /> <span> Founders</span>
                    </Link>{" "}
                  </li>
                )}
                {adminRoles?.partnerView === "1" && (
                  <li>
                    <div onClick={(e) => openSubmenu(e)}>
                      <HandshakeIcon /> <span> Partners</span>
                    </div>
                    <ul style={{ paddingLeft: "25px" }}>
                      <li>
                        <Link href="/PartnerCategory">
                          {" "}
                          <span> Category</span>
                        </Link>{" "}
                      </li>
                      <li>
                        <Link href="/Partners">
                          {" "}
                          <span> Partners</span>
                        </Link>{" "}
                      </li>
                    </ul>
                  </li>
                )}
                {adminRoles?.vanamaliView === "1" && (
                  <li>
                    <Link href="/caretakers">
                      <Person4Icon /> <span>Vanamali</span>
                    </Link>
                  </li>
                )}
                {adminRoles?.subAdmin === "1" && (
                  <li>
                    <Link href="/sub-admin">
                      <SupervisorAccountIcon /> <span>Sub Admin</span>
                    </Link>
                  </li>
                )}
                {adminRoles?.policyView === "1" && (
                  <li>
                    <Link href="/PolicyContent">
                      <EditNoteIcon /> <span>Policy Content</span>
                    </Link>
                  </li>
                )}
                {adminRoles?.leaderView === "1" && (
                  <li>
                    <Link href="/Celebrity">
                      <FaceRetouchingNaturalIcon />{" "}
                      <span>Prominent Leaders</span>
                    </Link>
                  </li>
                )}
                {adminRoles?.certificateView === "1" && (
                  <li>
                    <div onClick={(e) => openSubmenu(e)}>
                      <WorkspacePremiumIcon />
                      <span>Certificates</span>
                    </div>
                    <ul>
                      {adminRoles?.gicView === "1" && (
                        <li>
                          <Link href="/Certificates">
                            - <span>GIC </span>
                          </Link>
                        </li>
                      )}
                      {adminRoles?.wfwView === "1" && (
                        <li>
                          <Link href="/WfwCertificates">
                            - <span>WFW </span>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </li>
                )}
                {adminRoles?.giftView === "1" && (
                  <li>
                    <Link href="/GiftCategories">
                      <CardGiftcardIcon /> <span>Gift Categories</span>
                    </Link>
                  </li>
                )}
                {adminRoles?.leadsView === "1" && (
                  <li>
                    <div onClick={(e) => openSubmenu(e)}>
                      <AddIcCallIcon /> <span>Leads</span>
                    </div>
                    <ul>
                      <li>
                        <Link href="/Subscriber">- Subscribers</Link>
                      </li>
                      <li>
                        <Link href="/ContactForm">- Contact Queries</Link>
                      </li>
                      <li>
                        <Link href="/Volunteers">- Volunteers List</Link>
                      </li>
                      <li>
                        <Link href="/Corporates">- Corporate List</Link>
                      </li>
                      <li>
                        <Link href="/Careers">- Career List</Link>
                      </li>
                      <li>
                        <Link href="/Walkforwater">- Rain Water</Link>
                      </li>
                    </ul>
                  </li>
                )}
                {adminRoles?.websiteView === "1" && (
                  <li className={weblist ? "active" : ""}>
                    <div onClick={(e) => viewWeb(e)}>
                      <LanguageIcon /> <span>Website</span>
                    </div>
                    <ul>
                      {adminRoles?.webBlogView === "1" && (
                        <li>
                          <div onClick={(e) => openSubmenu(e)}>
                            <span>- Blogs</span>
                          </div>
                          <ul style={{ paddingLeft: "25px" }}>
                            <li>
                              <Link href="/WebBlogCategories">
                                Blogs Categories
                              </Link>
                            </li>
                            <li>
                              <Link href="/Webblogs">Website Blogs</Link>
                            </li>
                          </ul>
                        </li>
                      )}
                      {adminRoles?.initiativeView === "1" && (
                        <li>
                          <Link href="/InitiativeCategory">
                            - Initiative Gallery
                          </Link>
                        </li>
                      )}
                      {adminRoles?.gicView === "1" && (
                        <li>
                          <Link href="/GicImpact">- GIC Impact</Link>
                        </li>
                      )}
                      {adminRoles?.waterImpactView === "1" && (
                        <li>
                          <Link href="/WaterImpact">- Water Impact</Link>
                        </li>
                      )}
                      {adminRoles?.bannerView === "1" && (
                        <li>
                          <Link href="/WebBanner">- Banner</Link>{" "}
                        </li>
                      )}
                      {adminRoles?.brochureView === "1" && (
                        <li>
                          <Link href="/Brochure">- Brochure</Link>{" "}
                        </li>
                      )}
                      {adminRoles?.seoView === "1" && (
                        <li>
                          <Link href="/SEO">- SEO</Link>{" "}
                        </li>
                      )}
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <div className="leftbar-links">
              <ul>
                <li>
                  <Link href="/dashboard">
                    <DashboardCustomizeOutlinedIcon /> <span>Dashboard</span>
                  </Link>
                </li>
                <li className={active ? "active" : ""}>
                  <div onClick={viewList}>
                    <ListIcon />
                    <span>Orders</span>
                  </div>
                  <ul>
                    <li>
                      <Link href="/NewOrders">- New Orders</Link>
                    </li>
                    <li>
                      <Link href="/PendingOrders">- Pending Orders</Link>
                    </li>
                    <li>
                      <Link href="/FulfilledOrders">- Fulfilled Orders</Link>
                    </li>
                    <li>
                      <Link href="/CSROrders">- CSR Orders</Link>
                    </li>
                    <li>
                      <Link href="/RedeemOrders">- Redeem Orders</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/Users">
                    <Person2Icon /> <span>Users</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Champions">
                    <EmojiEventsIcon /> <span>Champions</span>
                  </Link>
                </li>
                <li>
                  <Link href="/ListBanner">
                    <ImageIcon />
                    <span>Media</span>
                  </Link>{" "}
                </li>
                <li>
                  <Link href="/Projects">
                    <ForestIcon /> <span>Projects</span>
                  </Link>
                </li>
                <li>
                  <Link href="/CSRProjects">
                    <ForestIcon /> <span>CSR Projects</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Trees">
                    <ParkIcon /> <span>Trees</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Species">
                    <GrassIcon /> <span>Species</span>
                  </Link>
                </li>
                {/* <li><Link href="/Blogs"><BookIcon /><span>Blogs</span></Link> </li> */}
                <li>
                  <div onClick={(e) => openSubmenu(e)}>
                    <SystemSecurityUpdateGoodIcon /> <span>Mobile App</span>
                  </div>
                  <ul>
                    <li>
                      <div onClick={(e) => openSubmenu(e)}>
                        <BookIcon /> <span>App Blogs</span>
                      </div>

                      <ul style={{ paddingLeft: "25px" }}>
                        <li>
                          <Link href="/AppBlogCategories">- Categories</Link>
                        </li>
                        <li>
                          <Link href="/Blogs">- Blogs</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="/ReportPost">
                        <ReportProblemIcon /> <span> Reported Post</span>
                      </Link>{" "}
                    </li>

                    <li>
                      <Link href="/Quiz">
                        <QuizIcon /> <span> Quiz</span>
                      </Link>{" "}
                    </li>
                    <li>
                      <Link href="/Notification">
                        <CircleNotificationsIcon /> <span> Notification</span>
                      </Link>{" "}
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/Founders">
                    <Groups3Icon /> <span> Founders</span>
                  </Link>{" "}
                </li>
                <li>
                  <div onClick={(e) => openSubmenu(e)}>
                    <HandshakeIcon /> <span> Partners</span>
                  </div>
                  <ul style={{ paddingLeft: "25px" }}>
                    <li>
                      <Link href="/PartnerCategory">
                        {" "}
                        <span> Category</span>
                      </Link>{" "}
                    </li>
                    <li>
                      <Link href="/Partners">
                        {" "}
                        <span> Partners</span>
                      </Link>{" "}
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/caretakers">
                    <Person4Icon /> <span>Vanamali</span>
                  </Link>
                </li>
                <li>
                  <Link href="/sub-admin">
                    <SupervisorAccountIcon /> <span>Sub Admin</span>
                  </Link>
                </li>
                <li>
                  <Link href="/PolicyContent">
                    <EditNoteIcon /> <span>Policy Content</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Celebrity">
                    <FaceRetouchingNaturalIcon /> <span>Prominent Leaders</span>
                  </Link>
                </li>
                <li>
                  <div onClick={(e) => openSubmenu(e)}>
                    <WorkspacePremiumIcon />
                    <span>Certificates</span>
                  </div>
                  <ul>
                    <li>
                      <Link href="/Certificates">
                        - <span>GIC </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/WfwCertificates">
                        - <span>WFW </span>
                      </Link>
                    </li>
                    {/* <li><Link href="/Walkforwaterpledge">- Walk for Water Pledge</Link></li> */}
                  </ul>
                </li>
                <li>
                  <Link href="/GiftCategories">
                    <CardGiftcardIcon /> <span>Gift Categories</span>
                  </Link>
                </li>

                <li>
                  <div onClick={(e) => openSubmenu(e)}>
                    <AddIcCallIcon /> <span>Leads</span>
                  </div>
                  <ul>
                    <li>
                      <Link href="/Subscriber">- Subscribers</Link>
                    </li>
                    <li>
                      <Link href="/ContactForm">- Contact Queries</Link>
                    </li>
                    <li>
                      <Link href="/Volunteers">- Volunteers List</Link>
                    </li>
                    <li>
                      <Link href="/Corporates">- Corporate List</Link>
                    </li>
                    <li>
                      <Link href="/Careers">- Career List</Link>
                    </li>
                    <li>
                      <Link href="/Walkforwater">- Rain Water</Link>
                    </li>
                  </ul>
                </li>

                <li className={weblist ? "active" : ""}>
                  <div onClick={(e) => viewWeb(e)}>
                    <LanguageIcon /> <span>Website</span>
                  </div>
                  <ul>
                    <li>
                      <div onClick={(e) => openSubmenu(e)}>
                        <span>- Blogs</span>
                      </div>
                      <ul style={{ paddingLeft: "25px" }}>
                        <li>
                          <Link href="/WebBlogCategories">
                            Blogs Categories
                          </Link>
                        </li>
                        <li>
                          <Link href="/Webblogs">Website Blogs</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="/InitiativeCategory">
                        - Initiative Gallery
                      </Link>
                    </li>
                    <li>
                      <Link href="/GicImpact">- GIC Impact</Link>
                    </li>
                    <li>
                      <Link href="/WaterImpact">- Water Impact</Link>
                    </li>
                    <li>
                      <Link href="/WebBanner">- Banner</Link>{" "}
                    </li>
                    <li>
                      <Link href="/Brochure">- Brochure</Link>{" "}
                    </li>
                    <li>
                      <Link href="/SEO">- SEO</Link>{" "}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
          <div className="logout-btn">
            <button className="btn btn-danger" onClick={removeLogin}>
              <LogoutIcon /> Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
