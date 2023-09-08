import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import './questions.css';
import Sidebar from './Sidebar';
import ReactHtmlParser from 'react-html-parser'
import axios from 'axios';

function Questions({questioncount}) {

  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get('q');

  const [questionData,setQuestionData] = useState();

   
  let tags = JSON.parse(questioncount.tags[0]);
  console.log(tags);
  // const tags =[];
  
  function truncate(str,n){
    return str?.length>n? str.substr(0,n-1)+"...":str
  }

 
  return (

    <div className='questions'>
    <div className='questions1'>
<h4>0</h4>
<h5>Votes</h5>
<h4>{questionData?.answerDetails?.length}</h4>
<h5>Answers</h5>
    </div>

    <div className='questions2'>

      <Link to ={`/question?q=${questioncount._id}`}>  <h4 className='question-head'>{questioncount?.tittle}</h4></Link>
<div className='ans-headd'>
<h4 className='ans-head'>
  {ReactHtmlParser(truncate(questioncount.body,200))}
  
 </h4>
</div>

 <div className='tag-container'>
 {
  tags.map((_tag)=>(<>
  <div className='question-tag' style={{display:"flex"}}>

    <span className='question-tags' >{_tag}</span>
    
    
    </div></>))

 }
 </div>
 {/* <div className='question-tag'> 
 {
  questioncount.tags.map((_tag)=>(
    <>
     

    

</>
  ))
}
</div> */}
   
<div className='question-details'>
        <h6><span style={{padding:"10px",
    color: "rgb(107, 107, 107)"
  }}>{new Date(questioncount.created_at).toLocaleTimeString()}</span>{new Date(questioncount.created_at).toDateString()} </h6>
        <span class="material-symbols-outlined">
account_circle
</span>
<h5 style={{padding:"10px"}}>{questioncount.user.displayName ? questioncount.user.displayName : String(questioncount.user.email).split('@')[0] }</h5>
    </div>
    </div>

    
   

   </div>
   
  )
}

export default Questions