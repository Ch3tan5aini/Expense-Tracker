import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../src/context/globalContext";
import { TailSpin } from "react-loader-spinner";
import HomeComponent from "../src/components/home/HomeComponent";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(GlobalContext);
  const uri = "https://expense-tracker-backend-rlia.onrender.com";

  async function checkCookie() {
    try {
      setLoading(true);
      const response = await axios.get(uri, {
        withCredentials: true,
      });
      if (!response) return;
      setUser(response.data.username);
      navigate("/tracker/" + response.data.username);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    checkCookie();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="z-10 flex justify-center items-center h-screen">
          <TailSpin height={50} width={50} color="blue" />
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <HomeComponent />
        </div>
      )}
    </div>
  );
};

export default Home;
