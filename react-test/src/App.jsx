import { useState } from 'react'
import { BrowserRouter as router } from 'react-router-dom';
import './App.css'
import { createContext } from 'react'
import Home from "./home.jsx"

 export const basecontext = createContext({name:"sss",pass:"@@@"})

function App() {
 
  return (
    <>
      <router>
        <basecontext>
          < Home />
        </basecontext>
      </router>
    </>
  )
}

export default App
