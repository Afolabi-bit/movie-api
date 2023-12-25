import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/utils";
import { FaGoogle } from "react-icons/fa6";
import { auth, googleProvider } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);

  const navigateTo = useNavigate();

  useEffect(() => {
    document.getElementById("alert").classList.add("show");

    const removeAlert = setTimeout(() => {
      document.getElementById("alert").classList.remove("show");
    }, 3000);

    return clearTimeout(removeAlert);
  }, [error]);

  useEffect(() => {
    if (auth?.currentUser?.email) {
      navigateTo("/");
    }
  }, [loggedIn]);

  const submitSigninForm = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoggedIn(!loggedIn);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  };

  const signinWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      setLoggedIn(!loggedIn);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <main className="auth-page">
      <div className="logo-wrapper" data-aos="fade-down">
        <Logo />
      </div>

      <form>
        <h2>Sign In</h2>
        <p>Enjoy access to a personalized stream of new movie trailers</p>
        <div className="form-control">
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-control">
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <a href="#">Forgot password?</a>

        <button id="sign-in" onClick={(e) => submitSigninForm(e)}>
          Sign In
        </button>

        <h3>or</h3>

        <button id="sign-in-with-google" onClick={(e) => signinWithGoogle(e)}>
          <FaGoogle />
          {/* <img src="google.png" alt="google logo" /> */}
          Sign In With Google
        </button>
      </form>

      <aside className="alert" id="alert">
        <p>{error.substring(9)}</p>
      </aside>
    </main>
  );
};

export default AuthPage;
