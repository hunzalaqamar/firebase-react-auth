import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase-config";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.jpg";
import cover from "./assets/cover.jpg";

function Register() {
  const registerWithEmailAndPassword = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email,
        password,
      });
    } catch (err) {
      setButtonState(false);
      alert(err.message);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const [buttonState, setButtonState] = useState(false);

  const navigate = useNavigate();
  const register = () => {
    try {
      setButtonState(true);
      registerWithEmailAndPassword(email, password);
    } catch (error) {
      setButtonState(false);
      alert(error.message);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <>
      <div className="flex items-center min-h-screen bg-gray-50">
        <div className="flex h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
          <div className="flex flex-col-reverse md:flex-row">
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full flex flex-col items-center">
                <div className="flex justify-center">
                  <p className="font-extrabold text-3xl">Register</p>
                </div>
                <div className="flex justify-center mb-10 sm:mt-16">
                  <img src={logo} alt="logo" />
                </div>
                <input
                  type="email"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full mt-5 px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  disabled={buttonState}
                  className="px-7 py-2 mt-16 text-sm font-small leading-5 text-center text-white rounded-2xl bg-blue-700 "
                  href="#"
                  onClick={() => register()}
                >
                  Submit
                </button>
                <p className="mt-10">
                  Already a User?{" "}
                  <Link to="/" className="hover:text-blue-700">
                    Login Here
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

    // <div className="register">
    //   <div className="register__container">
    //     <input
    //       type="text"
    //       className="register__textBox"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //       placeholder="Full Name"
    //     />
    //     <input
    //       type="text"
    //       className="register__textBox"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="E-mail Address"
    //     />
    //     <input
    //       type="password"
    //       className="register__textBox"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //     />
    //     <button className="register__btn" onClick={register}>
    //       Register
    //     </button>
    //     <div>
    //       Already have an account? <Link to="/">Login</Link> now.
    //     </div>
    //   </div>
    // </div>
  );
}
export default Register;
