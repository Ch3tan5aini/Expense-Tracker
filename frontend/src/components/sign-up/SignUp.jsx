import React, { useContext, useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";

const SignUpComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(GlobalContext);
  const [errorMsg, setErrorMsg] = useState("");
  const uri = "http://localhost:4000";

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length < 8 || email.length === 0 || password.length < 0) {
      setErrorMsg("Please Enter All The Details");
      return;
    }
    if (!email.includes("@")) {
      setErrorMsg("Please Give Correct Email");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        uri + "/users/sign-in",
        {
          username: username,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (response) {
        setLoading(false);
        console.log(response.response);
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
          <h1 className="text-xl font-bold pb-3">Create New Account</h1>
          <form>
            <div className="flex justify-start gap-1 flex-col">
              {errorMsg.length > 0 && (
                <span className="text-red-500 text-sm">{errorMsg}</span>
              )}
              <label htmlFor="username">
                Username{" "}
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="You@example.com"
                className="outline-none rounded-sm px-4 py-2 bg-gray-200"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
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
                Sign In
              </button>
              <span className="text-center text-sm">
                Already have a Account?{" "}
                <Link className="text-blue-600" to={"/users/login"}>
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUpComponent;