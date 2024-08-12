'use client'
import { useState, useRef} from 'react';
import Input from '@mui/joy/Input';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button'; 
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { toast} from 'react-toastify';
import FormData from 'form-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
    const [url, setUrl] = useState([]); 
    const [status, setStatus] = useState('1')
    const [selectedImages, setSelectedImages] = useState(); 
    const [date, setDate]=useState('')
    const [formValues, setFormValues] = useState([]);

    const handleChange1 = (index, e) => {
      setFormValues((prevFormValues) => {
        const newFormValues = [...prevFormValues];
        newFormValues[index] = [ e.target.value ];
        return newFormValues;
      });
    };

    let addFormFields = () => { setFormValues([...formValues, []]) }

    let removeFormFields = (i) => {
      let newFormValues = [...formValues];
      newFormValues.splice(i, 1);
      setFormValues(newFormValues)
  }

  let handleSubmit = (event) => {event.preventDefault();  console.log(JSON.stringify(formValues.flat()))}

    /**---------dynamics----- */

    const onSelectFile = (e) => { setSelectedImages(e.target.files[0]);  console.log(selectedImages) };

      const changeStatus=()=>{
      if(status ==1){  setStatus('0')  }
        else{setStatus('1')}
      }

  /*-------------------------------------------------------update album--------------------------------------------------------------------------------*/
  async function uploadWithFormData(){
     pendingPopup()
   //console.log(title, selectedImages, status)
    console.log(formValues.flat())
    const nowUrl = Array.from(formValues);
    let bodyContent = new FormData();

    nowUrl.forEach((image, index) => {  bodyContent.append("urls", image);  });

     bodyContent.append("userId", `${userId}`); 
     bodyContent.append("title", title);
     bodyContent.append("upload_image", selectedImages);
     bodyContent.append("initiativeId",`${params.slug}`);
     bodyContent.append("status", status);
    // bodyContent.append("urls",formValues);
     bodyContent.append("date", date)
     let response = await fetch(`${apiRoute}/addwebnews`, { method: "POST", body: bodyContent, });
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
    { data1.Status === true  ? router.push(`/InitiativeNews/${params.slug}`) : ''}


    }
  /**----------------------------------------------------------------update album--------------------------------------------- */
  /**------------------------------------------------------------------------------------------------------------------------------------ */
      return(<>
          <div className="container">

                     <div className="row">
                       <div className='col-md-10'>
                         <h2>Add News</h2>
                         <p>Add News info and extras.</p>
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
                                    <div className="input-head">News Title/Name</div>
                                </div>
                                <div className="col-md-8">
                                    <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={title} onChange={(e)=>setTitle(e.target.value)}/></div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-4">
                                    <div className="input-head">News Image</div>
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
                                    <div className="input-head">News URL</div>
                                </div>
                                <div className="col-md-8">

                                {formValues.map((element, index) => (
                                <div className="row" key={index}>

                                <div className='col-md-10'>
                                <div className="input-field">
                                <Input type="text" name="quantity" value={formValues[index].total} onChange={e => handleChange1(index, e)} variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} placeholder="Enter Url"/>
                                </div>  
                                </div>
                                {  index ?   <div className='col-md-2'><DeleteForeverIcon onClick={() => removeFormFields(index)} style={{color:'red',fontSize:'20px', cursor:'pointer',marginTop:'5px'}}/></div>   : '' }
                                </div>
                                 ))}

                                <div className="col-md-4">
                                <div className='input-field'>
                                <Button variant="outlined" color="success" style={{width:'100%', fontSize:'12px',padding:'7px'}}  onClick={() => addFormFields()}><AddCircleOutlineIcon  /> Add More URL</Button> 
                                {/* <button className="button submit" type="submit" onClick={(event)=> handleSubmit(event)}>Submit</button> */}
                                </div>
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
          <DemoContainer components={['DatePicker']}>
            <DatePicker 
              label="YYYY-MM-DD"
              format="YYYY - MM - DD"
              
              onChange={(newValue) => {
                setDate(dayjs(newValue).format('YYYY-MM-DD'))
              }}
              disableFuture
            />
          </DemoContainer>
        </LocalizationProvider>

                                   
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
                                <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href={`/InitiativeNews/${params.slug}`}>  Cancel </Link>
                                </div>
                                <div className='col-md-6'>
                                <Button variant="contained" color="success" style={{width:'100%', fontSize:'15px',padding:'10px'}} onClick={uploadWithFormData}> Add News </Button>
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