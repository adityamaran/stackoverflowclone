import React from 'react'
import './twoScreen.css'
import axios  from 'axios'
import { useEffect } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { Route, Routes} from 'react-router-dom'
import  Sidebar from '../components/Sidebar'
import Askquestion from '../components/askquestion'
import Questionss from '../components/questionss'
import { useState } from 'react'



function TwoScreen() {


// const [questioncount,setQuestioncount] =([]);

  
    
//   const showAnswers =async()=>{
//     await axios.get('/all-questions').then((res)=>{
//      console.log(res.data)
//      setQuestioncount(res.data.reverse());
    
//     }).catch((err)=>{
//      console.log(err);
//     })
 
 
//    }
//    useEffect(()=>{
//      showAnswers();
 
//    },[])

  return (
    <div className='twoScreen'>
        <div className='twoScreenSlider'>

            <Sidebar/>
            

        </div>
        <div className='twoScreenother'>

            <Questionss/>
        </div>
    </div>
  )
}

export default TwoScreen