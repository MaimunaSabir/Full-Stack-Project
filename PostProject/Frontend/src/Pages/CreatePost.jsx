import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom' 



const CreatePost = () => {

  
const navigate = useNavigate();


function submitHandler(e) {

    e.preventDefault();
   const formData = new FormData(e.target);

   axios.post("http://localhost:3000/create-post",formData)
     .then((res)=>{
       navigate("/feed")

      })
   .catch((err)=>{
      console.error(err);
    
  });

  
}


  return (
    <div  className='create-Section'>
      <h1>Create Post </h1>

      <form onSubmit={submitHandler}>
        <input type="file" name='image' accept='image/*' />
        <input className='caption' type="text" name='caption' placeholder='Enter Caption' required />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreatePost