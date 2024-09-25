"use client";
import { useState, useEffect, useCallback } from "react";
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
import Switch from "@mui/material/Switch";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const headCells = [
  {
    id: "cat_name",
    numeric: true,
    disablePadding: false,
    label: "Category name",
  },
  {
    id: "cat_published",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  { id: "cat_date", numeric: true, disablePadding: false, label: "Date" },
  { id: "cat_action", numeric: true, disablePadding: false, label: "Action" },
  {
    id: "cat_gallery",
    numeric: false,
    disablePadding: false,
    label: "Gallery",
    alignCenter: true,
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox  color="primary" indeterminate={numSelected > 0 && numSelected < rowCount} checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick} inputProps={{   'aria-label': 'select all',  }} />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={
              headCell.numeric
                ? "right"
                : headCell.alignCenter
                ? "center"
                : "left"
            }
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
          Initiative Category{" "}
        </Typography>
      )}
    </Toolbar>
  );
}

export default function InitiativecategoryTable() {
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
  //const [checked, setChecked] = useState();
  const [rows, getCatlist] = useState([]);

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

  const changeInitiativecategoryStatus = (row) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      userId: `${userData?.Data?.userId}`,
      initiativeId: row.initiativeId,
      title: row.title,
      status: row.status == "1" ? "2" : "1",
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${apiRoute}/editinitiative`, requestOptions)
      .then((response) => response.text())
      // .then(result => console.log(result))
      .then(fetchAllInitiativecategoryAPI); // fetch again all api after sending post request of changinh status
    //  .catch(error => console.log('error', error));
  };

  const fetchAllInitiativecategoryAPI = () => {
    let data = JSON.stringify({ userId: `${userData?.Data?.userId}` });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/listinitiative`,
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
    fetchAllInitiativecategoryAPI();
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

  return (
    <>
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
                onSelectAllClick={handleSelectAllClick}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <>
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        {/* <TableCell padding="checkbox" data-attr="">
                      <Checkbox color="primary"  checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId, }}  onChange={(event) => handleClick(event, row._id)}/>
                      </TableCell> */}
                        <TableCell align="right" data-attr="">
                          {row.title}
                        </TableCell>
                        <TableCell align="right" data-attr="">
                          <Switch
                            checked={JSON.parse(row.status) == 1 ? true : false}
                            inputProps={{ "aria-label": "controlled" }}
                            onChange={() => changeInitiativecategoryStatus(row)}
                          />
                        </TableCell>
                        <TableCell align="right" data-attr="">{`${new Date(
                          row.createdAt
                        ).getDate()}/${
                          new Date(row.createdAt).getMonth() + 1
                        }/${new Date(row.createdAt).getFullYear()}`}</TableCell>
                        <TableCell align="right" data-attr="">
                          <Link href={`InitiativeCategory/${row.initiativeId}`}>
                            <span className="dashboard-table-icon">
                              <BorderColorIcon />
                            </span>
                          </Link>
                        </TableCell>
                        <TableCell align="right" data-attr="">
                          <div style={{ width: "100%", margin: "0 auto" }}>
                            <Link
                              variant="outlined"
                              color="error"
                              style={{
                                margin: "5px 10px",
                                fontSize: "15px",
                                padding: "10px",
                                display: "inline-block",
                                textAlign: "center",
                                border: "1px solid #000",
                                color: "#000",
                              }}
                              href={`/InitiativeAlbum/${row.initiativeId}`}
                            >
                              {" "}
                              View Album{" "}
                            </Link>
                            <Link
                              variant="outlined"
                              color="error"
                              style={{
                                margin: "5px 10px",
                                fontSize: "15px",
                                padding: "10px",
                                display: "inline-block",
                                textAlign: "center",
                                border: "1px solid #000",
                                color: "#000",
                              }}
                              href={`/InitiativeImages/${row.initiativeId}`}
                            >
                              {" "}
                              View Images{" "}
                            </Link>
                            <Link
                              variant="outlined"
                              color="error"
                              style={{
                                margin: "5px 10px",
                                fontSize: "15px",
                                padding: "10px",
                                display: "inline-block",
                                textAlign: "center",
                                border: "1px solid #000",
                                color: "#000",
                              }}
                              href={`/InitiativeVideos/${row.initiativeId}`}
                            >
                              {" "}
                              View Videos{" "}
                            </Link>
                            <Link
                              variant="outlined"
                              color="error"
                              style={{
                                margin: "5px 10px",
                                fontSize: "15px",
                                padding: "10px",
                                display: "inline-block",
                                textAlign: "center",
                                border: "1px solid #000",
                                color: "#000",
                              }}
                              href={`/InitiativeNews/${row.initiativeId}`}
                            >
                              {" "}
                              View News room{" "}
                            </Link>
                            <Link
                              variant="outlined"
                              color="error"
                              style={{
                                margin: "5px 10px",
                                fontSize: "15px",
                                padding: "10px",
                                display: "inline-block",
                                textAlign: "center",
                                border: "1px solid #000",
                                color: "#000",
                              }}
                              href={`/initiativePressClipp/${row.initiativeId}`}
                            >
                              {" "}
                              View Press clippings{" "}
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>

                      {/* <TableRow>
                    <TableCell style={{width:'20%'}}>
                        <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}}  href={`/InitiativeAlbum/${row.initiativeId}`} >  View Album </Link>
                      </TableCell>
                      <TableCell style={{width:'20%'}}>
                        <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href={`/InitiativeImages/${row.initiativeId}`}>  View Images </Link>
                      </TableCell>
                      <TableCell style={{width:'20%'}}>
                        <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href={`/InitiativeVideos/${row.initiativeId}`}>  View Videos </Link>
                      </TableCell>
                      <TableCell style={{width:'20%'}}>
                        <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href={`/InitiativeNews/${row.initiativeId}`}>  View News room </Link>
                        </TableCell>
                      <TableCell style={{width:'20%'}}>
                        <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href={`/initiativePressClipp/${row.initiativeId}`}>  View Press clippings </Link>
                        </TableCell>
                      </TableRow> */}
                      <div className="" style={{ height: "50px" }}></div>
                    </>
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
