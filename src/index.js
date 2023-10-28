import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Contact from './Components/Contact';
import About from './Components/About';
import Menu from './Components/Menu';
import Login from './Components/Loginpage/Login';
import NewProduct from './Components/Loginpage/NewProduct';
import SignUp from './Components/Loginpage/SignUp';

import { Provider } from 'react-redux';
import { store } from './Redux/index';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path='Menu/:filterby' element={<Menu/>}/>
      <Route path='About' element={<About/>}/>
      <Route path='Contact'element={<Contact/>}/>  
      <Route path='Login'element={<Login/>}/> 
      <Route path='NewProduct'element={<NewProduct/>}/> 
      <Route path='SignUp'element={<SignUp/>}/> 
    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
 )

