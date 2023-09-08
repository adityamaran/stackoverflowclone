import React from 'react'
import {Link} from "react-router-dom";
import './Nav.css';

function Nav() {

  var usercheck =3;

  return (

    <div className='navbar-main'>
      <nav className='nav-var'>

<Link to='/all-questions' className='nav-logo'>
  <img src="https://i0.wp.com/wptavern.com/wp-content/uploads/2016/07/stack-overflow.png?ssl=1"></img>
</Link>
<Link to="/all-questions" className='nav-btn'>Home</Link>

<Link to="/" className='nav-btn'>About</Link>
<Link to="/" className='nav-btn'>Product</Link>
<form > 
  <input type="text" placeholder="Search..." className='serchbar-nav'></input>
  <span class="material-symbols-outlined material-symbols-outlined2">
search
</span>
</form>

{
  usercheck=== null ?
  <Link to="/user-Authentication" className='nav-auth'>Login</Link>:<div className="logoutcls">
  <span class="material-symbols-outlined material-symbols-outlined1">
account_circle
</span> <button className='nav-auth'>Log out</button></div>
}



</nav>
    </div>
   
  )
}

export default Nav