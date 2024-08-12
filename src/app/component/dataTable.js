"use client"

import * as React from 'react';

import {useState} from 'react';

 



import SelectSmall from './select'

 

 

import Box from '@mui/material/Box';

import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';

import TableCell from '@mui/material/TableCell';

import TableContainer from '@mui/material/TableContainer';

import TableHead from '@mui/material/TableHead';

import TablePagination from '@mui/material/TablePagination';

import TableRow from '@mui/material/TableRow'; 

import Paper from '@mui/material/Paper'; 

import Chip from '@mui/material/Chip';

import Image from 'next/image';

import Link from 'next/link';

 

import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

import ZoomInIcon from '@mui/icons-material/ZoomIn';





const rows1 = [

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

  { id: 'productName', numeric: false, disablePadding: true, label: 'INVOICE NO', },

  { id: 'category', numeric: true, disablePadding: false, label: 'ORDER TIME', },

  { id: 'price',  numeric: true, disablePadding: false, label: 'CUSTOMER NAME', },

  { id: 'salePrice', numeric: true, disablePadding: false, label: 'METHOD', },

  { id: 'stock',  numeric: true, disablePadding: false, label: 'AMOUNT	', },

  { id: 'status',  numeric: true, disablePadding: false, label: 'Status', }, 

  { id: 'published',  numeric: true, disablePadding: false, label: 'Action', },

  { id: 'action',  numeric: true, disablePadding: false, label: 'Invoice', },

];



function EnhancedTableHead(props) {  



  return (

    <TableHead>

      <TableRow>

         

        {headCells.map((headCell) => (

          <TableCell  key={headCell.id}  align={headCell.numeric ? 'right' : 'left'}  padding={headCell.disablePadding ? 'none' : 'normal'} 

          style={{ fontWeight:'bold', fontSize:'16px', padding:'15px'}}>

              {headCell.label}  

          </TableCell>

        ))}

      </TableRow>

    </TableHead>

  );

}





export default function EnhancedTable() {

  const [selected, setSelected] = useState([]);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);



  const handleSelectAllClick = (event) => {

    if (event.target.checked) {

      const newSelected = rows1.map((n) => n.name);

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

    () => rows1.slice(  page * rowsPerPage, page * rowsPerPage + rowsPerPage,  ),

    [ page, rowsPerPage],

  );

 

  return (

    <Box sx={{ width: '100%' }}>

      <Paper sx={{ width: '100%', mb: 2 }}> 

        <TableContainer>

          <Table className='tabel-responsive'  aria-labelledby="tableTitle"  size= 'medium'  >

            <EnhancedTableHead  numSelected={selected.length}  onSelectAllClick={handleSelectAllClick} rowCount={rows1.length}  />

            <TableBody>

              {visibleRows.map((row, index) => {

                const isItemSelected = isSelected(row.name);

                const labelId = `enhanced-table-checkbox-${index}`;



                return (

                  <TableRow hover role="checkbox" aria-checked={isItemSelected}

                    tabIndex={-1} key={row.name} selected={isItemSelected} sx={{ cursor: 'pointer' }} >

                     

                    <TableCell component="th" id={labelId}  scope="row" padding="none" onClick={(event) => handleClick(event, row.name)} style={{padding:'15px'}} data-attr="">

                      <div style={{position:'relative', width:'30px', height:'30px', borderRadius:'50%', border:'1px solid #e2e2e2',display:'inline-block'}}><Image src="./next.svg" alt="product image" fill={true} />

                      </div>

                      <span style={{display:'inline-block',verticalAlign:'top',fontSize:'12px',fontWeight:'600',marginTop:'5px', marginLeft:'7px'}}>{row.name}</span>

                    </TableCell>

                    <TableCell align="right" style={{padding:'15px'}} data-attr="">{row.calories}</TableCell>

                    <TableCell align="right" style={{padding:'15px'}} data-attr="">{row.fat}</TableCell>

                    <TableCell align="right" style={{padding:'15px'}} data-attr="">{row.carbs}</TableCell>

                    <TableCell align="right" style={{padding:'15px'}} data-attr="">{row.protein}</TableCell>

                    <TableCell align="right" style={{padding:'15px'}} data-attr=""><Chip label="Selling" color="success" variant="outlined" /></TableCell> 

                    <TableCell align="right" style={{padding:'15px'}} data-attr=""><SelectSmall id={labelId} style={{fontSize:'14px'}}/> </TableCell>

                    <TableCell align="right" style={{padding:'15px'}} data-attr="">

                                  <span className="dashboard-table-icon"><LocalPrintshopIcon /> 

                                  <Link href="/productDetail"><ZoomInIcon /></Link></span>

                    </TableCell>

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

          count={rows1.length}

          rowsPerPage={rowsPerPage}

          page={page}

          onPageChange={handleChangePage}

          onRowsPerPageChange={handleChangeRowsPerPage}

        />

      </Paper>

      

    </Box>

  );

}