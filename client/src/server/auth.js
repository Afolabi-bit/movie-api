import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/utils";
import { auth, googleProvider } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useGlobalContext } from "../context";
import Google from "./google.png";
import AOS from "aos";
import "aos/dist/aos.css";

const AuthPage = () => {
  const { newUser, setNewUser, signInData, setSignInData } = useGlobalContext();
  const navigateTo = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 700, offset: 20, once: true });
  }, []);

  const [signInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect to homepage
  const redirect = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigateTo("/");
      }
    });
  };

  // Error alerts
  const showAlert = () => {
    document.getElementById("alert").classList.add("show");
  };

  //
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

  //
  const submitSignInForm = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        signInData.email,
        signInData.password
      );
      setSignInData({ username: "", email: "", password: "" });
      redirect();
    } catch (error) {
      setErrorMessage(error.message);
      showAlert();
    }
  };

  // Used for signup and signin
  const googleAuth = async (e) => {
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
      <div className="logo-wrapper">
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
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="off"
                onChange={(e) =>
                  setSignInData({ ...signInData, email: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setSignInData({ ...signInData, password: e.target.value })
                }
              />
            </div>

            <a href="/#">Forgot password?</a>

            <button id="sign-in" onClick={(e) => submitSignInForm(e)}>
              Sign In
            </button>

            <h3>or</h3>

            <button id="sign-in-with-google" onClick={(e) => googleAuth(e)}>
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
              Sign Up
            </button>

            <h3>or</h3>

            <button id="sign-up-with-google" onClick={(e) => googleAuth(e)}>
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
        ></button>
      </aside>
    </main>
  );
};

export default AuthPage;
