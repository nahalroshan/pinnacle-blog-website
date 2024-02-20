import React from "react";
import Navbar from "../components/Navbar";
import img from "../images/Blogify.png";
import { getFormDetails } from "../hooks/formDetails";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "../hooks/getUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function BlogListing({ target }) {
  const { blog, deleteBlog } = getFormDetails();
  const navigate = useNavigate();
  //const {target}=props
  console.log(target);
  const { name, photoUrl, userId, isAuth } = useGetUserInfo();
  //const deleteFunction = async(id)=>{
  //  const res=doc(db,"blog",id);
  // await deleteDoc(res)
  //  alert("Successfully Deleted")

  // }

  const deleteFunction = (id) => {
    deleteBlog(id);
  };
  console.log(blog);

  if (isAuth) {
    return (
      <>
        <div class="flex flex-col md:m-20 items-center justify-center text-6xl font-serif ">
          <h1>Blogs</h1>
          {blog
            .filter((data) => {
              if (!target || target === "") {
                return true; // Show all items if target is undefined or empty
              } else if (
                data.heading &&
                data.heading.toLowerCase().includes(target.toLowerCase())
              ) {
                return true; // Filter based on target
              }
              return false; // Exclude items that don't match the filter criteria
            })
            .map((data, index) => {
              return (
                <div class="flex flex-col justify-center md:h-96 h-screen">
                  <div
                    key={index}
                    class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white"
                  >
                    <div class="w-full md:w-1/3 bg-white grid place-items-center">
                      <img
                        src={data.imageUrl}
                        alt="tailwind logo"
                        class="rounded-xl"
                      />
                    </div>
                    <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                      <div class="flex justify-between item-center">
                        <p class="text-gray-600 text-5xl font-medium hidden md:block">
                          {data.heading}
                        </p>

                        <div class="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-pink-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <h3 class="font-black text-gray-800 md:text-2xl text-xl">
                        {data.subheading}
                      </h3>
                      <h3 class="font-black text-gray-500 md:text-md text-xl">
                        Theme:{data.theme}
                      </h3>
                      <p class="md:text-lg text-gray-500 text-base">
                        {data.content}
                      </p>
                      <div class="md:flex md:flex-row ">
                        <button
                          type="button"
                          class="text-white bg-green-500 md:w-20 md:m-2 hover:bg-green-800 focus:outline-none md:ml-4 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                          <a href={`/full-content/${data.id}`}>Full content</a>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteFunction(data.id)}
                          class="text-white bg-red-500 md:w-20 md:m-2 hover:bg-red-800 focus:outline-none md:ml-4 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                          Delete
                        </button>
                      </div>

                      <p class="flex flex-row  justify-end text-xs font-black text-gray-800">
                        <img
                          class="w-5 h-5 md:mr-1 rounded-full"
                          src={data.photoUrl}
                          alt="Rounded avatar"
                        />
                        {data.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  } else {
    Swal.fire({
      title: 'You are not logged in',
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: 'Sign In',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       
        navigate('/')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}

export default BlogListing;
