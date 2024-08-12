This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
#   i g n i t i n g - m i n d s 
 
 


1- 
like date is not working as in webBlogs 
http://localhost:3000/Webblogs/65d6f1153373017dff0a5010

is not showing in
http://localhost:3000/InitiativeAlbum/65d5a97ec948382b20be6fb7/65d6f68c3373017dff0a511c


2-  while adding a new video for mobile app , we are sending Type as 'inventory' in response instead of 'app' but it shows in frontend an 'app' is selected.
thats why video is not showing in mobile    -------------Done

3-  after doing text editor quill react work in policycontent there is infinite loop in server or this may be with project edit page. --------Done

4- http://localhost:3000/InitiativeVideos/65d5b3c247d6db21ba234101    status change is to be done, fetch method is not working use axios;---- done

5-  http://localhost:3000/InitiativeNews/65d5b3c247d6db21ba234101/65e8420866bb64d52d33673b   dynamic response from api in url is not working it is coming in string in form of array

---------dynamic add fields------

    const [formValues, setFormValues] = useState([{ name: "", total: "" }]);
    
       const handleChange1 = (index, e) => {
      setFormValues((prevFormValues) => {
        const newFormValues = [...prevFormValues];
        newFormValues[index] = { ...newFormValues[index], total: e.target.value };
        return newFormValues;
      });
    };

    let addFormFields = () => { setFormValues([...formValues, { name: "", total: "" }]) }

    let removeFormFields = (i) => {
      let newFormValues = [...formValues];
      newFormValues.splice(i, 1);
      setFormValues(newFormValues)
  }

  let handleSubmit = (event) => {event.preventDefault(); alert(JSON.stringify(formValues));}



  {formValues.map((element, index) => (
            <div className="row" key={index}>
              
              <div className='col-md-5'>
              <div className="input-field">
                <Input type="text" name="quantity" value={formValues[index].total} onChange={e => handleChange1(index, e)} variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} placeholder="Quantity…"/>
              </div>  
              </div>
              {  index ?   <div className='col-md-2'><DeleteForeverIcon onClick={() => removeFormFields(index)} style={{color:'red',fontSize:'20px', cursor:'pointer',marginTop:'5px'}}/></div>   : null }
            </div>
          ))}

<div className="col-md-4">
                        <div className='input-field'>
                      {/* {formValues.length > speciesArray.length - 1 ? '': <Button variant="outlined" color="success" style={{width:'100%', fontSize:'12px',padding:'7px'}}  onClick={() => addFormFields()}><AddCircleOutlineIcon  /> Add More Species</Button> } */}
                       <Button variant="outlined" color="success" style={{width:'100%', fontSize:'12px',padding:'7px'}}  onClick={() => addFormFields()}><AddCircleOutlineIcon  /> Add More Species</Button> 
                      <button className="button submit" type="submit" onClick={(event)=> handleSubmit(event)}>Submit</button>
                      </div>
                      </div>



////////////////now send the formValues in api through the bodyContent
                       bodyContent.append("speciesArray", JSON.stringify(formValues));

---------dynamic add fields------

------------pass array data from child to parent component----
Notification ...page

  import React, {useState} from 'react';
    import Child from './Child/Child'

    function App() {
      const [arr, setArr] = useState([]);
      return(
        <div className='App'>
          <Child setArrFunc={setArr}></Child>
        </div>
      )
    }

export default App
------
import React, {useEffect} from 'react';

function Child({setArrFunc}) {

  const employees = ['Williams','Steve']
  useEffect(()=> {
 setArrFunc(employees);
},[]);
  return(
    <div className='Child'>
    </div>
  )
}
export default Child;



------------pass array data from child to parent component----

------error---
while adding a new news clip, url is adding via string

https://manager.walkforgreen.org/InitiativeNews/65d5b3c247d6db21ba234101/6606ac6df3f29ef66367c7fb