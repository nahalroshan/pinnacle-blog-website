import { getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { provider, auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    const authInfo = {
      userId: result.user.uid,
      name: result.user.displayName,
      photoUrl: result.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/listing");
  };

  return (
    <>
      <div>
        <section class="bg-slate-100 text-white">
          <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div class="mx-auto max-w-3xl text-center">
              <h1 class=" h-36 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-6xl">
              Discover the World 
                <span class="sm:block"> Through Our Blogs</span>
              </h1>

              <p class="mx-auto mt-4 text-gray-900 font-sans max-w-xl sm:text-xl/relaxed">
              "Explore, Learn, and Inspire"
              </p>

              <div class="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  class="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                 
                  onClick={signInWithGoogle}
                >
                 Sign In
                </button>

                <a
                  class="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-gray-700 hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                  href="/about"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
        
       
      </div>
    </>
  );
}

export default LoginPage;
