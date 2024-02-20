import React from 'react'
//import {name,photoUrl,userId,isAuth} from '../hooks/getUser.jsx'
import Navbar from '../components/Navbar.jsx'
import BlogCreationForm from '../components/BlogCreationForm.jsx'







function CreateBlog() {
  return (
    <>
    <div class="w-full bg-slate-100">
        
        <BlogCreationForm />
    </div>
    </>
  )
}

export default CreateBlog