'use client'

import { useState,useEffect, useRef,useCallback} from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import 'react-quill/dist/quill.snow.css';
import Loader from '@/app/component/Loader' 
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Image from 'next/image';
import { toast} from 'react-toastify';
import FormData from 'form-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Switch from '@mui/material/Switch'; 
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Caretakerdetail({ params } ){

  
  let router= useRouter();
  const apiRoute = process.env.API_ROUTE;
  const userData = JSON.parse(localStorage.getItem("loginResponse"));
  const userId = userData?.Data?.userId;
  //console.log("first", userId);
  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [name, setName]= useState('')
  const [designation, setDesignation] = useState()



/*-------------------------------------------------------update caretaker---------------------------------------------------------------------------*/
async function uploadWithFormData() {
  pendingPopup()

   const myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
       "userId":  `${userId}`,
       "catName": name,
       "sequence": designation,
       "status": 1,
     });

     var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
   
   let response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/addgovernancecat`, requestOptions);
   
   const data1 = await response.json();
  // console.log(data1)

   function successPopup(){
    toast.success(`${data1.Message}` )
    toast.dismiss(toastId.current);
                           }
  function failPopup(){
  toast.error(`${data1.Message}`)
  toast.dismiss(toastId.current);
                      }
  function pendingPopup(){
    toastId.current =  toast.loading('Updating Detail') }

  { data1.Status === true  ?    successPopup() : failPopup()}
  
  }
/**----------------------------------------------------------------update caretaker--------------------------------------------- */


/**---------------------------------------------------------------------------------------------------------------------------------------- */
    return(<>

        <div className="container">

                   <div className="row">
                     <div className='col-md-10'>
                       <h2>Category Detail</h2>
                       <p>Partner Category info and extras.</p>
                     </div>
                     
                    </div>
                    
                    <div className='row' style={{borderBottom:'1px solid #e1e1e1',marginBottom:'25px'}} >
                       <div className='col-md-3'>
                         <div className='product_detail_tabs'>
                             <li className='active'>Basic Info</li>
                           </div>
                       </div>
                       <div className='col-md-5'></div>
                       
                    </div>

                    <div className='row'>
                        <div className='col-md-12'>
                           <div className=''>
                       {/*-------------------------------------------------------------------------------------------------------------------------- */}
                       <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head"> Name</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
                              </div>
                            </div>
                        
                        <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Series no.</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={designation} onChange={(e)=>setDesignation(e.target.value)} type="number" min="1" max="100"/></div>
                              </div>
                            </div>


                             
                            <div className='row'>  
                            <div className='col-md-2'></div>
                              <div className='col-md-4'>
                              <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href="/PartnerCategory">  Back </Link>
                              </div>
                              {/* <div className='col-md-4'>
                              <Button variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', textTransform:'capitalize'}} onClick={deleteBlog}>  Delete Category </Button>
                              </div> */}
                              
                              <div className='col-md-4'>
                              <Button variant="contained" color="success" style={{width:'100%', fontSize:'15px',padding:'10px'}} onClick={uploadWithFormData}>Add Category</Button>
                              </div>
                            </div>

                                 {/*-------------------------------------------------------------------------------------------------------------- */}

                            </div>
                        </div>
                    </div>

                </div>   
    
    </>)
}