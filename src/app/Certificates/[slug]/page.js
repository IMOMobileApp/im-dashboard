'use client'
import {useEffect, useState} from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import Loader from '@/app/component/Loader'
import Image from 'next/image';
import Link from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useRouter } from 'next/navigation'

export default function Userdetail({ params } ){
    let router= useRouter()
    const apiRoute = process.env.API_ROUTE;
    // const userId = process.env.USER_ID;
const userData = JSON.parse(localStorage.getItem("loginResponse"));
const userId = userData?.Data?.userId;
//console.log("first", userId);
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true)
      useEffect(
        ()=>{
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var raw = JSON.stringify({  "userId": `${userId}`, "challengeId": params.slug });
          var requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow'  };
          fetch(`${apiRoute}/challengedetail`, requestOptions)
            .then(response => response.json())
            .then((result) => {
                  setData(result.Data)
                  setLoading(false)
                              })
          }, [params.slug, apiRoute, userId, isLoading]); //console.log(data?.Data);



          const sendCertificate =()=>{
            setLoading(true)
            var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var raw = JSON.stringify({  "userId": `${userId}`, "challengeId": params.slug });
          var requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow'  };
          fetch(`${apiRoute}/approvechallenge`, requestOptions)
            .then(response => response.json())
            .then((result) => {
                  setData(result.Data)
                  setLoading(false)
                              })
          }

          const deleteCertificate=()=>{
            setLoading(true)
            var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var raw = JSON.stringify({  "userId": `${userId}`, "challengeId": params.slug });
          var requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow'  };
          fetch(`${apiRoute}/removeGreenSpam`, requestOptions)
            .then(response => response.json())
            .then((result) => {console.log(result)
                 // setData(result.Data)
                  setLoading(false)
                  router.push('/Certificates')
                              })
          }

          if (isLoading) return <Loader />
          if (!data) return <p>No profile data</p>

      return(<>
          <div className="container">

                     <div className="row">
                       <div className='col-md-10'>
                         <h2>User Detail</h2>
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
                                <div className="col-md-2">
                                    <div className="input-head">User Name</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px',color:'#000'}} value={data.name} disabled /></div>
                                </div>
                                <div className="col-md-2">
                                    <div className="input-head">Email</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px',color:'#000'}} value={data.email} disabled/></div>
                                </div>
                                </div>


                                <div className="row">
                                <div className="col-md-2">
                                    <div className="input-head">Phone</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px',color:'#000'}} value={data.mobile} disabled  /></div>
                                </div>
                                <div className="col-md-2">
                                    <div className="input-head">Date of Birth</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-field">
                                        <Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px',color:'#000'}} value={data.DOB} disabled/>
                                        </div>
                                </div>

                                </div>

                                <div className="row">
                                <div className="col-md-2">
                                    <div className="input-head">Address</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px',color:'#000'}} value={data.address} disabled  /></div>
                                </div>
                                <div className="col-md-2">
                                    <div className="input-head">District</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-field">
                                        <Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px',color:'#000'}} value={data.district} disabled/>
                                        </div>
                                </div>

                                </div>

                                <div className="row">
                                <div className="col-md-2">
                                    <div className="input-head">State</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px',color:'#000'}} value={data.state} disabled  /></div>
                                </div>
                                <div className="col-md-2">
                                    <div className="input-head">Country</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-field">
                                        <Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px',color:'#000'}} value={data.country} disabled/>
                                        </div>
                                </div>

                                </div>

                                <div className="row">
                                <div className="col-md-2">
                                    <div className="input-head">Pincode</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px',color:'#000'}} value={data.pincode} disabled  /></div>
                                </div>

                                <div className="col-md-2">
                                    <div className="input-head">Celebrity</div>
                                </div>
                                <div className="col-md-4">
                                <div className="input-field">
                                  <Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px',color:'#000'}} value={data.celebName} disabled  />
                                </div>
                                </div>
                               

                                </div>

                                <div className="row">
                                <div className="col-md-2">
                                    <div className="input-head">Photo</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-field">
                                        <Image src={data.image} alt="certificate" width={300} height={300}/>                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="input-head">Certificate Status</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-field">
                                        { data.isApproved == 0 ? 
                                        <><Button onClick={sendCertificate} variant="outlined" color="error" style={{width:'40%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000',textTransform:'capitalize'}}>
                                         {isLoading ? <Loader /> : 'Send Certificate'} </Button>
                                         <Button onClick={deleteCertificate} variant="contained" color="error" style={{width:'40%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #fff',color:'#fff',textTransform:'capitalize',marginLeft:'10px'}}>Delete</Button>
                                         </>
                                         : <Button variant="contained" color="success" style={{width:'100%', fontSize:'15px',padding:'10px'}} disabled>Approved</Button>
                                        }
                                        
                                    </div>
                                </div>
                                <div className='col-md-2'>
                                    {  data.certificateLink ?  
                                     <Link href={data.certificateLink} target="_blank" variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000',textTransform:'capitalize'}}><RemoveRedEyeIcon /> Certificate</Link>
                                     :
                                     ''}
                                </div>

                               

                                </div>

                                 
                                

                              <div className='row'>
                                <div className='col-md-3'>
                                <Button variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px'}}> <Link href="/Certificates" style={{color:'#d32f2f',width:'100%'}}>Back</Link> </Button>
                                </div>

                              </div>

                                   {/*-------------------------------------------------------------------------------------------------------------- */}

                              </div>
                          </div>
                      </div>

                  </div>   

      </>)

  }