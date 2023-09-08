import React from 'react';
import Sidebar from './Sidebar';
import Main from './main';
import './indexx.css';

function Indexx() {
  return (
  <div className='indexx'>
   <div className='index-sidebar'>
   <Sidebar/>
   </div>
  <div className='index-main'>
  <Main/>
  </div>
  </div>
  )
}

export default Indexx