import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/utils";
import { auth, googleProvider } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useGlobalContext } from "../context";
import Google from "./google.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { MdCancelPresentation } from "react-icons/md";

const AuthPage = () => {
  const { newUser, setNewUser } = useGlobalContext();
  const navigateTo = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 700, offset: 20, once: true });
  }, []);

  const [signInForm, setSignInForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const redirect = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigateTo("/");
      }
    });
  };

  const showAlert = () => {
    document.getElementById("alert").classList.add("show");
  };

  const submitSignUpForm = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      setNewUser({ username: "", email: "", password: "" });
      redirect();
    } catch (error) {
      setErrorMessage(error.message);
      showAlert();
    }
  };

  const googleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signInWithPopup(auth, googleProvider);
      redirect();
    } catch (error) {
      setErrorMessage(error.message);
      showAlert();
    }
  };

  return (
    <main className="auth-page">
      <div className="logo-wrapper" data-aos="fade-down">
        <Logo />
      </div>

      <form data-aos="zoom-in">
        {signInForm && (
          <div>
            <h2>Sign In</h2>
            <p>
              Enjoy access to a personalized stream of new movie trailers. Need
              an account?{" "}
              <button
                className="toggle-form"
                onClick={() => setSignInForm(false)}
              >
                Sign Up
              </button>
            </p>
            <div className="form-control">
              <input id="email" type="email" placeholder="Enter your email" />
            </div>

            <div className="form-control">
              <input id="password" type="password" placeholder="Password" />
            </div>

            <div className="links">
              <button>Forgot password?</button>
            </div>

            <button id="sign-in">Sign In</button>

            <h3>or</h3>

            <button id="sign-in-with-google">
              <img src={Google} alt="google logo" className="google-img" />
              Sign In With Google
            </button>
          </div>
        )}
        {!signInForm && (
          <div>
            <h2>Sign Up</h2>
            <p>
              Enjoy access to a personalized stream of new movie trailers.
              Already have an account?{" "}
              <button
                className="toggle-form"
                onClick={() => setSignInForm(true)}
              >
                Sign In
              </button>
            </p>
            <div className="form-control">
              <input
                id="firstname"
                type="text"
                placeholder="Enter your username"
                autoComplete="off"
                // value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="off"
                // value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <input
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="off"
                // value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>

            <button id="sign-in" onClick={(e) => submitSignUpForm(e)}>
              Sign In
            </button>

            <h3>or</h3>

            <button id="sign-up-with-google" onClick={(e) => googleSignUp(e)}>
              <img src={Google} alt="google logo" className="google-img" />
              Sign Up With Google
            </button>
          </div>
        )}
      </form>

      <aside className="alert" id="alert">
        <p>{errorMessage.substring(9)}</p>
        <button
          onClick={() => {
            document.getElementById("alert").classList.remove("show");
          }}
        >
          <MdCancelPresentation />
        </button>
      </aside>
    </main>
  );
};

export default AuthPage;
