import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import validator from "validator";
import logo from "./assets/logo.jpg";
import cover from "./assets/cover.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const [buttonState, setButtonState] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    user && navigate("/dashboard");
  }, [user, loading]);

  const handleSignin = () => {
    try {
      if (email && password && validator.isEmail(email)) {
        if (password.length < 8) {
          setErrorMessage("Password Should be Greater than 8 Characters");
          setShowAlert(true);
          return;
        }
        setButtonState(true);
        signInWithEmailAndPassword(auth, email, password).catch((error) => {
          setErrorMessage(error.message);
          setShowAlert(true);
          setButtonState(false);
        });
      } else {
        setErrorMessage("Please Enter Valid Credientials and Try Again");
        setShowAlert(true);
        return;
      }
    } catch (error) {
      setButtonState(false);
      setErrorMessage(error.message);
      setShowAlert(true);
    }
  };

  return (
    <>
      <div className="flex items-center min-h-screen bg-gray-50">
        {showAlert && (
          <div
            id="alert-5"
            className="flex p-4 bg-gray-100 rounded-lg dark:bg-gray-700"
            role="alert"
          >
            <div className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              <p>Sorry</p>
              <p>{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setShowAlert(false)}
              className="ml-auto -mx-1.5 -my-1.5 bg-gray-100 text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 inline-flex h-8 w-8 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              data-dismiss-target="#alert-5"
              aria-label="Close"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        )}

        <div className="flex h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
          <div className="flex flex-col-reverse md:flex-row">
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full flex flex-col items-center">
                <div className="flex justify-center">
                  <p className="font-extrabold text-3xl">Login</p>
                </div>
                <div className="flex justify-center mb-16 sm:mt-16">
                  <img src={logo} alt="logo" />
                </div>
                <input
                  type="email"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="w-full mt-5 px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  disabled={buttonState}
                  className="px-7 py-2 mt-16 text-sm font-small leading-5 text-center text-white rounded-2xl bg-blue-700 "
                  href="#"
                  onClick={() => handleSignin()}
                >
                  Submit
                </button>
                <p className="mt-10">
                  Need to Account?{" "}
                  <Link to="/register" className="hover:text-blue-700">
                    Click Here to Register
                  </Link>
                </p>
              </div>
            </div>
            <div className="lg:h-full lg:w-1/2 md:h-full md:w-1/2 sm:h-full sm:w-full sm:mb-36">
              <img className="w-full h-full" src={cover} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
