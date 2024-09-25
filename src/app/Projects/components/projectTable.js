"use client";
import { useState, useCallback, useEffect } from "react";
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
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Switch from "@mui/material/Switch";
import FormData from "form-data";

const headCells = [
  { id: "cat_id", numeric: false, disablePadding: false, label: "Project Id" },
  { id: "cat_img", numeric: false, disablePadding: false, label: "Image" },
  { id: "cat_name", numeric: false, disablePadding: false, label: "Name" },
  {
    id: "cat_sequence",
    numeric: false,
    disablePadding: false,
    label: "Sequence no.",
  },
  { id: "cat_status", numeric: false, disablePadding: false, label: "Status" },
  {
    id: "cat_district",
    numeric: false,
    disablePadding: false,
    label: "District",
  },
  { id: "cat_state", numeric: false, disablePadding: false, label: "State" },
  { id: "cat_pincode", numeric: false, disablePadding: false, label: "Trees" },
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
          Projects List
        </Typography>
      )}
    </Toolbar>
  );
}

export default function ProjectTable() {
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
  const [rows, getProjectlist] = useState([]);
  console.log(rows)
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

  const visibleRows = Array.isArray(rows)
  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  : [];
  const changeProjectStatus = (event) => {
    //setChecked(!checked)
    let bodyContent = new FormData();
    bodyContent.append("userId", `${userData?.Data?.userId}`);
    bodyContent.append("area", event.area);
    bodyContent.append("description", event.description);
    bodyContent.append("district", event.district);
    bodyContent.append("project_image", event.image);
    bodyContent.append("latitude", event.latitude);
    bodyContent.append("longitude", event.longitude);
    bodyContent.append("name", event.name);
    bodyContent.append("pincode", event.pincode);
    bodyContent.append("proId", event.projectId);
    bodyContent.append("short_desc", event.short_desc);
    bodyContent.append("state", event.state);
    bodyContent.append("status", event.status == "1" ? "0" : "1");
    bodyContent.append("sequence", event.sequence);
    bodyContent.append("type", event.ans);

    var requestOptions = {
      method: "POST",
      body: bodyContent,
      redirect: "follow",
    };
    fetch(`${apiRoute}/editproject`, requestOptions)
      .then((response) => response.text())
      .then(fetchAllProjects); 
  };

  const fetchAllProjects = () => {
    let data = JSON.stringify({ userId: `${userData?.Data?.userId}` });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/listproject`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    if(userData){
    axios.request(config).then((response) => {
      console.log("response",response?.data?.Data)
      getProjectlist(response?.data?.Data);
      // console.log(response.data.Data)
    });
  }
  }

  useEffect(() => {
    if(userData){
    fetchAllProjects();
    }
  }, [userData]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size="medium"
              responsive="true"
              className="tabel-responsive"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows && visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell align="left" data-attr="Project Id">
                        {row.projectId}
                      </TableCell>
                      <TableCell align="left" data-attr="Project Image">
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
                          />
                        </div>
                      </TableCell>

                      <TableCell align="left" data-attr="Project Name">
                        {row.name}
                      </TableCell>
                      <TableCell align="left" data-attr="Project Name">
                        {row.sequence}
                      </TableCell>
                      <TableCell
                        align="right"
                        data-attr="Published"
                        style={{ textAlign: "left" }}
                      >
                        {" "}
                        <Switch
                          checked={JSON.parse(row.status) == 1 ? true : false}
                          inputProps={{ "aria-label": "controlled" }}
                          onChange={() => changeProjectStatus(row)}
                        />
                      </TableCell>
                      <TableCell align="left" data-attr="District">
                        {row.district}
                      </TableCell>
                      <TableCell align="left" data-attr="State">
                        {row.state}
                      </TableCell>
                      <TableCell align="left" data-attr="Pincode">
                        {row.plantedTree} / {row.totalTree}
                      </TableCell>
                      <TableCell align="left" data-attr="Action">
                        <Link href={`Projects/${row.projectId}`}>
                          <span className="dashboard-table-icon">
                            <BorderColorIcon />
                          </span>
                        </Link>
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
