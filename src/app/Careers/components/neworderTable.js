"use client"
import {useState, useCallback, useEffect, useRef} from 'react';
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
import Link from 'next/link'
 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import { toast} from 'react-toastify';
import Chip from '@mui/material/Chip';

import Button from '@mui/material/Button';
import { CSVLink } from "react-csv";

const headCells = [
  
  { id: 'cat_name',  numeric: false, disablePadding: false, label: 'Name', },
  { id: 'cat_district',  numeric: false, disablePadding: false, label: 'Email', },
  { id: 'cat_mobile',  numeric: false, disablePadding: false, label: 'Mobile', },
  { id: 'cat_message',  numeric: false, disablePadding: false, label: 'Download CV', },
  { id: 'cat_date',  numeric: false, disablePadding: false, label: ' Date', },
  { id: 'cat_status',  numeric: false, disablePadding: false, label: 'Status', },
  { id: 'cat_action',  numeric: false, disablePadding: false, label: ' Action', }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, } = props; 

  return (
    <TableHead>
      <TableRow>
         
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
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div" style={{'fontSize':'22px','fontWeight:':'600'}}>  Career List</Typography>
      )}
    </Toolbar>
  );
}
 

export default function NewOrderTable() {
  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
  const [selected, setSelected] =  useState([]);
  const [page, setPage] =  useState(0);
  const [rowsPerPage, setRowsPerPage] =  useState(25);
  const [rows, getProjectlist] = useState([])

  const toastId = useRef(null);

  const handleChangePage = (event, newPage) => { setPage(newPage); };
  const handleChangeRowsPerPage = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
  const isSelected = (_id) => selected.indexOf(_id) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
 // const visibleRows =  useMemo( () =>  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage,),  [ page, rowsPerPage], );
  const visibleRows =  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage,) ;


  /**------download queries------ */
const csvData = [
  ["Name", "EMail", 'Mobile', 'Status','Date',],
  ...rows.map(({ name, email, mobile, statusMessage, createdAt })=> [
    name, email, mobile, statusMessage, createdAt
  ]),
];
/**------download queries------ */



const fetchAllProjects=useCallback(()=>{
  let data = JSON.stringify({ "userId": `${userId}` });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${apiRoute}/careerlist`,
    headers: {  'Content-Type': 'application/json' },
    data : data
  }; 
  axios.request(config)
  .then((response) => { 
    getProjectlist(response.data.Data);
   // console.log(response.data.Data) 
  })
//  .catch((error) => {  console.log(error);  });

}, [apiRoute, userId])


useEffect(() => {
  fetchAllProjects();
}, [fetchAllProjects])



const [status, setStatus] = useState('');
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

  const handleChange = async (e, formId, type) => {
    setStatus(e.target.value);
    pendingPopup()
    console.log(e.target.value);
const raw = JSON.stringify({"userId": userId,"formId": formId,"type": type,"status": e.target.value});
const requestOptions = {method: "POST",headers: myHeaders,body: raw,redirect: "follow"};
let response = await fetch(`${apiRoute}/formAction`, requestOptions)
const data1 = await response.json();
console.log(data1)
{ data1.Status === true  ?    successPopup(data1) : failPopup(data1)}
  };

  function successPopup(data1){
    toast.success(`${data1.Message}` )
    toast.dismiss(toastId.current);
    fetchAllProjects();
                           }
  function failPopup(data1){
  toast.error(`${data1.Message}`)
  toast.dismiss(toastId.current);
                      }
  function pendingPopup(){  toastId.current =  toast.loading('Updating Detail') }

  return (
       <>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div style={{textAlign:'right',marginTop:'10px', textTransform:'capitalize'}}><Button variant="outlined" style={{textTransform:'capitalize'}}><CSVLink data={csvData} filename={"Career Queries.csv"}>Download Career List</CSVLink></Button></div>
        <TableContainer>
          <Table  className='tabel-responsive'  aria-labelledby="tableTitle"  size= 'medium'  >
            <EnhancedTableHead  numSelected={selected.length} rowCount={rows.length}  />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" aria-checked={isItemSelected}
                    tabIndex={-1} key={row._id} selected={isItemSelected} sx={{ cursor: 'pointer' }} >
                    
                    
                    {/* <TableCell align="left">
                      <div style={{position:'relative',width:'50px',height:'50px',borderRadius:'50%',border:'1px solid #e2e2e2',marginLeft:'auto',overflow: 'hidden'}}><Image src={row.image} alt="product image" width={50} height={50}/>
                      </div></TableCell> */}
                    
                    <TableCell align="left" data-attr="">{row.name}</TableCell>
                    <TableCell align="left" data-attr="">{row.email}</TableCell> 
                    <TableCell align="left" data-attr="">{row.mobile}</TableCell> 
                    <TableCell align="left" data-attr="">
                         <Button variant="contained" color="success" style={{padding:'10px 20px', fontSize:'13px', marginLeft:'10px'}}>
                              <Link href={row.uploadFile} style={{color:'#fff'}} target="_blank"> Download</Link>
                        </Button>
                      </TableCell> 
                    <TableCell align="left" data-attr="">{`${new Date(row.createdAt).getDate()}/${new Date(row.createdAt).getMonth()+1}/${new Date(row.createdAt).getFullYear()}`}</TableCell>
                    <TableCell align="left" data-attr="">
                    <Chip label={row.statusMessage} 
                       style={{
                        backgroundColor:
                        row.status == 1 ? '#fcae1e' : row.status == 2 ? '#FF0000' : row.status == 3 ? '#FFA500' : row.status == 4 ? '#0000FF' : row.status == 5 ? '#808080' : row.status == 6 ?'#6ae46a' :'#008000' ,
                        color:"#fff"
                      }}
                       />
                    </TableCell>
                    <TableCell  align="left" data-attr="">
                    <FormControl sx={{ m: 1, minWidth:150 }} size="small">
                          <InputLabel id={`demo-select-small-label-${index}`}>Change Status</InputLabel>
                          <Select labelId={`demo-select-small-label-${index}`} id={`demo-select-small-${index}`} value={row.status} label="Change Status" onChange={(e)=>{handleChange(e, row.formId, row.type)}} >
                          <MenuItem value={1}> Pending </MenuItem>
                            <MenuItem value={2}>Site visit</MenuItem>
                            <MenuItem value={3}>Not Reachable</MenuItem>
                            <MenuItem value={4}>In Progress</MenuItem>
                            <MenuItem value={5}>Rejected</MenuItem>
                            <MenuItem value={6}>Business completed</MenuItem>
                            <MenuItem value={7}>Vis. & Est.</MenuItem>
                          </Select>
                        </FormControl>
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