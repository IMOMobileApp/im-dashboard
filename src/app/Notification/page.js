

'use client'
import { useState, useRef} from 'react';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button'; 
import 'react-quill/dist/quill.snow.css';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { toast} from 'react-toastify';
import FormData from 'form-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import EnhancedTable from '@/app/Users/components/allUsersTable'

export default function Addnotification(){
  const apiRoute = process.env.API_ROUTE;
  const userId = process.env.USER_ID;
    let router= useRouter()
    const toastId = useRef(null);
    const [title, setTitle]= useState();
    const [shotDesc, setShotDesc]= useState(); 
    const [arr, setArr] = useState([]);
    
  /*-------------------------------------------------------update Blog-----------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup()

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "userId": `${userId}`, "toId": arr, "title": title, "message": shotDesc });
    
    const requestOptions = {  method: "POST", headers: myHeaders,  body: raw, redirect: "follow"   };
    let response = await fetch(`${apiRoute}/customnotification`, requestOptions)
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
     toastId.current =  toast.loading('Sending Notification') }
   { data1.Status === true  ?    successPopup() : failPopup()}
   { data1.Status === true  ? router.push('/Notification') : ''}

 

    //  let bodyContent = new FormData();
    //  bodyContent.append("userId", `${userId}`); 
    //  bodyContent.append("title", title);
    //  bodyContent.append("message", shotDesc);
    //  bodyContent.append("toId", arr);
    //  let response = await fetch(`${apiRoute}/customnotification`, { method: "POST", body: bodyContent, });
    //  const data1 = await response.json();
    //  function successPopup(){
    //   toast.success(`${data1.Message}` )
    //   toast.dismiss(toastId.current);
    //                          }
    // function failPopup(){
    // toast.error(`${data1.Message}`)
    // toast.dismiss(toastId.current);
    //                     }
    // function pendingPopup(){
    //   toastId.current =  toast.loading('Sending Notification') }
    // { data1.Status === true  ?    successPopup() : failPopup()}
    // { data1.Status === true  ? router.push('/Notification') : ''}

    }
  /**----------------------------------------------------------------update blog--------------------------------------------- */
  /**---------------------------------------------------------------------------------------------------------------------------------------- */
      return(<>
          <div className="container">
                     <div className="row">
                       <div className='col-md-10'>
                         <h2>Send Notification</h2>
                       </div>
                      </div>
                      <div className='row' style={{borderBottom:'1px solid #e1e1e1',marginBottom:'25px'}} >
                         <div className='col-md-3'>
                           <div className='product_detail_tabs'>
                               <li className='active'>Detail Info</li>
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
                                    <div className="input-head">Notification Title</div>
                                </div>
                                <div className="col-md-8">
                                    <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={title} onChange={(e)=>setTitle(e.target.value)}/></div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-4">
                                    <div className="input-head">Notification Body</div>
                                </div>
                                <div className="col-md-8">
                                    <div className="input-field"><Textarea disabled={false} minRows={2} size="lg" variant="soft" placeholder="" value={shotDesc} onChange={(e)=>setShotDesc(e.target.value)}
                                      style={{padding:'12px 15px',fontSize:'15px'}}/></div>
                                </div>
                              </div>
                             
                             <div className='row'>
                                <div className='col-md-12'>
                                    <EnhancedTable  setArrFunc={setArr}/>
                                </div>
                             </div>
                             
                              
                             

                              <div className='row'>
                                <div className='col-md-2'></div>
                                <div className='col-md-4'>
                                <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href="/dashboard">  Cancel </Link>
                                </div>
                                <div className='col-md-4'>
                                <Button variant="contained" color="success" style={{width:'100%', fontSize:'15px',padding:'10px'}} onClick={uploadWithFormData}> Send Notification </Button>
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