import React from "react";
import { db } from "../config/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useGetUserInfo } from "./getUser";

export const addForm = () => {
  const { userId } = useGetUserInfo();
  const blogCollectionRef = collection(db, "blog");

  const createForm = async ({ theme, heading, subheading, content, time,imageUrl,name,photoUrl }) => {
    await addDoc(blogCollectionRef, {
      userId,
      theme,
      heading,
      subheading,
      content,
      time,
      imageUrl,
      createdTime:serverTimestamp(),
      name,
      photoUrl
    });
  };
  return {createForm};
};
