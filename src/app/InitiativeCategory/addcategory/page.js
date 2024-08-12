'use client'
import { useState, useRef, useEffect} from 'react';
import axios from 'axios'; 
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button'; 
import 'react-quill/dist/quill.snow.css';
import { toast} from 'react-toastify';
import FormData from 'form-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export default function AddInitiativeCategory(){
  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
    let router= useRouter()
    const toastId = useRef(null);
    const [name, setName]= useState();
   
useEffect(()=>{
},[])

  /*-------------------------------------------------------update species----------------------------------------------------------------------------*/
  async function uploadWithFormData() {
     
    pendingPopup()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "userId": `${process.env.NEXT_PUBLIC_USERID}`,
      "title": name,
      "status": 1
    });

    
     let response = await fetch(`${apiRoute}/addinitiative`, { method: "POST", body: raw, headers: myHeaders, });
     const data1 = await response.json();
     function successPopup(){
      toast.success(`${data1.Message}` )
      toast.dismiss(toastId.current);
                             }
    function failPopup(){
    toast.error(`${data1.Message}`)
    toast.dismiss(toastId.current);
                        }
    function pendingPopup(){
      toastId.current =  toast.loading('Updating Caretaker') }
    { data1.Status === true  ?    successPopup() : failPopup()}
    { data1.Status === true  ? router.push('/InitiativeCategory') : ''}
    }
  /**----------------------------------------------------------------update species--------------------------------------------- */
  /**---------------------------------------------------------------------------------------------------------------------------------------- */
      return(<>
          <div className="container">
                     <div className="row">
                       <div className='col-md-10'>
                         <h2>Add Initiative Category</h2>
                         <p>Add Initiative Category info and extras.</p>
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
                                    <div className="input-head">Name</div>
                                </div>
                                <div className="col-md-8">
                                    <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={name} onChange={(e)=>setName(e.target.value)}/></div>
                                </div>
                              </div>
                              
                             
                              
                              <div className='row'>
                                <div className='col-md-6'>
                                <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href="/Species">  Cancel </Link>
                                </div>
                                <div className='col-md-6'>
                                <Button variant="contained" color="success" style={{width:'100%', fontSize:'15px',padding:'10px'}} onClick={uploadWithFormData}> Add Category </Button>
                                </div>
                              </div>
                                   {/*-------------------------------------------------------------------------------------------------------------- */}
                              </div>
                          </div>
                      </div>
                  </div>   
                  </>
)
}