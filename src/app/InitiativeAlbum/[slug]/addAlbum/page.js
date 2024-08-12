'use client'
import {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import Input from '@mui/joy/Input';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button'; 
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { toast} from 'react-toastify';
import FormData from 'form-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Addblog({ params }){

  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
    let router= useRouter()
    const toastId = useRef(null);
    const [title, setTitle]= useState();
    const [selectedImages, setSelectedImages] = useState([]); 
    const [status, setStatus] = useState('1')
    const [data, setData] = useState();
    const [date, setDate]=useState('')

    const onSelectFile = (e) => { setSelectedImages(e.target.files[0]);
        console.log(selectedImages)
        };
      const changeStatus=()=>{
      if(status ==1){  setStatus('0')  }
        else{setStatus('1')}
      }

 


/**---fetch all album--- */
// const fetchAllWebcategoryAPI=useCallback(()=>{
//   let data = JSON.stringify({
//      "userId": `${userId}` ,
//      "title":'',
//      "album_image":'',
//      "initiativeId":'',
//      "status":'',
    
//     });
//   let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: `${apiRoute}/addalbumcat`,
//     headers: {  'Content-Type': 'application/json' },
//     data : data
//   }; 
//   axios.request(config)
//   .then((response) => { 
//     setData(response.data.Data);
//   })
// }, [apiRoute, userId])



/**----fetch all album----- */
useEffect(
  ()=>{
    //  fetchAllWebcategoryAPI()
    }, [apiRoute, userId]);
  /*-------------------------------------------------------update album--------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup()
     console.log(title, selectedImages, status)

     let bodyContent = new FormData();
     bodyContent.append("userId", `${userId}`); 
     bodyContent.append("title", title);
     bodyContent.append("albumCat_image", selectedImages);
     bodyContent.append("status", status);
     bodyContent.append("initiativeId", `${params.slug}`);
     bodyContent.append("date", date)

     let response = await fetch(`${apiRoute}/addalbumcat`, { method: "POST", body: bodyContent, });
  

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
      toastId.current =  toast.loading('Updating Album') }
    { data1.Status === true  ?    successPopup() : failPopup()}
    { data1.Status === true  ? router.push(`/InitiativeAlbum/${params.slug}`) : ''}

    }
  /**----------------------------------------------------------------update album--------------------------------------------- */
  /**---------------------------------------------------------------------------------------------------------------------------------------- */
      return(<>
          <div className="container">
                     <div className="row">
                       <div className='col-md-10'>
                         <h2>Add Album</h2>
                         <p>Add Album info and extras.</p>
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
                                    <div className="input-head">Album Title/Name</div>
                                </div>
                                <div className="col-md-8">
                                    <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={title} onChange={(e)=>setTitle(e.target.value)}/></div>
                                </div>
                              </div>
                            
                             
                              <div className="row">
                                <div className="col-md-4">
                                    <div className="input-head">Album Image</div>
                                </div>
                                <div className="col-md-8">
                                    <div className="input-field" style={{border:'1px dashed #d5d6d7',padding:'20px'}}>
                                    <Button component="label" variant="contained" startIcon={<UploadFileIcon />} style={{textAlign:'center'}}>Upload file
                                    <input type="file" name="images" onChange={onSelectFile} accept="image/png , image/jpeg, image/webp"  style={{opacity:'0'}}/> 
                                    </Button>
                                    { selectedImages == null ? '': selectedImages.name}
                                    </div>
                                </div>
                              </div>


                              <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Created At</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field">
                                 
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}> <DatePicker label="YYYY-MM-DD" defaultValue={dayjs(new Date())} 
                                        onChange={(newValue) => {setDate(dayjs(newValue).format('YYYY-MM-DD'))}}
                                        disableFuture/> </DemoContainer>
                                  </LocalizationProvider>

                                    {/* <Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={`${new Date(data.createdAt).getDate()}/${new Date(data.createdAt).getMonth()}/${new Date(data.createdAt).getFullYear()}`} disabled/> */}
                                  </div>
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
                                <div className='col-md-6'>
                                <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href={`/InitiativeAlbum/${params.slug}`}>  Cancel </Link>
                                </div>
                                <div className='col-md-6'>
                                <Button variant="contained" color="success" style={{width:'100%', fontSize:'15px',padding:'10px'}} onClick={uploadWithFormData}> Add Album </Button>
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