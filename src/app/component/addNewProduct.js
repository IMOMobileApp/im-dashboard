

import Input from '@mui/joy/Input';

import Textarea from '@mui/joy/Textarea';

import UploadImg from './productImgUpload'

import CheckboxesTags from './checkbox_select_tags'

import TextField from '@mui/material/TextField';

import InputAdornment from '@mui/material/InputAdornment';

import InputTags from './multiTags_Input'

import Button from '@mui/material/Button';

import TextEditor from './textEditor'



export default function AddnewProduct(){

    

 return (

    <>

     <div className="row">

        <div className="col-md-4">

            <div className="input-head">Product Title/Name</div>

        </div>

        <div className="col-md-8">

            <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}}/></div>

        </div>

     </div>



     <div className="row">

        <div className="col-md-4">

            <div className="input-head">Product Description</div>

        </div>

        <div className="col-md-8">

            <div className="input-field"><Textarea disabled={false} minRows={2} size="lg" variant="soft" placeholder="" 

              style={{padding:'12px 15px',fontSize:'15px'}}/></div>

        </div>

     </div>



     <div className="row">

        <div className="col-md-4">

            <div className="input-head">Product Images</div>

        </div>

        <div className="col-md-8">

            <div className="input-field" style={{border:'1px dashed #d5d6d7',padding:'20px'}}>

          

            <UploadImg />

            </div>

        </div>

     </div>



     <div className="row">

        <div className="col-md-4">

            <div className="input-head">Product SKU</div>

        </div>

        <div className="col-md-8">

            <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}}/></div>

        </div>

     </div>



     <div className="row">

        <div className="col-md-4">

            <div className="input-head">Product Barcode</div>

        </div>

        <div className="col-md-8">

            <div className="input-field"><Input placeholder="" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}}/></div>

        </div>

     </div>



     <div className="row">

        <div className="col-md-4">

            <div className="input-head">Category</div>

        </div>

        <div className="col-md-8">

            <div className="input-field"><CheckboxesTags  style={{width:'100%'}}/></div>

        </div>

     </div>



     <div className="row">

        <div className="col-md-4">

            <div className="input-head">Default Category</div>

        </div>

        <div className="col-md-8">

            <div className="input-field"><CheckboxesTags /></div>

        </div>

     </div>



     <div className="row">

        <div className="col-md-4">

            <div className="input-head">Product Price</div>

        </div>

        <div className="col-md-8">

            <div className="input-field">

            <TextField label="With normal TextField" id="outlined-start-adornment" sx={{ m: 1, width: '100%' }}

             InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, }} />

            </div>

        </div>

     </div>



     <div className="row">

        <div className="col-md-4">

            <div className="input-head">Sale Price</div>

        </div>

        <div className="col-md-8">

            <div className="input-field">

            <TextField label="With normal TextField" id="outlined-start-adornment" sx={{ m: 1, width: '100%' }}

             InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, }} />

            </div>

        </div>

     </div>



     <div className="row">

        <div className="col-md-4">

            <div className="input-head">Product Quantity</div>

        </div>

        <div className="col-md-8">

            <div className="input-field">

            <TextField label="With normal TextField" id="product-quantity" sx={{ m: 1, width: '100%' }}

               />

            </div>

        </div>

     </div>



     <div className="row">

        <div className="col-md-4">

            <div className="input-head">Product Tags</div>

        </div>

        <div className="col-md-8">

            <div className="input-field">

            <InputTags />

            </div>

        </div>

     </div>



     <div className="row">

        <div className="col-md-4">

            <div className="input-head">Product Slug</div>

        </div>

        <div className="col-md-8">

            <div className="input-field">

            <TextField label="Product Slug" id="product-quantity" sx={{ m: 1, width: '100%' }}  />

            </div>

        </div>

     </div>



     <div className="row">

        <div className="col-md-4">

            <div className="input-head">Product Details</div>

        </div>

        <div className="col-md-8">

            <div className="input-field">

            <TextEditor  />

            </div>

        </div>

     </div>



     <div className='row'>

        <div className='col-md-6'>

        <Button variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px'}}>  Cancel </Button>

        </div>

        <div className='col-md-6'>

        <Button variant="contained" color="success" style={{width:'100%', fontSize:'15px',padding:'10px'}}> Update Product </Button>

        </div>

     </div>



    </>

 )

}

 