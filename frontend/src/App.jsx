import './App.css'
import { Chat } from './components/Chat'
import {Routes, Route } from "react-router-dom";
import Layout from './LAyout';
function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Chat/>}/>
      </Route>
    </Routes>
     
    </>
  )
}

export default App
