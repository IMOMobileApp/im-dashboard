import * as React from "react";
import PropTypes from "prop-types";
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
import Image from "next/image";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const rows = [
  {
    name: "product1",
    calories: "305",
    fat: "3.7",
    carbs: "Fish & Meat",
    protein: "4.3",
  },

  {
    name: "product2",
    calories: "452",
    fat: "25.0",
    carbs: "Fruits & Vegetable",
    protein: "4.9",
  },

  {
    name: "product3",
    calories: "262",
    fat: "16.0",
    carbs: "Cooking Essentials",
    protein: "6.0",
  },

  {
    name: "product4",
    calories: "305",
    fat: "3.7",
    carbs: "Biscuits & Cakes",
    protein: "4.3",
  },

  {
    name: "product5",
    calories: "452",
    fat: "25.0",
    carbs: "Household Tools",
    protein: "4.9",
  },

  {
    name: "product6",
    calories: "262",
    fat: "16.0",
    carbs: "Pet Care",
    protein: "6.0",
  },

  {
    name: "product7",
    calories: "305",
    fat: "3.7",
    carbs: "Beauty & Healths",
    protein: "4.3",
  },

  {
    name: "product8",
    calories: "452",
    fat: "25.0",
    carbs: "Jam & Jelly",
    protein: "4.9",
  },

  {
    name: "product9",
    calories: "262",
    fat: "16.0",
    carbs: "Milk & Dairy",
    protein: "6.0",
  },

  {
    name: "product10",
    calories: "305",
    fat: "3.7",
    carbs: "Drinks",
    protein: "4.3",
  },

  {
    name: "product11",
    calories: "452",
    fat: "25.0",
    carbs: "Breakfast",
    protein: "4.9",
  },
];

const headCells = [
  { id: "cat_id", numeric: true, disablePadding: false, label: "ID" },

  { id: "cat_img", numeric: true, disablePadding: false, label: "Image" },

  { id: "cat_name", numeric: true, disablePadding: false, label: "Name" },

  {
    id: "cat_description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },

  {
    id: "cat_published",
    numeric: true,
    disablePadding: false,
    label: "Published",
  },

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
          Categories{" "}
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = { numSelected: PropTypes.number.isRequired };

export default function CategoryTable() {
  const [selected, setSelected] = React.useState([]);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);

      setSelected(newSelected);

      return;
    }

    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),

    [page, rowsPerPage]
  );

  const [checked, setChecked] = React.useState(true);

  const handleChangePublish = (event) => {
    setChecked(event.target.checked);
  };

  return (
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
                const isItemSelected = isSelected(row.name);

                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox" data-attr="">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>

                    <TableCell align="right" data-attr="">
                      {row.calories}
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
                        }}
                      >
                        <Image
                          src="./next.svg"
                          alt="product image"
                          fill={true}
                        />
                      </div>
                    </TableCell>

                    <TableCell align="right" data-attr="">
                      {row.name}
                    </TableCell>

                    <TableCell align="right" data-attr="">
                      {row.carbs}
                    </TableCell>

                    <TableCell align="right" data-attr="">
                      <Switch
                        checked={checked}
                        inputProps={{ "aria-label": "controlled" }}
                        onChange={handleChangePublish}
                      />
                    </TableCell>

                    <TableCell align="right" data-attr="">
                      <span className="dashboard-table-icon">
                        <BorderColorIcon /> <ZoomInIcon /> <DeleteForeverIcon />
                      </span>
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
  );
}
