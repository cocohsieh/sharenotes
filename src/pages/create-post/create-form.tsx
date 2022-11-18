import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
// addDoc: 把加到db
// collection: 檔案要加到哪個collection
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import {useNavigate} from "react-router-dom";

//typescript 設定
interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("Please add a title."),
    description: yup.string().required("Please add content."),
  });

  // use react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts"); //posts是collection

  //用handleSubmit會自動返回data
  const onCreatePost = async (data: CreateFormData) => {
    // console.log(data);
    await addDoc(postsRef, {
    //   title: data.title,
    //   description: data.description
    // 可用spread operator to destructure
    ...data,
      username: user?.displayName,
      userId: user?.uid, //uid -> google用法
    });
    navigate ("/")
  };

  return (
    <>
      <form onSubmit={handleSubmit(onCreatePost)}>
        {/* call the register function, then specify the name of the field that is going to be referenced by this input*/}
        <input placeholder="Title..." {...register("title")} />
        {/* 顯示錯誤訊息 */}
        <p style={{ color: "red" }}> {errors.title?.message} </p>
        <textarea placeholder="Description..." {...register("description")} />
        <p style={{ color: "red" }}> {errors.description?.message} </p>
        <input type="submit" value="submit" />
      </form>
    </>
  );
};



//Yup 檢核工具
// schema
// 對於「資料格式」與「數值」的一種描述架構，
// 透過事先定義schema，就像先訂好規則，
// 然後要求 form 表單的資料要能夠匹配 schema，
// 而 Yup 就是幫助我們整合這兩者的工具之一。

// yup.string()
// yup.number()
// yup.boolean()
// yup.date()
// yup.object()
// yup.array()

//https://ithelp.ithome.com.tw/articles/10298794?sc=iThelpR
