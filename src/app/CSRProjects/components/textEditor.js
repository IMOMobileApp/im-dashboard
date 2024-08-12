"use client"
import {useState} from 'react'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

 
export default function TextEditor(props) {
    const [value, setValue] = useState('<p>hey this is text editor</p>');
   // console.log(value)
 
    return <ReactQuill theme="snow" value={props.item} onChange={setValue}  style={{height:'200px', marginBottom:'100px'}}/>;
}
 