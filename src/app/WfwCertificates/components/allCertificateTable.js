"use client"
import {useState, useEffect, useMemo,useCallback} from 'react';
import axios from 'axios'; 
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
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Link from 'next/link';

const headCells = [
  { id: 'cat_img', numeric: true, disablePadding: false, label: 'Name', },
  { id: 'cat_source', numeric: true, disablePadding: false, label: 'Source', },
  { id: 'cat_name',  numeric: true, disablePadding: false, label: 'EMail', },
  { id: 'cat_description', numeric: true, disablePadding: false, label: 'Phone', },
  { id: 'cat_published',  numeric: true, disablePadding: false, label: 'Address', },
  { id: 'cat_date',  numeric: true, disablePadding: false, label: 'Certificate', },
  { id: 'cat_action',  numeric: true, disablePadding: false, label: 'Actions', },
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
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div" >  Users </Typography>
      )}
    </Toolbar>
  );
}
 

export default function CertificateTable() {
  const apiRoute = process.env.API_ROUTE;
  // //const userId = process.env.USER_ID;
  // const userData = JSON.parse(localStorage.getItem("loginResponse"));
  const [userData, setUserData] = useState();
  useEffect(() => {
    const storedData = localStorage.getItem("loginResponse");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  //const userId = userData?.Data?.userId;
const userId = userData?.Data?.userId;
//console.log("first", userId);

  const [selected, setSelected] =  useState([]);
  const [page, setPage] =  useState(0);
  const [rowsPerPage, setRowsPerPage] =  useState(25);
  const [checked, setChecked] = useState(true);
  const [rows, getChallengelist] = useState([])

  const handleChangePage = (event, newPage) => { setPage(newPage); };
  const handleChangeRowsPerPage = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
  const isSelected = (_id) => selected.indexOf(_id) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
 // const visibleRows =  useMemo( () =>  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage,),  [ page, rowsPerPage], );
  const visibleRows =  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage,) ;

  


const fetchAllBlogsAPI=useCallback(()=>{
  let data = JSON.stringify({ "userId": `${userId}` });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${apiRoute}/waterChallengeFormList`,
    headers: {  'Content-Type': 'application/json' },
    data : data
  }; 
  axios.request(config)
  .then((response) => { getChallengelist(response.data.Data);  })
 // .catch((error) => { // console.log(error);   });

}, [apiRoute, userId])

useEffect(() => {
  fetchAllBlogsAPI();
}, [fetchAllBlogsAPI]);


const handleSelectAllClick = (event) => {
  if (event.target.checked) { const newSelected = rows.map((n) => n._id); setSelected(newSelected);
    return;
  } setSelected([]);
};
  

 

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) { newSelected = newSelected.concat(selected, _id);
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

  return (
       <>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table className='tabel-responsive'  aria-labelledby="tableTitle"  size= 'medium'  >
            <EnhancedTableHead  numSelected={selected.length}  onSelectAllClick={handleSelectAllClick} rowCount={rows.length}  />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" aria-checked={isItemSelected}
                    tabIndex={-1} key={row._id} selected={isItemSelected} sx={{ cursor: 'pointer' }} >
                    <TableCell padding="checkbox" data-attr=""><Checkbox color="primary"  checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId, }}  onChange={(event) => handleClick(event, row._id)}/></TableCell>
              
                    <TableCell align="right" data-attr=""> {row.name}  </TableCell>
                    <TableCell align="right" data-attr=""> {row.formSource}  </TableCell>
                     <TableCell align="right" data-attr="">{row.email}</TableCell>
                    <TableCell align="right" data-attr="">{row.phone}</TableCell>
                    <TableCell align="right" data-attr="">{row.address}</TableCell>
                    
                    <TableCell align="right" data-attr="">
                      {
                      row.isApproved == 0 ? 

                      <Button variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000',textTransform:'capitalize'}}>Pending</Button>
                            :
                      <Button variant="contained" color="success" style={{width:'100%', fontSize:'15px',padding:'10px',textTransform:'capitalize'}} disabled>Approved</Button>
                      }
                      
                      </TableCell>
                    <TableCell align="right" data-attr=""><Link href={`WfwCertificates/${row.formId}`}><span className="dashboard-table-icon"><RemoveRedEyeIcon /></span></Link></TableCell>
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
    
    </>
  );
}