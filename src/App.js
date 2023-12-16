import Container from "@mui/material/Container";
import {Routes, Route} from 'react-router-dom'
import { Header} from "./components";
import {Footer} from "./components/Footer/Index"
import { Home, FullPost, Registration, AddPost, Login} from "./pages";
import {ChangeComm} from './pages/ChangeComm'
import {useDispatch, useSelector} from 'react-redux'
import { fetchAuthMe, selectIsAuth } from "./components/redux/slices/auth";
import React from 'react'
/* import { Admin } from "./pages/Admin"; */
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth)
  console.log(`is logged => ${isAuth}`)
  React.useEffect (()=>{
  
   dispatch(fetchAuthMe())
     
  },[])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path ='/' element = { <Home />}/>
          <Route path ='/Games/:id' element = { <FullPost />}/>
          <Route path ='/Games/:id/edit' element = { <AddPost />}/>
          <Route path ='/add-game' element = { <AddPost />}/>
          <Route path ='/login' element = { <Login />}/>
          <Route path ='/register' element = { <Registration />}/>
          <Route path ='/ChangeComm/:id' element = { <ChangeComm />}/>
         {/*  <Route path ='/admin' element = { <Admin />}/> */}
       
        
        </Routes>
      </Container>
      <Footer/>
    </>
  );
  
}

export default App;
