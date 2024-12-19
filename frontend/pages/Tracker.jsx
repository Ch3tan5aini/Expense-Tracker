import React, { useContext, useEffect, useState } from "react";
import Main from "../src/components/main/Main";
import axios from "axios";
import { GlobalContext } from "../src/context/globalContext";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Tracker = () => {
  const [loading, setLoading] = useState(false);
  const { setUser, setUserData } = useContext(GlobalContext);
  const navigate = useNavigate();
  const uri = "http://localhost:4000";

  async function getUserData() {
    try {
      setLoading(true);
      // fetching current user
      const result = await axios.get(uri, {
        withCredentials: true,
      });

      if (!result) {
        navigate("/");
      }
      setUser(result.data.username);

      //fetching current user data
      const response = await axios.get(
        uri + "/transactions/" + result.data.username,
        { withCredentials: true }
      );
      if (response) {
        setUserData(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="z-10 flex justify-center items-center h-screen">
          <TailSpin height={50} width={50} color="blue" />
        </div>
      ) : (
        <div>
          <Main fetchUserData={getUserData} />
        </div>
      )}
    </div>
  );
};

export default Tracker;