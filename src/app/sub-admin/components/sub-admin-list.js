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
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
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
  const [rows, getBloglist] = useState([]);

  /*----------------search const------------------*/
  const [originalRows, setOriginalRows] = useState([]);
  const [searched, setSearched] = useState("");
  /*----------------search const------------------*/
  const fetchAllBlogsAPI = () => {
    let data = JSON.stringify({ userId: `${userData?.Data?.userId}` });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiRoute}/subAdminList`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios.request(config).then((response) => {
      getBloglist(response?.data?.Data);
      setOriginalRows(response?.data?.Data);
      console.log(response);
    });
  }

  useEffect(() => {
    if(userData){
    fetchAllBlogsAPI();
    }
  }, [userData]);
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
  const [rowStatuses, setRowStatuses] = useState(
    rows.map((row) => ({ ...row, status: JSON.parse(row.status) }))
  );

  const changeBlogStatus = (row) => {
    const updatedRows = rowStatuses.map((r) =>
      r.id === row.id ? { ...r, status: !r.status } : r
    );
    setRowStatuses(updatedRows);
    const updatedStatus = !row.status ? "1" : "0";
    axios
      .post(`${apiRoute}/subAdminUpdate`, {
        userId: userData?.Data?.userId,
        subAdminId: row.subAdminId,
        status: updatedStatus,
      })
      .then((response) => {
        console.log("Status updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        setRowStatuses(
          rowStatuses.map((r) =>
            r.id === row.id ? { ...r, status: row.status } : r
          )
        );
      });
  };


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.userId);
      setSelected(newSelected);
      // setArrFunc(newSelected);
      return;
    }
    setSelected([]);
  };

  /*----------------search filter------------------*/
  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    // console.log(searchedVal)
    const filteredRows = originalRows.filter((row) => {
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
        <Paper sx={{ width: "100%", mb: 2, p:2 }}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
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
                    
                      <TableCell align="right" data-attr="">
                        {row.subAdminId}
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
                          disabled
                        />
                      </TableCell>
                      <TableCell align="right" data-attr="">{`${new Date(
                        row.join_date
                      ).getDate()}/${
                        new Date(row.join_date).getMonth() + 1
                      }/${new Date(row.join_date).getFullYear()}`}</TableCell>
                      <TableCell align="right" data-attr="">
                        <Link href={`sub-admin/${row.subAdminId}`}>
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
