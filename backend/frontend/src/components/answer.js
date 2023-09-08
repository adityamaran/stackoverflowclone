import React from 'react'
import './answer.css';
import axios from 'axios';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser'
import userSlice, { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { async } from '@firebase/util';
import Questions from './questions';

function Answer() {

    const [answer,setAnswer] =useState("");
    
    const  handleQuill = (value)=>{
        setAnswer(value);
    }

    const user = useSelector(selectUser)
    const handleSubmit   =async()=>{
        if(answer!==""){
        const body = {
            question_id:id,
            answer:answer,
            user:user
        }
        await axios.post('/post-answer',body).then((res)=>{
            console.log(res.data)
            alert("Answer Added Successfully")
            setAnswer("");
            window.location.reload();

        }).catch((err)=>{console.log(err)});
    
    } 
    } 

  
    
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get('q');

  const [questionData,setQuestionData] = useState();
const [votes,setVotes] =useState(0);
//    let votes =6;
// let vote =0;
let  vote =0;
   function upvote(){
   

    vote =  vote+1;
   setVotes(vote)

   console.log("working...")
   }
   function downvote(){
   
     vote =vote-1;
   setVotes(vote)

   }

    useEffect(()=>{
        async function getQuestionDetails(){
          axios.get(`${id}`).then((res)=>{
            console.log(res.data[0]);
    
            setQuestionData(res.data[0])
            // console.log(questionData);
          }).catch((err)=>{
            console.log(err)
          })
        }
        getQuestionDetails();
    
      },[])

 
  return (
    


   <div className='answer'>


    <div className='answer1'>
        <div className='answer1a'><h2>{questionData?.tittle}</h2></div>
        <Link to="/ask-question"><div className='answer1b'> <button>Ask-Question</button></div></Link>
    </div>


    <div className='answer2'>
        <h5>{new Date(questionData?.created_at).toLocaleDateString()}</h5>
        <h4>{1+questionData?.answerDetails?.length}<span> Total Answers</span></h4>
        {/* <h5>view<span>23</span> times</h5> */}


    </div>

    <div className='answer3'>
        <div className='answer3a'>
<h4 className='uppp'><span class="material-symbols-outlined" onClick={upvote}>
arrow_drop_up
</span></h4>
<h3 id='fw400'>
    {votes}

</h3>
<h4 className='uppp'><span class="material-symbols-outlined" onClick={downvote}>
arrow_drop_down
</span></h4>
<h4><span class="material-symbols-outlined">
save
</span></h4>
<h4><span class="material-symbols-outlined">
history
</span></h4>
        </div>
        <div className='answer3b'>
            {ReactHtmlParser(questionData?.body)}

            <div className='ans-user'>
                <h4>asked {new Date(questionData?.created_at).toLocaleDateString()}</h4>
                {/* <h5>asked "Timestamp"</h5> */}
                <h4 className='left-padding'> {questionData?.user.displayName ? questionData?.user.displayName : String(questionData?.user.email).split('@')[0] }</h4>
            </div>

            {/* <div className='comment-section'>
                <small>This is comment - user name  timestamp</small>
                <hr></hr>
                <h4>Add a comment </h4>
                <br></br>
                <input className='comment-bar' type="text" placeholder='Add you Comment ...'></input>

<button>Comment</button>
            </div> */}

    <hr></hr>
    <div className='answer4-main'>
    
        
{
    questionData?.answerDetails.map((_q)=>(

        
<div className='answer4' key = {_q?._id}>
    <div className='answer4a'>
    {/* <h4 className='uppp'><span class="material-symbols-outlined">
arrow_drop_up
</span></h4> */}
{/* <h3 className='fw400'>
    0

</h3>
<h4 className='uppp'><span class="material-symbols-outlined">
arrow_drop_down
</span></h4>
<h4><span class="material-symbols-outlined">
save
</span></h4> */}
{/* <h5><smalll>No.of Ans. </smalll>{questionData?.answerDetails?.length}</h5> */}
    </div>

    <div className='answer4b'>
       {ReactHtmlParser(_q?.answer)}


        <div className='ans-user'>
                <h5>answered on "{new Date(_q?.created_at).toLocaleDateString()} "</h5>
                {/* <h5>asked "Timestamp"</h5> */}
                <h5> {_q?.user.displayName ? _q?.user.displayName : String(_q?.user.email).split('@')[0] }</h5>
            </div>
    </div>
</div>

    ))
}

    </div>
<hr>
</hr> 

<div className='answer5'>
    <h3>Your Answer</h3>
    <ReactQuill value={answer} 
    onChange={handleQuill}
    className='reactquill1'/>

    <button type='submit' onClick={handleSubmit}>Post Your Answer</button>

</div>


        </div>

    </div>



    
   </div>
  )
}

export default Answer