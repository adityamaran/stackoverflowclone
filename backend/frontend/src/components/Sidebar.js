import React from 'react'
import './sidebar.css';
// import StarsIcon from '@mui/icons-material/Stars';
// import WorkIcon from '@mui/icons-material/Work';

// import PublicIcon from '@mui/icons-material/Public';
function Sidebar() {
  return (
   <div className='sidebar-main'>
    <h4>Home</h4>
    <h4>Public</h4>
    <h5>Questions</h5>
    {/* <PublicIcon/> */}
    <h5>Tags</h5>
    <h5>Users</h5>
    <h4>Collectivs</h4>
    <h5>Explore Collectives</h5>
    {/* <StarsIcon/> */}
    <h4>Find A Job</h4>
    {/* <WorkIcon/> */}
    <h5>Jobs</h5>
    <h5>Compaies</h5>
   </div>
  )
}

export default Sidebar