import React, { useEffect, useState } from "react";
import diary from "../images/diary.png";
import { addForm } from "../hooks/addDetails";
import { storage } from "../config/firebase-config";
import Swal from "sweetalert2";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useGetUserInfo } from "../hooks/getUser";
import { useNavigate } from "react-router-dom";
function BlogCreationForm() {
  const [heading, setHeading] = useState("");
  const [theme, setTheme] = useState("");
  const [subheading, setSubHeading] = useState("");
  const [content, setContent] = useState("");
  const [time, setTime] = useState(0);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { name, photoUrl, userId, isAuth } = useGetUserInfo();
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState("");
  const { createForm } = addForm();
  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      if (image == null) {
        alert("Error");
        return;
      }

      setIsLoading(true); // Set loading state

      const imageRef = ref(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(snapshot.ref);

      setImageUrl(url); // Set imageUrl here
      alert("Image uploaded");
      console.log(url); // Use url directly here
    } catch (error) {
      console.error("Error uploading image: ", error);
    } finally {
      setIsLoading(false); // Clear loading state
    }
  };

  const handleEvent = (e) => {
    e.preventDefault();
    createForm({
      theme,
      heading,
      subheading,
      content,
      time,
      imageUrl,
      name,
      photoUrl,
    });
    alert("Form Created Successfully");
    const navigate = useNavigate();
    navigate("/listing");
    setHeading("");
    setTheme("");
    setContent("");
    setSubHeading("");
    setTime(0);
  };

  if (isAuth) {
    return (
      <>
        <div>
          <h1 class="md:font-serif md:ml-20  md:w-96 text-6xl font-bold"></h1>
          <div class="w-full max-w-xs">
            <div class="flex flex-row md:ml-44 w-full">
              <h1 class="md:font-serif md:ml-20 md:mt-40 md:w-96 text-6xl font-bold">
                Curate your digital diary with <br></br>
                <h1 class="md:font-serif text-red-400  md:w-96 text-7xl font-bold">
                  Pinnacle
                </h1>
              </h1>
              <img class="md:ml-44 md:mt-24 md:h-96" src={diary}></img>
            </div>
            <div class="w-full flex flex-col justify-center items-center md:mt-28 md:ml-96">
              <h1 class="md:text-6xl md:font-serif md:ml-40 md:w-full">
                Create Your Blog Here
              </h1>
              <form
                onSubmit={handleEvent}
                class="bg-white md:ml-40 md:mt-4 md:w-max  shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Theme
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Theme"
                    onChange={(e) => {
                      setTheme(e.target.value);
                    }}
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Heading
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Heading"
                    onChange={(e) => {
                      setHeading(e.target.value);
                    }}
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Sub Heading
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Sub Heading"
                    onChange={(e) => {
                      setSubHeading(e.target.value);
                    }}
                  />
                </div>

                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Time
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Time"
                    onChange={(e) => {
                      setTime(e.target.value);
                    }}
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Content
                  </label>
                </div>
                <form onSubmit={handleEvent} class="w-96">
                  <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-100 dark:border-gray-100">
                    <div class="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                      <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                        <div class="flex items-center space-x-1 sm:pr-4">
                          <button
                            type="button"
                            class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              class="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 12 20"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                              />
                            </svg>
                            <span class="sr-only">Attach file</span>
                          </button>

                          <button
                            type="button"
                            class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              class="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 20"
                            >
                              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                              <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
                            </svg>
                            <span class="sr-only">Format code</span>
                          </button>
                          <button
                            type="button"
                            class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              class="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z" />
                            </svg>
                            <span class="sr-only">Add emoji</span>
                          </button>
                        </div>
                        <div class="flex flex-wrap items-center space-x-1 sm:pl-4"></div>
                      </div>
                    </div>
                    <div class="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-200 text-zinc-800">
                      <label for="editor" class="sr-only">
                        Publish post
                      </label>
                      <textarea
                        id="editor"
                        rows="8"
                        class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-200 focus:ring-0  dark:placeholder-gray-400"
                        placeholder="Write an article..."
                        onChange={(e) => {
                          setContent(e.target.value);
                        }}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 "
                    for="file_input"
                  >
                    Upload file
                  </label>
                  <input
                    class="m-4 block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
                    id="file_input"
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                  {isLoading ? (
                    <div className="loading-widget">Loading...</div>
                  ) : (
                    <>
                      <div class="flex flex-col">
                        <button
                          type="submit"
                          onClick={uploadImage}
                          class="inline-flex items-center w-24 md:ml-40 px-5 py-2.5 text-sm font-medium text-center text-white bg-green-400 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-100 hover:bg-blue-100"
                        >
                          Upload
                        </button>
                        <button
                          type="submit"
                          onClick={handleEvent}
                          class="inline-flex mt-4 items-center md:ml-32 w-40 md:px-9 py-2.5 text-sm font-medium text-center text-white bg-blue-400 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                          Publish post
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </form>
            </div>

            <p class="text-center text-gray-500 text-xs"></p>
          </div>
        </div>
      </>
    );
  }
  else
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

export default BlogCreationForm;
