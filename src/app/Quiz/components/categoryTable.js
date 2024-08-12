"use client";

import { useState, useCallback, useEffect } from "react";
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
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Link from "next/link";

const headCells = [
  { id: "cat_name", numeric: true, disablePadding: false, label: "Name" },
  { id: "cat_img", numeric: true, disablePadding: false, label: "Image" },
  {
    id: "cat_published",
    numeric: true,
    disablePadding: false,
    label: "Published",
  },
  {
    id: "cat_description",
    numeric: true,
    disablePadding: false,
    label: "Create",
  },
  {
    id: "cat_total",
    numeric: true,
    disablePadding: false,
    label: "Total Quiz",
  },
  { id: "cat_edit", numeric: true, disablePadding: false, label: "Add Quiz" },
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
            inputProps={{ "aria-label": "select all desserts" }}
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
          Quiz Categories{" "}
        </Typography>
      )}
    </Toolbar>
  );
}

export default function CategoryTable() {
  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [checked, setChecked] = useState(true);
  const [rows, getCategorylist] = useState([]);
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
  const changeCategoryStatus = (event) => {
    setChecked(!checked);
    var formdata = new FormData();
    formdata.append("userId", `${userId}`);
    formdata.append("quizId", event._id);
    formdata.append("categoryName", event.categoryName);
    formdata.append("banner_image", event.categoryImage);
    formdata.append("totalQuiz", event.totalQuiz);
    formdata.append("completeQuiz", event.completeQuiz);
    formdata.append("New", event.New);
    formdata.append("status", event.status == "1" ? "0" : "1");
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(`${apiRoute}/editquizcat`, requestOptions)
      .then((response) => response.text())
      .then(fetchAllcategoriesAPI); // fetch again all blog api after sending post request of changinh status
    //.then(result => console.log(result))
    //.catch(error => console.log('error', error));
  };

  const fetchAllcategoriesAPI = useCallback(() => {
    let data = JSON.stringify({ userId: `${userId}` });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/quizcatlist`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };

    axios.request(config).then((response) => {
      getCategorylist(response.data.Data);
    });
    // .catch((error) => { // console.log(error);   });
  }, [apiRoute, userId]);

  useEffect(() => {
    fetchAllcategoriesAPI();
  }, [fetchAllcategoriesAPI]);

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
                          onChange={(event) => handleClick(event, row._id)}
                        />
                      </TableCell>
                      <TableCell align="right" data-attr="">
                        <Link href={`Quiz/QuizListing/${row._id}`}>
                          {row.categoryName}
                        </Link>
                      </TableCell>
                      <TableCell align="right" data-attr="">
                        <div
                          style={{
                            position: "relative",
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            border: "1px solid #e2e2e2",
                            marginLeft: "auto",
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            src={row.categoryImage}
                            alt="product image"
                            width={50}
                            height={50}
                          />
                        </div>
                      </TableCell>
                      {/* <TableCell align="right">{row.totalQuiz}</TableCell>
                      <TableCell align="right">{row.completeQuiz}</TableCell>
                      <TableCell align="right">{row.New}</TableCell> */}
                      <TableCell align="right" data-attr="">
                        <Switch
                          checked={JSON.parse(row.status) == 1 ? true : false}
                          inputProps={{ "aria-label": "controlled" }}
                          onChange={() => changeCategoryStatus(row)}
                        />
                      </TableCell>
                      <TableCell align="right" data-attr="">{`${new Date(
                        row.createdAt
                      ).getDate()}/${
                        new Date(row.createdAt).getMonth() + 1
                      }/${new Date(row.createdAt).getFullYear()}`}</TableCell>
                      <TableCell align="right" data-attr="">
                        {row.totalQuiz}
                      </TableCell>
                      <TableCell align="right" data-attr="">
                        <Button
                          variant="contained"
                          color="success"
                          style={{
                            padding: "10px 20px",
                            fontSize: "13px",
                            marginLeft: "10px",
                          }}
                        >
                          <AddIcon />{" "}
                          <Link
                            href={`Quiz/QuizListing/${row._id}`}
                            style={{ color: "#fff" }}
                          >
                            Add Quiz
                          </Link>
                        </Button>
                      </TableCell>
                      <TableCell align="right" data-attr="">
                        <Link href={`Quiz/${row._id}`}>
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
