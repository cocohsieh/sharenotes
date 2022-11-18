import { getDocs, collection, doc } from "firebase/firestore";
//getDocs -> 從firebase取得資料, get multiple docs
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./Post";

export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  // state -> keep track of data we get back
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts"); // which collection to be referenced

  //取得貼文
  const getPosts = async () => {
    const data = await getDocs(postsRef);
    //destructure data to get specific data
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //會取得array
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
    //cast it to be Post[] type
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {postsList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

// react query:
// use when don't have control of backend
