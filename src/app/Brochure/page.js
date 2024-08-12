'use client'
import { useState, Suspense } from 'react' 
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Loader from '@/app/component/Loader'
import Link from 'next/link'
import BrochureTable from './component/brochureTable'
 
 
 export default function Brochures(){
    return(
        <div className="container">
        <div className="row">

          <div className="col-md-12">
            <div className='page-header'> Brochures</div>
          </div>

          <div className="col-md-12" style={{marginBottom:'20px'}}>
             <div className="row">
                 <div className="col-md-3">
                  
                 </div>
                  <div className='col-md-6'></div>
                  
                 <div className='col-md-3'>
                 
                
                 {/* <Button variant="contained" color="success" style={{padding:'10px 20px', fontSize:'13px', marginLeft:'10px'}}>
                   <Link href="/SEO/AddSeo" style={{color:'#fff'}}><AddIcon />New SEO</Link></Button> */}
                 </div>
             </div>
          </div>

          {/* <div className='col-md-12'>
            <div  style={{backgroundColor:'#fff',marginBottom:'20px',padding:'15px 15px'}}>
            <div className='row'>
              <div className='col-md-12'><TextField id="outlined-basic" label="Search Policy" variant="outlined" fullWidth/></div>
             
             
            </div>
            </div>
          </div> */}


          <div className="col-md-12" style={{marginBottom:'150px'}}>
          <Suspense fallback={<Loader/>}>
             <BrochureTable />
             </Suspense>
          </div>

         </div>


     </div>
    )
 };