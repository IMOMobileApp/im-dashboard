import * as React from 'react';

import PropTypes from 'prop-types';

import { alpha } from '@mui/material/styles';

import Box from '@mui/material/Box';

import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';

import TableCell from '@mui/material/TableCell';

import TableContainer from '@mui/material/TableContainer';

import TableHead from '@mui/material/TableHead';

import TablePagination from '@mui/material/TablePagination';

import TableRow from '@mui/material/TableRow';

import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';

import Checkbox from '@mui/material/Checkbox';   

import Switch from '@mui/material/Switch';

import Chip from '@mui/material/Chip';

import Image from 'next/image';

import Link from 'next/link';

 

import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

import ZoomInIcon from '@mui/icons-material/ZoomIn';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const rows = [

  {name:'product1',calories:'305',fat:'3.7',carbs:'67',protein:'4.3',},

  {name:'product2',calories:'452',fat:'25.0',carbs:'51',protein:'4.9',},

  {name:'product3',calories:'262',fat:'16.0',carbs:'24',protein:'6.0',},

  {name:'product4',calories:'305',fat:'3.7',carbs:'67',protein:'4.3',},

  {name:'product5',calories:'452',fat:'25.0',carbs:'51',protein:'4.9',},

  {name:'product6',calories:'262',fat:'16.0',carbs:'24',protein:'6.0',},

  {name:'product7',calories:'305',fat:'3.7',carbs:'67',protein:'4.3',},

  {name:'product8',calories:'452',fat:'25.0',carbs:'51',protein:'4.9',},

  {name:'product9',calories:'262',fat:'16.0',carbs:'24',protein:'6.0',},

  {name:'product10',calories:'305',fat:'3.7',carbs:'67',protein:'4.3',},

  {name:'product11',calories:'452',fat:'25.0',carbs:'51',protein:'4.9',},

  {name:'product12',calories:'262',fat:'16.0',carbs:'24',protein:'6.0'}

];





const headCells = [

  { id: 'productName', numeric: false, disablePadding: true, label: 'Product Name', },

  { id: 'category', numeric: true, disablePadding: false, label: 'Category', },

  { id: 'price',  numeric: true, disablePadding: false, label: 'Price', },

  { id: 'salePrice', numeric: true, disablePadding: false, label: 'Sale Price', },

  { id: 'stock',  numeric: true, disablePadding: false, label: 'Stock', },

  { id: 'status',  numeric: true, disablePadding: false, label: 'Status', },

  { id: 'view',  numeric: true, disablePadding: false, label: 'VIEW', },

  { id: 'published',  numeric: true, disablePadding: false, label: 'Published', },

  { id: 'action',  numeric: true, disablePadding: false, label: 'Actions', },

];



function EnhancedTableHead(props) {

  const { onSelectAllClick, numSelected, rowCount, } = props; 



  return (

    <TableHead>

      <TableRow>

        <TableCell padding="checkbox">

          <Checkbox  color="primary" indeterminate={numSelected > 0 && numSelected < rowCount} checked={rowCount > 0 && numSelected === rowCount}

            onChange={onSelectAllClick} inputProps={{   'aria-label': 'select all desserts',  }} />

        </TableCell>

        {headCells.map((headCell) => (

          <TableCell  key={headCell.id}  align={headCell.numeric ? 'right' : 'left'}  padding={headCell.disablePadding ? 'none' : 'normal'} >

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

    <Toolbar sx={{ ...(numSelected > 0 && {

          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),

        }),

      }}

    >

      {numSelected > 0 ? (

        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div"  > {numSelected} selected </Typography>

      ) : (

        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div" >  Products </Typography>

      )}

    </Toolbar>

  );

}



EnhancedTableToolbar.propTypes = {  numSelected: PropTypes.number.isRequired, };



export default function EnhancedTable() {

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



    if (selectedIndex === -1) { newSelected = newSelected.concat(selected, name);

    } else if (selectedIndex === 0) {  newSelected = newSelected.concat(selected.slice(1));

    } else if (selectedIndex === selected.length - 1) {  newSelected = newSelected.concat(selected.slice(0, -1));

    } else if (selectedIndex > 0) {

      newSelected = newSelected.concat(

        selected.slice(0, selectedIndex),

        selected.slice(selectedIndex + 1),

      );

    }

     setSelected(newSelected);

  };



  const handleChangePage = (event, newPage) => { setPage(newPage); };



  const handleChangeRowsPerPage = (event) => {

    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);

  };



  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



  const visibleRows = React.useMemo(

    () =>

      rows.slice(  page * rowsPerPage, page * rowsPerPage + rowsPerPage,  ),

    [ page, rowsPerPage],

  );



  const [checked, setChecked] = React.useState(true);



  const handleChangePublish = (event) => {

    setChecked(event.target.checked);

  };



  return (

    <Box sx={{ width: '100%' }}>

      <Paper sx={{ width: '100%', mb: 2 }}>

        <EnhancedTableToolbar numSelected={selected.length} />

        <TableContainer>

          <Table  className='tabel-responsive'  aria-labelledby="tableTitle"  size= 'medium'  >

            <EnhancedTableHead  numSelected={selected.length}  onSelectAllClick={handleSelectAllClick} rowCount={rows.length}  />

            <TableBody>

              {visibleRows.map((row, index) => {

                const isItemSelected = isSelected(row.name);

                const labelId = `enhanced-table-checkbox-${index}`;



                return (

                  <TableRow hover role="checkbox" aria-checked={isItemSelected}

                    tabIndex={-1} key={row.name} selected={isItemSelected} sx={{ cursor: 'pointer' }} >

                    <TableCell padding="checkbox" data-attr=""><Checkbox color="primary" checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId, }} /></TableCell>

                    <TableCell component="th" id={labelId}  scope="row" padding="none" onClick={(event) => handleClick(event, row.name)} data-attr="">

                      <div style={{position:'relative', width:'30px', height:'30px', borderRadius:'50%', border:'1px solid #e2e2e2',display:'inline-block'}}><Image src="./next.svg" alt="product image" fill={true} />

                      </div><span style={{display:'inline-block',verticalAlign:'top',fontSize:'12px',fontWeight:'600',marginTop:'5px', marginLeft:'7px'}}>{row.name}</span></TableCell>

                    <TableCell align="right" data-attr="">{row.calories}</TableCell>

                    <TableCell align="right" data-attr="">{row.fat}</TableCell>

                    <TableCell align="right" data-attr="">{row.carbs}</TableCell>

                    <TableCell align="right" data-attr="">{row.protein}</TableCell>

                    <TableCell align="right" data-attr=""><Chip label="Selling" color="success" variant="outlined" /></TableCell>

                    <TableCell align="right" data-attr=""><span className="dashboard-table-icon"><Link href="/productDetail"><ZoomInIcon /></Link></span></TableCell>

                    <TableCell align="right" data-attr=""><Switch checked={checked} inputProps={{ 'aria-label': 'controlled' }} onChange={handleChangePublish}/></TableCell>

                    <TableCell align="right" data-attr=""><span className="dashboard-table-icon"><LocalPrintshopIcon /> <DeleteForeverIcon /></span></TableCell>

                  </TableRow>

                );

              })}

              {emptyRows > 0 && ( <TableRow  style={{ height: 53 * emptyRows, }}  > <TableCell colSpan={6} /> </TableRow>  )}

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