import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";
import logo from "./assets/logo.jpg";

import { signOut } from "firebase/auth";
function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [buttonState, setButtonState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  const handleSignOut = () => {
    try {
      setButtonState(true);
      signOut(auth);
    } catch (error) {
      setButtonState(false);
      alert({ error });
    }
  };

  return (
    <div className="mt-52 my-auto mx-auto flex items-center flex-col">
      <div className="flex items-center justify-center mb-5">
        <img className="h-1/2 w-1/2" src={logo} alt="logo" />
      </div>
      <div className="flex font-extrabold flex-col items-center justify-center">
        <div>Hello,</div>
        <div>{user?.email}</div>
      </div>
      <button
        disabled={buttonState}
        className="px-7 py-2 mt-40 text-sm font-small leading-5 text-center text-white rounded-2xl bg-blue-700 "
        href="#"
        onClick={() => handleSignOut()}
      >
        Log Out
      </button>
    </div>
  );
}
export default Dashboard;
