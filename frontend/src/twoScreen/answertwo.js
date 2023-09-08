import React, { useEffect } from 'react'
import Askquestion from '../components/askquestion'
import './twoScreen.css'
import Sidebar from '../components/Sidebar'
import Answer from '../components/answer'
import axios from 'axios'

function AskQuestiontwo() {


  return (
    <div className='twoScreen'>
    <div className='twoScreenSlider'>

        <Sidebar/>
        

    </div>
    <div className='twoScreenother'>
<Answer/>
      
    </div>
</div>
  )
}

export default AskQuestiontwo