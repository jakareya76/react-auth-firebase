import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);

  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const loginedUser = result.user;

        console.log(loginedUser);

        setUser(loginedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        setUser(null);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-20 space-y-2">
      {user && (
        <>
          <h1 className="text-xl font-bold">Hello : {user?.displayName}</h1>
          <h1 className="text-xl font-bold">Email: {user?.email}</h1>
          <img src={user?.photoURL} alt="img" />{" "}
        </>
      )}

      {user ? (
        <button className="btn btn-warning" onClick={handleSignOut}>
          Sign Out
        </button>
      ) : (
        <button className="btn" onClick={handleGoogleSignIn}>
          Login With Google
        </button>
      )}
    </div>
  );
};

export default Home;
