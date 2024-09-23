'use client'

import {useEffect, useState, useRef} from 'react';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
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

export default function Championdetail({ params } ){
  const apiRoute = process.env.API_ROUTE;
  // const userId = process.env.USER_ID;
const userData = JSON.parse(localStorage.getItem("loginResponse"));
const userId = userData?.Data?.userId;
//console.log("first", userId);
  let router= useRouter()

  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle]= useState();
  const [value, setValue] = useState();
  const [shotDesc, setShortDesc]= useState();
  const [selectedImages, setSelectedImages] = useState(null);
  const [status, setStatus] = useState()
    const onSelectFile = (e) => {
      setSelectedImages(e.target.files[0]);
    //  console.log(selectedImages)
      };


    const changeStatus=()=>{
    //  console.log(status)
      if(status ==1){
        setStatus('0')
      }
      else{setStatus('1')}
    }
  
  
    useEffect(
      ()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({  "userId": `${userId}`, "celebId": params.slug });
        var requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow'  };
        fetch(`${apiRoute}/celebritydetail`, requestOptions)
          .then(response => response.json())
          .then((result) => {
                setData(result.Data)
                setValue(result.Data.designation)
                setTitle(result.Data.name)
                setShortDesc(result.Data.description)
                setSelectedImages(result.Data.image)
                setStatus(result.Data.status)
                setLoading(false)
                            })
        //  .catch(error => console.log('error', error))
        }, [params.slug, apiRoute, userId]);

        if (isLoading) return <Loader />
        if (!data) return <p>No profile data</p>
/*-------------------------------------------------------update Blog-----------------------------------------------------------------------------------*/
async function uploadWithFormData() {

  pendingPopup()

   let bodyContent = new FormData();
   bodyContent.append("userId", `${userId}`);
   bodyContent.append("celebId", data.celebId);
   bodyContent.append("name", title);
   bodyContent.append("celeb_image", selectedImages);
   bodyContent.append("designation", value);
   bodyContent.append("description", shotDesc);
   bodyContent.append("status", status);
   
   let response = await fetch(`${apiRoute}/updatecelebrity`, { method: "POST", body: bodyContent, });
   
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
    toastId.current =  toast.loading('Updating Celebrity') }

  { data1.Status === true  ?    successPopup() : failPopup()}
  
  }
/**----------------------------------------------------------------update blog--------------------------------------------- */
/**--------------------------------------------------------------------delete Blog------------------------------ */
async function deleteChampion(){
  pendingPopup1()
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "userId": `${userId}`,
    "celebId": [data.celebId]
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
 let deleteResponse = await fetch(`${apiRoute}/deletecelebrity`, requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

    let deleteData = await deleteResponse.json()

    function successPopup1(){
      toast.success(`${deleteData.Message}` )
      toast.dismiss(toastId.current);
                             }
    function failPopup1(){
    toast.error(`${deleteData.Message}`)
    toast.dismiss(toastId.current);
                        }
    function pendingPopup1(){
      toastId.current =  toast.loading('Deleting Blog') }
  
    { deleteData.Status === true  ?    successPopup1() : failPopup1()}
    { deleteData.Status === true  ? router.push('/Celebrity') : ''}
   

}
  /**--------------------------------------------------------------------delete Blog------------------------------- */
/**---------------------------------------------------------------------------------------------------------------------------------------- */
    return(<>

        <div className="container">

                   <div className="row">
                     <div className='col-md-10'>
                       <h2>Update Celebrity</h2>
                       <p>Update Celebrity info and extras.</p>
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
                                  <div className="input-head">Celebrity Title/Name</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={title} onChange={(e)=>setTitle(e.target.value)}/></div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Celebrity Designation</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Textarea disabled={false} minRows={1} size="lg" variant="soft" placeholder="" value={value}
                                    style={{padding:'12px 15px',fontSize:'15px'}} onChange={(e)=>setValue(e.target.value)}/></div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Celebrity Description</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Textarea disabled={false} minRows={1} size="lg" variant="soft" placeholder="" value={shotDesc}
                                    style={{padding:'12px 15px',fontSize:'15px'}} onChange={(e)=>setShortDesc(e.target.value)}/></div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Celebrity Image</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field" style={{border:'1px dashed #d5d6d7',padding:'20px'}}>
                                   <Image src={data.image} alt={data.name}  width={200} height={200}/>
                                  
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
                                  <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={`${new Date(data.createdAt).getDate()}/${new Date(data.createdAt).getMonth() + 1}/${new Date(data.createdAt).getFullYear()}`} disabled/></div>
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
                              <div className='col-md-4'>
                              <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href="/Celebrity">  Back </Link>
                              </div>
                              <div className='col-md-4'>
                              <Button variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', textTransform:'capitalize'}} onClick={deleteChampion}>  Delete Celebrity </Button>
                              </div>
                              <div className='col-md-4'>
                              <Button variant="contained" color="success" style={{width:'100%', fontSize:'15px',padding:'10px', textTransform:'capitalize'}} onClick={uploadWithFormData}> Update Celebrity </Button>
                              </div>
                            </div>

                                 {/*-------------------------------------------------------------------------------------------------------------- */}

                            </div>
                        </div>
                    </div>

                </div>   
    
    </>)
}