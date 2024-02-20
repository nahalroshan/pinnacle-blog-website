import React, { useEffect } from "react";
import { useGetUserInfo } from "../hooks/getUser";
import { getFormDetails } from "../hooks/personalPosts";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
function AboutSection() {
  const navigate = useNavigate();

  const { name, photoUrl, userId, isAuth } = useGetUserInfo();
  const { blog, deleteBlog } = getFormDetails();
  const deleteFunction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const popUpLogout = () => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,

      position: "top",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await signOut(auth);
          localStorage.clear();
          Swal.fire("Success");
        } catch (error) {
          console.log(error);
        } finally {
          navigate("/");
        }
      }
    });
  };
  if (isAuth) {
    return (
      <>
        <div class="flex items-center md:ml-40 justify-end">
          <div class="relative flex  w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
            <div class="relative  md:ml-28 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pt-0 pb-8 text-gray-700 shadow-none">
              <img
                src={photoUrl}
                alt="tania andrew"
                class="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
              />
              <div class="flex w-full flex-col gap-0.5">
                <div class="flex items-center justify-between">
                  <h5 class="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {name}
                  </h5>
                </div>
                <p class="block font-sans text-base font-light leading-relaxed text-blue-gray-900 antialiased">
                  Blog Account @ Pinnacle
                </p>
                <button onClick={popUpLogout}>Logout</button>
              </div>
            </div>
            <div class="mb-6 p-0"></div>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center text-6xl font-serif ">
          <h1>Your Posts</h1>
          {blog.map((data, index) => {
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
                        <a href={`/update/${data.id}`}>Update</a>
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
  }else
  {
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

export default AboutSection;
