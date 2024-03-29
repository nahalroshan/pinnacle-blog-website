import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFormDetails } from "../hooks/formDetails";
import { createContext } from "react";
import BlogListing from "../pages/BlogListing";
import SearchPage from "../pages/SearchPage";
function NavbarMenu() {
  const navigate = useNavigate();
  const [target,setTarget]= useState("")
  const [showAnotherComponent, setShowAnotherComponent] = useState(false);
  const {blog} = getFormDetails();
  const userContext  = createContext()
  const toggleAnotherComponent = () => {
    setShowAnotherComponent(!showAnotherComponent);
  };
  
 
  return (
    <div>
     
      <nav class="bg-slate-100">
        <div class="container mx-auto py-4 flex justify-between items-center">
          <h1 class="bg-gradient-to-r from-slate-400 via-blue-500 to-slate-400 bg-clip-text text-4xl font-extrabold text-transparent sm:text-3xl ">
            PinnacleBlogs
          </h1>
          <div class="flex space-x-10">
            <div class="flex items-center space-x-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </span>
              <button
                onClick={() => {
                  navigate("/");
                }}
                class="text-gray-700 font-semibold"
              >
                Home
              </button>
            </div>
            <div class="flex items-center space-x-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </span>
              <button
                onClick={() => {
                  navigate("/create");
                }}
                class="text-gray-700 font-semibold"
              >
                Create
              </button>
            </div>
            <div class="flex items-center space-x-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </span>
              <button
                onClick={() => {
                  navigate("/listing");
                }}
                class="text-gray-700 font-semibold"
              >
                Blogs
              </button>
            </div>
            <div class="flex items-center space-x-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <button
                onClick={() => {
                  navigate("/about");
                }}
                class="text-gray-700 font-semibold"
              >
                About
              </button>
            </div>
          </div>
          <div class="lg:flex hidden items-center space-x-2 bg-white py-1 px-2 rounded-full">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-600 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={toggleAnotherComponent}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input class="outline-none" onChange={(e)=>{
                    setTarget(e.target.value)
            }} type="text" placeholder="Search" />
             
            
       
          </div>
        </div>
      </nav>
      {showAnotherComponent? navigate('/listing'):null}
      {showAnotherComponent && <BlogListing target={target} />}
    </div>
  );
}

export default NavbarMenu;
