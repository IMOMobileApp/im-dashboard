'use client'

import {useEffect, useState, useRef} from 'react';
import Input from '@mui/joy/Input'; 
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import 'react-quill/dist/quill.snow.css'; 
import Loader from '@/app/component/Loader' 
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Image from 'next/image';
import { toast} from 'react-toastify';
import FormData from 'form-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
export default function Categorydetail({ params } ){
  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
  let router= useRouter()
  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle]= useState();
  const [selectedImages, setSelectedImages] = useState(null);
  const [status, setStatus] = useState()
    const onSelectFile = (e) => {
      setSelectedImages(e.target.files[0]);
    //  console.log(selectedImages)
      };
    const changeStatus=()=>{
    //  console.log(status)
      if(status ==1){ setStatus('0')}
      else{setStatus('1')}
    }
    useEffect(
      ()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({  "userId": `${userId}`, "catId": params.slug });
        var requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow'  };
        fetch(`${apiRoute}/quizcatdetail`, requestOptions)
          .then(response => response.json())
          .then((result) => {
                setData(result.Data) 
                setTitle(result.Data?.categoryName) 
                setSelectedImages(result.Data?.categoryImage)
                setStatus(result.Data?.status)
                setLoading(false)
                            })
        //  .catch(error => console.log('error', error))
        }, [params.slug, apiRoute, userId]);
        if (isLoading) return <Loader />
        if (!data) return <p>No Banner found</p>
/*-------------------------------------------------------update Banner-----------------------------------------------------------------------------------*/

async function uploadWithFormData() {
  pendingPopup()
   let bodyContent = new FormData();
   bodyContent.append("userId", `${userId}`);
   bodyContent.append("quizId", data._id);
   bodyContent.append("categoryName", title);
   bodyContent.append("quizCategoryImage", selectedImages);
   bodyContent.append("status", status);
   bodyContent.append("totalQuiz", data.totalQuiz);
   bodyContent.append("completeQuiz", data.completeQuiz);
   bodyContent.append("New", data.New);
   let response = await fetch(`${apiRoute}/editquizcat`, { method: "POST", body: bodyContent, });
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
    toastId.current =  toast.loading('Updating Banner') }
  { data1.Status === true  ?    successPopup() : failPopup()}
  }

/**----------------------------------------------------------------update banner--------------------------------------------- */

/**---------------------------------------------------------------------------------------------------------------------------------------- */
    return(<>
        <div className="container">
                   <div className="row">
                     <div className='col-md-10'>
                       <h2>Quiz Category</h2>
                       <p>Update quiz info and extras.</p>
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
                                  <div className="input-head">Category Title/Name</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={title}/></div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Category Image</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field" style={{border:'1px dashed #d5d6d7',padding:'20px'}}>
                                   <Image src={data.categoryImage} alt={data.ban_title}  width={200} height={200}/>
                                  <Button component="label" variant="contained" startIcon={<UploadFileIcon />} style={{textAlign:'center'}}>Upload file
                                  <input type="file" name="images" onChange={onSelectFile}  multiple accept="image/png , image/jpeg, image/webp"  style={{opacity:'0'}}/> 
                                  </Button>
                                  { selectedImages === ! null ? '' : selectedImages.name}
                                  </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Created At</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={`${new Date(data.createdAt).getDate()}/${new Date(data.createdAt).getMonth()+1}/${new Date(data.createdAt).getFullYear()}`} disabled/></div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Status</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Switch checked={JSON.parse(status) == 1 ? true : false} inputProps={{ 'aria-label': 'controlled' }} onChange={changeStatus}/></div>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-md-2'></div>
                              <div className='col-md-4'>
                              <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href="/Quiz">  Back </Link>
                              </div>
                              
                              <div className='col-md-4'>
                              <Button variant="contained" color="success" style={{width:'100%', fontSize:'15px',padding:'10px'}} onClick={uploadWithFormData}> Update Category </Button>
                              </div>
                            </div>
                                 {/*-------------------------------------------------------------------------------------------------------------- */}
                            </div>
                        </div>
                    </div>
                </div>
    </>)

}