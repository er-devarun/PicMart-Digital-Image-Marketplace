import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Outlet} from "react-router-dom";
import Navbar from './components/Navbar';
import GsapTransition from './components/GsapTransition';
import {Provider} from "react-redux";
import store from './store/store';
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <>
      <Provider store={store}>
        <Toaster/>
        <Navbar/>
        <GsapTransition/>
      </Provider>
    </>
  )
}

export default App
