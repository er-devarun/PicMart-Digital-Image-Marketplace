import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Outlet, useLocation} from "react-router-dom";
import Navbar from './components/Navbar';
import GsapTransition from './components/GsapTransition';
import {Provider} from "react-redux";
import store from './store/store';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';


function App() {
  const {pathname} = useLocation();
  return (
    <>
      <Provider store={store}>
        <Toaster/>
        <Navbar/>
        <GsapTransition/>
        { pathname === "/" && <Footer/> }
      </Provider>
    </>
  )
}

export default App
