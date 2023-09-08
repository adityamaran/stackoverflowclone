import React from 'react'
import './twoScreen.css'
import Sidebar from '../components/Sidebar'
import Answer from '../components/answer'

function AnswerTwoScreen() {
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

export default AnswerTwoScreen