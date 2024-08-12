"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Modal from "@mui/material/Modal";
import PublishIcon from "@mui/icons-material/Publish";
import Textarea from "@mui/joy/Textarea";
import { toast } from "react-toastify";

const headCells = [
  { id: "treeId", numeric: false, disablePadding: false, label: "Tree Id" },
  { id: "cat_state", numeric: false, disablePadding: false, label: "Image" },
  { id: "cat_img", numeric: false, disablePadding: false, label: "species" },
  { id: "cat_action", numeric: false, disablePadding: false, label: "Action" },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {" "}
          {numSelected} selected{" "}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          style={{ fontSize: "22px", "fontWeight:": "600" }}
        >
          {" "}
          Tree List
        </Typography>
      )}
    </Toolbar>
  );
}

export default function CSRTreeTable(props) {
  const toastId = useRef(null);
  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, getProjectlist] = useState([]);
  const [disapproveText, setDisapproveText] = useState();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  //Approve, Disapprove request handle------------------------
  const [openDisapproveBox, setOpenDisapproveBox] = useState(false);
  const [careidNow, setCareidNow] = useState(); //for set the careid of particular order and then pass the id in reject order
  const handleOpendisapproveBox = (e) => {
    setOpenDisapproveBox(true);
    setCareidNow(e);
  };
  const handleCloseDisapproveBox = () => {
    if (disapproveText == "") {
      toast.error(`Enter the Message`);
      toast.dismiss(toastId.current);
    } else {
      setOpenDisapproveBox(false);
      //console.log(careidNow)
      handleRejectRequest();
      setDisapproveText("");
    }
  };

  const handleRejectRequest = () => {
    pendingPopup();
    let data = JSON.stringify({
      userId: `${userId}`,
      careId: careidNow,
      message: disapproveText,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/rejectcare`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      const data1 = response.data;
      //console.log(data1)
      function successPopup() {
        toast.success(`${data1.Message}`);
        toast.dismiss(toastId.current);
      }
      function failPopup() {
        toast.error(`${data1.Message}`);
        toast.dismiss(toastId.current);
      }
      {
        data1.Status === true ? successPopup() : failPopup();
      }
      fetchAllProjects(); //fetch again all list of orders
    });
    function pendingPopup() {
      toastId.current = toast.loading("Rejecting Tree");
    }
  };
  //disapprove request------------
  const handleDisapproveText = (e) => {
    setDisapproveText(e.target.value);
    //console.log(e.target.value)
  };

  //disapprove request-----------
  //approve request------------------
  const handleApproveRequest = (e) => {
    pendingPopup();
    let data = JSON.stringify({ userId: `${userId}`, careId: e });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/approvecare`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      const data1 = response.data;
      // console.log(data1)
      function successPopup() {
        toast.success(`${data1.Message}`);
        toast.dismiss(toastId.current);
      }
      function failPopup() {
        toast.error(`${data1.Message}`);
        toast.dismiss(toastId.current);
      }

      {
        data1.Status === true ? successPopup() : failPopup();
      }
      fetchAllProjects(); //fetch again all list of orders
    });
    function pendingPopup() {
      toastId.current = toast.loading("Updating Tree");
    }
  };

  const [openImage, setOpenImage] = useState(false);
  const [getImage, setGetImage] = useState();
  const handleOpenimage = (e) => {
    setOpenImage(true);
    setGetImage(e);
  };
  const handleCloseimage = () => setOpenImage(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (_id) => selected.indexOf(_id) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fetchAllProjects = useCallback(() => {
    let data = JSON.stringify({ userId: `${userId}`, orderId: props.orderURL });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/pendingorderdetail`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      getProjectlist(response.data.treeList);
    });
    //  .catch((error) => {  console.log(error);  });
  }, [apiRoute, userId, props.orderURL]);

  useEffect(() => {
    fetchAllProjects();
  }, [fetchAllProjects]);

  return (
    <>
      {/* -----------------------------popup for disapprove tree------------------------------- */}
      <Modal
        open={openDisapproveBox}
        onClose={() => setOpenDisapproveBox(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ textAlign: "center" }}>
          <Textarea
            disabled={false}
            minRows={2}
            size="lg"
            variant="soft"
            placeholder="Type comment here"
            value={disapproveText}
            style={{ padding: "12px 15px", fontSize: "15px" }}
            onChange={(e) => handleDisapproveText(e)}
          />
          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<PublishIcon />}
            style={{ margin: "0 auto", marginTop: "10px" }}
            onClick={() => handleCloseDisapproveBox()}
          >
            Submit
          </Button>
        </Box>
      </Modal>
      {/* -----------------------------popup for disapprove tree------------------------------- */}

      {/* -----------------------------popup for tree-image------------------------------- */}
      <Modal
        open={openImage}
        onClose={handleCloseimage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            textAlign: "center",
            width: "50%",
            height: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Image src={getImage} alt="hello" width={500} height={400} />
        </Box>
      </Modal>
      {/* -----------------------------popup for tree-image------------------------------- */}

      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              className="tabel-responsive"
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.treeId}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      {/* <TableCell align="left">
                      <div style={{position:'relative',width:'50px',height:'50px',borderRadius:'50%',border:'1px solid #e2e2e2',marginLeft:'auto',overflow: 'hidden'}}><Image src={row.image} alt="product image" width={50} height={50}/>
                      </div></TableCell> */}

                      <TableCell align="left" data-attr="">
                        {row.treeId}
                      </TableCell>
                      <TableCell align="left" data-attr="">
                        <div
                          style={{
                            position: "relative",
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            border: "1px solid #e2e2e2",
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            src={row.image}
                            alt="product image"
                            width={50}
                            height={50}
                            onClick={(e) => handleOpenimage(row.image)}
                          />
                        </div>
                      </TableCell>
                      <TableCell align="left" data-attr="">
                        {row.species}
                      </TableCell>
                      {row.isApproved == true ? (
                        <TableCell align="left" data-attr="">
                          <Button
                            variant="contained"
                            disabled
                            size="large"
                            startIcon={<CheckCircleOutlineIcon />}
                          >
                            {" "}
                            Approved{" "}
                          </Button>
                        </TableCell>
                      ) : (
                        <TableCell align="left" data-attr="">
                          {row.careId !== 0 ? (
                            <>
                              <Button
                                variant="contained"
                                color="success"
                                size="large"
                                startIcon={<CheckCircleOutlineIcon />}
                                style={{ marginRight: "10px" }}
                                onClick={() => handleApproveRequest(row.careId)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                size="large"
                                endIcon={<ThumbDownAltIcon />}
                                onClick={() =>
                                  handleOpendisapproveBox(row.careId)
                                }
                              >
                                {" "}
                                Reject{" "}
                              </Button>{" "}
                            </>
                          ) : (
                            "Picture not Uploaded yet"
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    {" "}
                    <TableCell colSpan={6} />{" "}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}
