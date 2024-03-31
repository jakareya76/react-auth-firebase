import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { auth } from "../firebase/firebase.config";

const SignUp = () => {
  const [signUpError, setSignUpError] = useState("");
  const [showTogglePassword, setShowTogglePassword] = useState(false);

  // handle sign up
  const handleSignUp = async (e) => {
    e.preventDefault();

    setSignUpError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 8) {
      setSignUpError("Password should be at least 6 characters");
      return;
    }

    // create user
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      console.log(res);
      setSignUpError("user craeted successfully");

      e.target.email.value = "";
      e.target.password.value = "";
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setSignUpError("Email Already In use");
      }
    }
  };

  return (
    <div className="flex items-center justify-center my-10">
      <form onSubmit={handleSignUp} className="grid gap-3 max-w-[600px]">
        <label className="flex items-center gap-2 input input-bordered">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            name="email"
            className="grow"
            placeholder="Email"
            required
          />
        </label>

        <label className="flex items-center gap-2 input input-bordered">
          <div
            onClick={() => setShowTogglePassword(!showTogglePassword)}
            className="cursor-pointer"
          >
            {showTogglePassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
          <input
            type={showTogglePassword ? "text" : "password"}
            name="password"
            className="grow"
            placeholder="Password"
            required
          />
        </label>
        <button className="btn btn-primary">Sign Up</button>
        <p className="text-red-500">{signUpError}</p>
      </form>
    </div>
  );
};

export default SignUp;
