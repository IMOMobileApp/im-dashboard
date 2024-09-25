"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
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
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Link from "next/link";
import TextField from "@mui/material/TextField";

const headCells = [
  { id: "cat_id", numeric: true, disablePadding: false, label: "User Id" },
  { id: "cat_img", numeric: true, disablePadding: false, label: "Name" },
  { id: "cat_name", numeric: true, disablePadding: false, label: "E-Mail" },
  {
    id: "cat_description",
    numeric: true,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "cat_published",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  { id: "cat_date", numeric: true, disablePadding: false, label: "Created At" },
  { id: "cat_action", numeric: true, disablePadding: false, label: "Actions" },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
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
          Users{" "}
        </Typography>
      )}
    </Toolbar>
  );
}

export default function EnhancedTable({ setArrFunc }) {
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
  const [checked, setChecked] = useState(true);
  const [rows, getBloglist] = useState([]);

  /*----------------search const------------------*/
  const [originalRows, setOriginalRows] = useState([]);
  const [searched, setSearched] = useState("");
  /*----------------search const------------------*/

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

  const changeBlogStatus = (event) => {
    var formdata = new FormData();
    formdata.append("userId", `${userData?.Data?.userId}`);
    formdata.append("blogId", event._id);
    formdata.append("title", event.blog_title);
    formdata.append("blog_image", event.blog_image);
    formdata.append("detail", event.blog_detail);
    formdata.append("desc", event.blog_desc);
    formdata.append("status", event.status == "1" ? "0" : "1");
    formdata.append("sdesc", event.short_desc);
    formdata.append("seeds", event.seeds);
    formdata.append("meta", event.meta_title);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${apiRoute}/editblog`, requestOptions).then((response) =>
      response.text()
    );
    //.then(result => console.log(result))
    // .catch(error => console.log('error', error));
  };

  const fetchAllBlogsAPI = () => {
    let data = JSON.stringify({ userId: `${userData?.Data?.userId}` });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/userlist`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      getBloglist(response?.data?.Data);
      setOriginalRows(response?.data?.Data);
    });
    // .catch((error) => { // console.log(error);   });
  }

  useEffect(() => {
    if (userData) {
      fetchAllBlogsAPI();
    }
  }, [userData]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.userId);
      setSelected(newSelected);
      //console.log(newSelected);
      setArrFunc(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, userId) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userId);
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
    //console.log(newSelected);
    setArrFunc(newSelected);
  };

  // useEffect(()=>{
  //  console.log(selected)
  // },[])
  /*----------------search filter------------------*/
  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    // console.log(searchedVal)
    const filteredRows = originalRows.filter((row) => {
      //return row.name.toLowerCase().includes(searchedVal.toString().toLowerCase());
      return Object.values(row).some(
        (value) =>
          String(value).toLowerCase().indexOf(searchedVal.toLowerCase()) !== -1
      );
    });

    getBloglist(filteredRows);
  };
  /*----------------search filter------------------*/

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2,px:2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TextField
            id="outlined-basic"
            label="Search Users"
            variant="outlined"
            fullWidth
            value={searched}
            onChange={(e) => requestSearch(e.target.value)}
          />

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
                  const isItemSelected = isSelected(row.userId);
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
                      <TableCell padding="checkbox" data-attr="">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onChange={(event) => handleClick(event, row.userId)}
                        />
                      </TableCell>
                      <TableCell align="right" data-attr="">
                        {row.userId}
                      </TableCell>
                      <TableCell align="right" data-attr="">
                        {" "}
                        {row.name}{" "}
                      </TableCell>
                      <TableCell align="right" data-attr="">
                        {row.email}
                      </TableCell>
                      <TableCell align="right" data-attr="">
                        {row.phone}
                      </TableCell>

                      <TableCell align="right" data-attr="">
                        <Switch
                          checked={JSON.parse(row.status) == 1 ? true : false}
                          inputProps={{ "aria-label": "controlled" }}
                          onChange={() => changeBlogStatus(row)}
                        />
                      </TableCell>
                      <TableCell align="right" data-attr="">{`${new Date(
                        row.createdAt
                      ).getDate()}/${
                        new Date(row.createdAt).getMonth() + 1
                      }/${new Date(row.createdAt).getFullYear()}`}</TableCell>
                      <TableCell align="right" data-attr="">
                        <Link href={`Users/${row.userId}`}>
                          <span className="dashboard-table-icon">
                            <RemoveRedEyeIcon />
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
