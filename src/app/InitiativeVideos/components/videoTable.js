"use client"
import {useState, useEffect, useCallback} from 'react';
import axios from 'axios'; 
import Link from 'next/link';
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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const headCells = [
  { id: 'cat_name',  numeric: true, disablePadding: false, label: 'Title', },
  { id: 'cat_published',  numeric: true, disablePadding: false, label: 'Published', },  
  { id: 'cat_date', numeric: true, disablePadding: false, label: 'Date', },
  { id: 'cat_action',  numeric: true, disablePadding: false, label: 'Detail', },
  { id: 'cat_delete', numeric: true, disablePadding: false, label: 'Delete', },
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
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div" >  Images </Typography>
      )}
    </Toolbar>
  );
}
 

export default function VideoTable(props) {
  const apiRoute = process.env.API_ROUTE;
  // const userId = process.env.USER_ID;
const userData = JSON.parse(localStorage.getItem("loginResponse"));
const userId = userData?.Data?.userId;
//console.log("first", userId);
  
  const [selected, setSelected] =  useState([]);
  const [page, setPage] =  useState(0);
  const [rowsPerPage, setRowsPerPage] =  useState(25);
  const [checked, setChecked] = useState(true);
  const [rows, getVideolist] = useState([])

  const handleChangePage = (event, newPage) => { setPage(newPage); };
  const handleChangeRowsPerPage = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
  const isSelected = (_id) => selected.indexOf(_id) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
 // const visibleRows =  useMemo( () =>  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage,),  [ page, rowsPerPage], );
  const visibleRows =  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage,) ;

 /**-----edit status------ */

  const changeBlogStatus = (event) => { 
     setChecked(!checked)

  let data = JSON.stringify({
    "userId": `${userId}` ,
    "title":event.title,
    "videoId":event.videoId,
    "url":event.url,
    "initiativeId":`${props.videoId}`,
    "status":event.status=='1' ? '0' : '1',
    "date":event.date,
   });
   let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${apiRoute}/editwebvideo`,
    headers: {  'Content-Type': 'application/json' },
    data : data
  }; 
  axios.request(config)
  .then((response) => {  
    console.log(response.data)
  })
  .then(fetchAllVideoAPI)
    
  };

 /**-----edit status------ */
 /**---delete-video-url--- */
 const deleteVideoUrl =(event)=>{
  let data = JSON.stringify({
    "userId": `${userId}` ,
    "videoId":[event.videoId],
   });
   let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${apiRoute}/deletewebvideo`,
    headers: {  'Content-Type': 'application/json' },
    data : data
  }; 
  axios.request(config)
  .then((response) => {  
    console.log(response.data)
  })
  .then(fetchAllVideoAPI)
 }

 /**---delete-video-url--- */

 /**---fetch all video url--- */
const fetchAllVideoAPI=useCallback(()=>{
  let data = JSON.stringify({ "userId": `${userId}`, "initiativeId": props.videoId });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${apiRoute}/listwebvideo`,
    headers: {  'Content-Type': 'application/json' },
    data : data
  }; 
  axios.request(config)
  .then((response) => { 
    getVideolist(response.data.Data);
  //  console.log(response.data.Data) 
  })
 // .catch((error) => {  console.log(error);  });
}, [props.videoId,apiRoute, userId])
useEffect(()=>{
  fetchAllVideoAPI()
},[fetchAllVideoAPI])
 
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
          <Table className='tabel-responsive' aria-labelledby="tableTitle"  size= 'medium'  >
            <EnhancedTableHead  numSelected={selected.length}  onSelectAllClick={handleSelectAllClick} rowCount={rows.length}  />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" aria-checked={isItemSelected}
                    tabIndex={-1} key={row.catId} selected={isItemSelected} sx={{ cursor: 'pointer' }} >
                    <TableCell padding="checkbox" data-attr=""><Checkbox color="primary"  checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId, }}  onChange={(event) => handleClick(event, row._id)}/></TableCell>
                   
                    
                    <TableCell align="right" data-attr="">{row.title}</TableCell>
                    
                    <TableCell align="right" data-attr=""><Switch checked={ JSON.parse(row.status) == 1 ? true : false} 
                    inputProps={{ 'aria-label': 'controlled' }} onChange={()=>changeBlogStatus(row)}/></TableCell>										
                    {/* <TableCell align="right">{`${new Date(row.createdAt).getDate()}/${new Date(row.createdAt).getMonth()+1}/${new Date(row.createdAt).getFullYear()}`}</TableCell> */}
                    <TableCell align="right">{row.date? row.date : ''}</TableCell>
                    <TableCell align="right" data-attr=""><Link href={`/InitiativeVideos/${props.videoId}/${row.videoId}`}><span className="dashboard-table-icon"><BorderColorIcon /></span></Link></TableCell>
                    <TableCell align="right" data-attr=""><span className="dashboard-table-icon"><DeleteForeverIcon style={{color:'red', fontSize:'20px'}} onClick={()=>deleteVideoUrl(row)}/></span></TableCell>
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