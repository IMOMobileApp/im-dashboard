"use client";
import { useState, useEffect, useCallback, useRef } from "react";
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
import BorderColorIcon from "@mui/icons-material/BorderColor";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import Chip from "@mui/material/Chip";

import Button from "@mui/material/Button";
import { CSVLink } from "react-csv";

const headCells = [
  { id: "cat_img", numeric: false, disablePadding: false, label: "Name" },
  { id: "cat_name", numeric: true, disablePadding: false, label: "Phone" },
  { id: "cat_phone", numeric: true, disablePadding: false, label: "Email" },
  {
    id: "cat_District",
    numeric: true,
    disablePadding: false,
    label: "District",
  },
  { id: "cat_state", numeric: true, disablePadding: false, label: "State" },

  { id: "cat_pincode", numeric: true, disablePadding: false, label: "Status" },
  { id: "cat_date", numeric: true, disablePadding: false, label: "Date" },
  { id: "cat_action", numeric: true, disablePadding: false, label: "Action" },
  {
    id: "cat_status",
    numeric: false,
    disablePadding: false,
    label: " Change Status",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox  color="primary" indeterminate={numSelected > 0 && numSelected < rowCount} checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick} inputProps={{   'aria-label': 'select all desserts',  }} />
        </TableCell> */}
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
        >
          {" "}
          All Leads
        </Typography>
      )}
    </Toolbar>
  );
}

export default function BlogcategoryTable() {
  const apiRoute = process.env.API_ROUTE;
  const [userData, setUserData] = useState();
  useEffect(() => {
    const storedData = localStorage.getItem("loginResponse");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, getCatlist] = useState([]);

  const toastId = useRef(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (_id) => selected.indexOf(_id) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  // const visibleRows =  useMemo( () =>  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage,),  [ page, rowsPerPage], );
  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  /**------download queries------ */
  const csvData = [
    ["Name", "Phone", "EMail", "District", "State", "Status", "Date"],
    ...rows.map(
      ({ name, phone, email, district, state, statusMessage, createdAt }) => [
        name,
        phone,
        email,
        district,
        state,
        statusMessage,
        createdAt,
      ]
    ),
  ];
  /**------download queries------ */

  const fetchAllWebcategoryAPI = () => {
    let data = JSON.stringify({ userId: `${userData?.Data?.userId}` });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/siteformlist`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      getCatlist(response?.data?.Data);
      //  console.log(response.data.Data)
    });
    // .catch((error) => {  console.log(error);  });
  }
  useEffect(() => {
    if(userData){
    fetchAllWebcategoryAPI();
    }
  }, [userData]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const [status, setStatus] = useState("");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const handleChange = async (e, formId, type) => {
    setStatus(e.target.value);
    pendingPopup();
    console.log(e.target.value);
    const raw = JSON.stringify({
      userId: userData?.Data?.userId,
      formId: formId,
      type: type,
      status: e.target.value,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let response = await fetch(`${apiRoute}/formAction`, requestOptions);
    const data1 = await response.json();
    console.log(data1);
    {
      data1.Status === true ? successPopup(data1) : failPopup(data1);
    }
  };

  function successPopup(data1) {
    toast.success(`${data1.Message}`);
    toast.dismiss(toastId.current);
    fetchAllWebcategoryAPI();
  }
  function failPopup(data1) {
    toast.error(`${data1.Message}`);
    toast.dismiss(toastId.current);
  }
  function pendingPopup() {
    toastId.current = toast.loading("Updating Detail");
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <div
            style={{
              textAlign: "right",
              marginTop: "10px",
              textTransform: "capitalize",
            }}
          >
            <Button variant="outlined" style={{ textTransform: "capitalize" }}>
              <CSVLink data={csvData} filename={"Water Leads.csv"}>
                Download Water Leads
              </CSVLink>
            </Button>
          </div>
          <TableContainer>
            <Table
              className="tabel-responsive"
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
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
                      key={row.formId}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      {/* <TableCell padding="checkbox" data-attr=""><Checkbox color="primary"  checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId, }}  onChange={(event) => handleClick(event, row._id)}/></TableCell> */}

                      <TableCell align="left" data-attr="">
                        {row.name}
                      </TableCell>
                      <TableCell align="right" data-attr="">
                        {row.phone}
                      </TableCell>
                      <TableCell align="right" data-attr="">
                        {row.email}
                      </TableCell>
                      <TableCell align="right" data-attr="">
                        {row.district}
                      </TableCell>
                      <TableCell align="right" data-attr="">
                        {row.state}
                      </TableCell>
                      <TableCell align="left" data-attr="">
                        <Chip
                          label={row.statusMessage}
                          style={{
                            backgroundColor:
                              row.status == 1
                                ? "#fcae1e"
                                : row.status == 2
                                ? "#FF0000"
                                : row.status == 3
                                ? "#FFA500"
                                : row.status == 4
                                ? "#0000FF"
                                : row.status == 5
                                ? "#808080"
                                : row.status == 6
                                ? "#6ae46a"
                                : "#008000",
                            color: "#fff",
                          }}
                        />
                      </TableCell>

                      <TableCell align="right" data-attr="">{`${new Date(
                        row.createdAt
                      ).getDate()}/${
                        new Date(row.createdAt).getMonth() + 1
                      }/${new Date(row.createdAt).getFullYear()}`}</TableCell>
                      <TableCell align="right" data-attr="">
                        <Link href={`Walkforwater/${row.formId}`}>
                          <span className="dashboard-table-icon">
                            <BorderColorIcon />
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell
                          align="left"
                          data-attr=""
                          style={{
                            width: "20%",
                          }}
                        >
                          <div style={{ width: "100%" }}>
                            <select
                               labelId={`demo-select-small-label-${index}`}
                               id={`demo-select-small-${index}`}
                               value={row.status}
                               label="Change Status"
                               onChange={(e) => {
                                 handleChange(e, row.formId, row.type);
                               }}
                              style={{
                                width: "100%", // Full width for responsiveness
                                padding: "12px", // Slightly more padding for better touch targets
                                borderRadius: "6px", // Softer, larger rounded corners for modern look
                                border: "1px solid #ccc",
                                // borderColor: "#1976d2",
                                backgroundColor: "#fff", // Clean white background
                                cursor: "pointer", // Pointer cursor for better UX
                                outline: "none", // Remove default outline
                                fontSize: "16px", // Default font size for readability
                                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                                transition:
                                  "border-color 0.3s ease, box-shadow 0.3s ease", // Smooth transitions

                                // Focus state styles for better user experience
                                ":focus": {
                                  borderColor: "#004ba0", // Darker blue border when focused
                                  boxShadow: "0 0 8px rgba(25, 118, 210, 0.5)", // Blue glow when focused
                                },

                                // Hover state for interaction feedback
                                ":hover": {
                                  borderColor: "#004ba0", // Change border color on hover
                                  backgroundColor: "#f5f5f5", // Light gray background on hover
                                },

                                // Responsive adjustments (optional, based on design preference)
                                "@media (max-width: 768px)": {
                                  fontSize: "14px", // Smaller font for tablets
                                  padding: "10px", // Adjust padding for smaller screens
                                },
                                "@media (max-width: 480px)": {
                                  fontSize: "12px", // Smaller font for mobile devices
                                  padding: "8px", // Adjust padding for mobile screens
                                },
                              }}
                            >
                              <option value="" disabled>
                                Select Status
                              </option>
                              <option value={1}>Pending</option>
                              <option value={2}>Site visit</option>
                              <option value={3}>Not Reachable</option>
                              <option value={4}>In Progress</option>
                              <option value={5}>Rejected</option>
                              <option value={6}>Business completed</option>
                              <option value={7}>Vis. & Est.</option>
                            </select>
                          </div>
                        </TableCell>
                   
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
