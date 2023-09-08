import React from 'react'
import { Link } from 'react-router-dom';
import './main-top.css';

function Maintop({questioncount}) {
  return (
    <div className='maintop'>
        <div className='maintop1'>
            <div className='maintop1a'>
             <h5>   ALL Questions</h5>
            </div>
            <div className='maintop1b'>
<Link to='../ask-questions'><button> Ask Questions</button></Link>
            </div>
        </div>
        

        <div className='maintop2'>
            <div className='maintop2a'>

             <h4>{ questioncount && questioncount.length} Questions</h4>

            </div>

            <div className='maintop2b'>
            <div className='maintop2aa'>

<h5>Newest</h5> <h5>Active</h5> <h5>More</h5>
                

</div>
<div className='maintop2ab'>
    <h5> Filter </h5>

</div>

</div>

        </div>
    </div>
  )
}

export default Maintop