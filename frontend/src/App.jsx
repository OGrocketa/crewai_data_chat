import './App.css'

import {Routes, Route } from "react-router-dom";
import Layout from './LAyout';
import MainChatPage from './pages/MainChatPage';
function App() {
  
  return (
    <>
    <Routes>
      <Route path="/*" element={<Layout/>}>
        <Route index element={<MainChatPage user_id= {'mYvT3KjSqRUcfSxP4fN3'}/>}/>
      </Route>
    </Routes>
     
    </>
  )
}

export default App
