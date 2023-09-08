import React, { useEffect } from 'react'
import './askquestion.css'
import axios from 'axios';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import { TagsInput } from "react-tag-input-component";
import TagsInput from 'react-tagsinput';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

function Askquestion() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const user = useSelector(selectUser) 
  const [tittle,setTittle] =useState("");
  const [body,setBody] = useState("");
  const [tags,setTags] = useState([]);
 
  console.log (tittle ,body ,tags);
    const handleChange = value => {
      setTags(value);
    }
    const handlequill =(value) =>{
      setBody(value); 
    }
    const handletags = (value) =>{
      setTags(value);
    }
   
    const handleAskQuestion = async(e)=>{
      // console.log("clicked")
      e.preventDefault();
      if(tittle!=="" && body !==""){
setLoading(true);
        const bodyJSON = {
          tittle :tittle,
          body :body,
          tags:JSON.stringify(tags),
          user:user
        }

        // const bodyy = JSON.stringify(bodyJSON);
        await axios.post('/api/question',bodyJSON).then((res)=>{
          alert("Question Added SuccessFully !")
          setLoading(false)
          navigate('/all-questions')
          // window.location.reload();
        }).catch((err)=>{
          console.log(err)
          setLoading(false)


        })
      }


    }

   
  return (
   <div className='askquestion'>
    <div className='askquestion1'>
        <h2>Ask a Public Question</h2>
        <h4>Tittle</h4>
        <small>Be Specific and imagine you're asking a question to another person</small><br></br>
        <input type={'text'}  value={tittle} onChange={(e)=>setTittle(e.target.value)} className ="ans.ask" placeholder="e.g - How to Create Function in Java Script"></input>

        <h4>Body</h4>
        <small>Be Specific and imagine you're asking a question to person</small>
        <ReactQuill value={body} onChange={handlequill} className='reactquill'/>
        <h4 className='tagscl'>Tags</h4>
        <small>Add upto 5  tags to descripbe what yout question is about</small>
        <TagsInput value={tags} onChange={handletags}
       inputProps={{
        placeholder: 'Press Enter To Add a New Tag'
      }}
        className='tag-box react-tagsinput'
        maxTags={10}
      />
        <button  disabled={loading} type='submit' onClick={handleAskQuestion}>{
          loading?"Adding Question ...":"Ask Your Question"
        }</button>
     </div>
   </div>
  )
}

export default Askquestion