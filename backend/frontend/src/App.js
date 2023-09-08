import './App.css';
import Nav from './components/Nav';
import  {BrowserRouter, Navigate} from "react-router-dom";
import AllRoutes from './components/AllRoutes';
import Auth from './components/Auth';
import {Routes , Route} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Indexx from './components/indexx';
import Maintop from './components/main-top';
import Questions from './components/questions';
import Answer from './components/answer';
import {useSelector} from 'react-redux'
import {logout, selectUser,login} from './features/userSlice'
import {useDispatch} from 'react-redux'
import {auth} from "./components/firebase"
import { redirect } from 'react-router-dom';

import Askquestion from './components/askquestion';
import { Component, useEffect } from 'react';
import TwoScreen from './twoScreen/twoscreen';
import Questionss from './components/questionss';
import AskQuestiontwo from './twoScreen/answertwo';
import AnswerTwoScreen from './twoScreen/answertwoscreen';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
            uid:authUser.uid,
            photo:authUser.photoURL,
            displayName:authUser.displayName,
            email:authUser.email,
          })
        );
      }
      else{
        dispatch(logout());
      }
    })
  },[dispatch]);

     
  const PrivateRoute = ({component:Component, ...rest}) =>{return(
    <Route {...rest} render ={(props) => user ? (<Component {...props}/>): (
    <redirect to={{
      pathname:"/auth",
      state:{
        from :props.loaction,
      }, 
    }}/>
    )}
    />)};
  
  
  
    

  return (
    <div className="App">
   <BrowserRouter>
   <Nav/> 
   <Routes>
    <Route path='/' element={<Auth></Auth>}></Route>
   <Route path='/question' element={<AnswerTwoScreen/>}/>
<Route  path="/ask-questions" element={<Askquestion></Askquestion>}/>
<Route exact path='/all-questions' element={<TwoScreen/>}></Route>
 
 {/* <Route  path="/answer" component={Answer}/> */}
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
