import React, { useContext, useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(GlobalContext);
  const [errorMsg, setErrorMsg] = useState("");
  const uri = "https://expense-tracker-backend-rlia.onrender.com";

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length < 8) {
      setErrorMsg("Username Must be 8 Characters Long");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Password Must be 8 Characters Long");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        uri + "/users/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );
      if (response) {
        setLoading(false);
        console.log(response);
        setUser(username);
        navigate("/tracker/" + username);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300">
      {loading ? (
        <div className="z-10">
          <TailSpin height={50} width={50} color="blue" />
        </div>
      ) : (
        <div className="h-auto w-[310px] md:w-[400px] felx justify-center items-center rounded-md shadow-lg bg-white p-9">
          <h1 className="text-xl font-bold pb-3">Welcome Back!</h1>
          <form>
            <div className="flex justify-start gap-1 flex-col">
              {errorMsg.length > 0 && (
                <span className="text-red-500 text-sm">{errorMsg}</span>
              )}
              <label htmlFor="username">
                Username
                <span className="text-xs text-gray-400">*Min 8 Characters</span>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="outline-none rounded-sm px-4 py-2 bg-gray-200"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                name="username"
                autoComplete="off"
              />
              <label htmlFor="password">
                Password
                <span className="text-xs text-gray-400">*Min 8 Characters</span>
              </label>
              <input
                type="email"
                placeholder="Enter Password"
                className="outline-none rounded-sm px-4 py-2 bg-gray-200"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                autoComplete="off"
              />
              <button
                className="bg-blue-500 text-white py-1 md:py-2 mt-4 rounded-sm"
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </button>
              <span className="text-center text-sm">
                Don't have a Account?{" "}
                <Link className="text-blue-600" to={"/users/sign-up"}>
                  Sign Up Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginComponent;
