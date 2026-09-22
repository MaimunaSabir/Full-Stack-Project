import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import CreatePost from './Pages/CreatePost'
import Feed from './Pages/Feed'

const App = () => {
  return (

  <BrowserRouter>
      <Routes>
        <Route path='create-post' element={<CreatePost/>} />
        <Route path='feed' element={<Feed/>} />
      </Routes>
  
  
  </BrowserRouter> 




  )
}

export default App