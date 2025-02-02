"use client"
import {useState, useCallback, useEffect} from 'react';
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
import Switch from '@mui/material/Switch'; 
import BorderColorIcon from '@mui/icons-material/BorderColor';
 

const headCells = [
  { id: 'cat_page',  numeric: false, disablePadding: false, label: 'Brochure Title', },
  { id: 'cat_title',  numeric: false, disablePadding: false, label: 'Type', },
  { id: 'cat_description', numeric: false, disablePadding: false, label: 'Status', },
  { id: 'cat_state',  numeric: false, disablePadding: false, label: 'Action', },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, } = props; 

  return (
    <TableHead>
      <TableRow>
         
        {headCells.map((headCell) => (
          <TableCell  key={headCell.id}  align={headCell.numeric ? 'right' : 'left'}  padding={headCell.disablePadding ? 'none' : 'normal'}>
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
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div" style={{'fontSize':'22px','fontWeight:':'600'}}>Brochures List</Typography>
      )}
    </Toolbar>
  );
}
 

export default function BrochureTable() {
  const apiRoute = process.env.API_ROUTE;
  const [userData, setUserData] = useState();
  useEffect(() => {
    const storedData = localStorage.getItem("loginResponse");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const [selected, setSelected] =  useState([]);
  const [page, setPage] =  useState(0);
  const [rowsPerPage, setRowsPerPage] =  useState(25);
  const [rows, getProjectlist] = useState([])

  const handleChangePage = (event, newPage) => { setPage(newPage); };
  const handleChangeRowsPerPage = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
  const isSelected = (_id) => selected.indexOf(_id) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
 // const visibleRows =  useMemo( () =>  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage,),  [ page, rowsPerPage], );
  const visibleRows =  rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage,) ;




const fetchAllProjects=()=>{
 let data = JSON.stringify({ "userId": `${userData?.Data?.userId}` });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${apiRoute}/listBrochure`,
    headers: {  'Content-Type': 'application/json' },
    data : data
  }; 
  axios.request(config)
  .then((response) => { 
    getProjectlist(response.data.Data.brochureList);
   // console.log(response.data.Data) 
  })
//  .catch((error) => {  console.log(error);  });

}
useEffect(() => {
  if(userData){
  fetchAllProjects();
  }
}, [userData])

  return (
       <>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table className='tabel-responsive' aria-labelledby="tableTitle"  size= 'medium'  >
            <EnhancedTableHead  numSelected={selected.length} rowCount={rows.length}  />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" aria-checked={isItemSelected}
                    tabIndex={-1} key={row._id} selected={isItemSelected} sx={{ cursor: 'pointer' }} >
                    
                    
                    
                    <TableCell align="left" data-attr="">{row.title}</TableCell>
                    <TableCell align="left" data-attr="">
                      <div style={{maxHeight:'112px', overflow:'hidden',display: 'inline-block', maxWidth:'500px'}}>{row.type}</div>
                    </TableCell>
                    
                    <TableCell align="left" data-attr=""><Switch checked={ JSON.parse(row.status) == 1 ? true : false} 
                    inputProps={{ 'aria-label': 'controlled' }} /></TableCell>
                    <TableCell align="left" data-attr=""><Link href={`Brochure/${row.type}`}><span className="dashboard-table-icon"><BorderColorIcon /></span></Link></TableCell>
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