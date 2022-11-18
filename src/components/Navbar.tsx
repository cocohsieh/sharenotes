import { Link } from "react-router-dom";
import "./Navbar.css";
// auth裡有各種user資料
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  //  useAuthState會立即更新登入的user資訊
  const [user] = useAuthState(auth);

  // signOut firebase的登出功能
  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar-container">
      <Link to="/" className="link-margin">
        Home
      </Link>
      {/* 如果登入->顯示發表貼文;尚未登入->顯示login */}
      {!user ? (
        <Link to="/login" className="link-margin">
          Login
        </Link>
      ) : (
        <Link to="/createpost" className="link-margin">
          Create post
        </Link>
      )}

      {user && ( //有user的話才display user info
        <div className="userInfo link-margin">
          {/* 加問號：如果有currentUser的話->displayName */}
          {/* <p>{auth.currentUser?.displayName}</p> */}
          {/* <img src={auth.currentUser?.photoURL || ""} width="100" height="100" /> */}
          {/* 如果沒有照片url的話->url為空字串 */}

          {/* 改用react-firebase-hooks */}

          <div>
            <p>{user?.displayName}</p>
          </div>
          <div className="userImg">
            <img src={user?.photoURL || ""} width="100" height="100" />
          </div>
          <button onClick={signUserOut}>Log out</button>
        </div>
      )}
    </div>
  );
};
