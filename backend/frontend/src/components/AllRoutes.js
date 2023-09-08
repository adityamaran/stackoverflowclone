import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Home from './Home';
import Auth from './Auth';


function AllRoutes() {
  return (
   <Routes>
<Route exact path ="/" component ={Home} ></Route>   
<Route exact path='/auth' component={Auth}></Route>

</Routes>
  )
}

export default AllRoutes