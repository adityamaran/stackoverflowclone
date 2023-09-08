import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import Questions from './questions'
import Maintop from './main-top'

function Questionss() {
  const [questioncount,setQuestioncount]=useState([]);

    
  const showAnswers =async()=>{
    await axios.get('/all-questionss').then((res)=>{
     console.log(res.data)
     setQuestioncount(res.data.reverse());

    }).catch((err)=>{
     console.log(`error in error${err}`);
    })
 
 
   }
   useEffect(()=>{
     showAnswers();
 
   },[])
  return (
   <div className='questionss'>
    <Maintop questioncount={questioncount}/>
   {
    questioncount.map((_q,index)=>(<>
<div className='question-loop' key={index}>
<Questions questioncount ={_q}/>
</div>

     </>))
   }

   </div>
  )
}

export default Questionss