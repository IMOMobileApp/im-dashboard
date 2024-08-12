'use client'
import { useState, Suspense } from 'react'  
import TextField from '@mui/material/TextField';
import Loader from '@/app/component/Loader'
import Link from 'next/link'
import NewOrderTable from './components/neworderTable'
 
 
 export default function NewOrders(){
    return(
        <div className="container">
        <div className="row">

          <div className="col-md-12">
            <div className='page-header'>New Orders</div>
          </div>
 
          <div className='col-md-12'>
            <div  style={{backgroundColor:'#fff',marginBottom:'20px',padding:'15px 15px'}}>
            <div className='row'>
              <div className='col-md-12'><TextField id="outlined-basic" label="Search Order" variant="outlined" fullWidth/></div>
             
             
            </div>
            </div>
          </div>


          <div className="col-md-12" style={{marginBottom:'150px'}}>
          <Suspense fallback={<Loader/>}>
             <NewOrderTable />
             </Suspense>
          </div>

         </div>


     </div>
    )
 };