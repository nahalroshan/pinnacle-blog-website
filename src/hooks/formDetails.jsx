import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./getUser";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  QueryOrderByConstraint,
  getDocs,
} from "firebase/firestore";
export const getFormDetails = () => {
    const navigate = useNavigate()
  const { name, photoUrl, userId, isAuth } = useGetUserInfo();
  const [blog, setBlog] = useState([]);
  const blogCollectionRef = collection(db, "blog");
  const getDetails = async () => {
    try {
      const queryForm = query(
        blogCollectionRef,
        orderBy("createdTime", "desc")
      );
      const querySnapshot = await getDocs(queryForm);
      let docs = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        docs.push({ ...data, id });
      });
      setBlog(docs);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      // Optimistically remove the card from the UI
      setBlog((prevBlog) => prevBlog.filter((post) => post.id !== id));
  
      const blogRef = doc(db, "blog", id);
      await deleteDoc(blogRef);
  
      alert("Successfully Deleted");
      if(blog.length===0)
      {
        alert("No Blogs Available");
        navigate("/create")

      }
      else
      {
        alert("error")
      }
    } catch (error) {
      console.error("Error deleting blog post: ", error);
      // Handle the error and potentially revert the UI change
      // E.g., by fetching the data again and updating the state
      // setBlog(initialData);
    }
  };
  
  //const deleteFunction = async (id) => {
   // try {
   //   const blogRef = doc(db, "blog", id);
  //    await deleteDoc(blogRef);

      // Update the state to remove the deleted blog post
  //    setBlog((prevBlog) => prevBlog.filter((post) => post.id !== id));

      //alert("Successfully Deleted");
   // } catch (error) {
    ////  console.error("Error deleting blog post: ", error);
   // }

  useEffect(() => {
    getDetails();
  }, []);
  return { blog ,deleteBlog };
};

