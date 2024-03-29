import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Verifyemail() {
  const params = useParams();

  const tokenVerify = async () => {
    try {
      console.log(params.token);
      const res = await axios.post("/auth/verify-email", {
        token: params.token,
      });
      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
      setTimeout(() => {
        window.close();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    tokenVerify();
  }, []);
  return (
    <div className="mx-auto">
      <Link className="btn btn-dark" to="/login">
        Go to Login Page
      </Link>
      <br />
      <img
        src="https://img.freepik.com/free-vector/new-message-concept-illustration_114360-666.jpg?w=996&t=st=1656181232~exp=1656181832~hmac=a4c29d65ac4e69611467c0c4f6f1a9a899d6aa2e78afe98d277eaf45b3e95831"
        alt=""
      />
      <ToastContainer />
    </div>
  );
}

export default Verifyemail;
