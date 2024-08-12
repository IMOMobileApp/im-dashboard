"use client"

import { Suspense} from 'react'
import Link from 'next/link'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Loader from '@/app/component/Loader'
import CategoryTable from './components/categoryTable'
export default function Categories(){
  return(

   
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className='page-header'>Quiz Categories</div>
        </div>
        <div className="col-md-12" style={{ marginBottom: '20px' }}>
          <div className="row">
            <div className="col-md-3">
            </div>
            <div className='col-md-7'></div>
            <div className='col-md-2'>
              <Button variant="contained" color="success" style={{ padding: '10px 20px', fontSize: '13px', marginLeft: '10px' }}><AddIcon />  <Link href="/Quiz/AddCategory" style={{ 'color': '#fff' }}>Add Category</Link></Button>
            </div>
          </div>
        </div>
        <div className='col-md-12'>
          <div style={{ backgroundColor: '#fff', marginBottom: '20px', padding: '15px 15px' }}>
            <div className='row'>
              <div className='col-md-12'><TextField id="outlined-basic" label="Search Category" variant="outlined" fullWidth /></div>
            </div>
          </div>
        </div>
        <div className="col-md-12" style={{ marginBottom: '150px' }}>
          <Suspense fallback={<Loader />}>
            <CategoryTable />
          </Suspense>
        </div>
      </div>
    </div>

  )

}

