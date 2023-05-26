import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [name, setName] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loadData = async () => {
    try {
      const token = await JSON.parse(localStorage.getItem("data"));
      const res = await axios.get("/user/userdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setName(res.data.data);
      } else {
        navigate("/");
      }
    } catch (error) {
      // navigate('/')
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const logout = () => {
    localStorage.removeItem("data");
    navigate("/");
  };

  const updateSubmit = async (data) => {
    if (data.password === data.cpassword) {
      const updateUser = {
        email: name.email,
        password: data.password,
        cupassword: data.cupassword,
      };
      console.log(updateUser);
      axios
        .post("/user/update", { updateUser })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.msg, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
              theme: "colored",
            });
            localStorage.removeItem("data");
            setTimeout(() => {
              window.location.href = "/";
            }, 4000);
          } else {
            toast.error(res.data.msg, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
              theme: "colored",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Passwords doesn't match", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };
  return (
    <>
      <div className="container">
        <div className="bg-success p-5">
          <h2 className="text-white text-center">Dashboard</h2>
        </div>
        <div className="mt-5 p-3">
          <button
            className="btn mt-3 btn-danger float-end me-3"
            onClick={logout}
          >
            Logout
          </button>
          <br />

          <h2 className="mt-5">Name: {name?.user}</h2>
          <h2>Email: {name?.email}</h2>
        </div>

        <div className="mt-4">
          <div className="col-md-5 mx-auto mt-3 py-5 px-5">
            <div className="card p-3 bg-white">
              <h2 className="pt-2 px-4">Update Details</h2>
              <form className="mt-5 mx-4" onSubmit={handleSubmit(updateSubmit)}>
                <div className="form-group">
                  <h5>Name</h5>
                  <input
                    type="text"
                    value={name?.user}
                    className="form-control"
                    readOnly
                  />

                  {errors.user && (
                    <p className="text-danger mt-1">
                      Name should be of atleast 6 characters
                    </p>
                  )}
                </div>
                <div className="form-group mt-4">
                  <h5>Email address</h5>
                  <input
                    type="email"
                    value={name?.email}
                    className="form-control"
                    readOnly
                  />
                  {errors.email && (
                    <p className="text-danger mt-1">Please check your email</p>
                  )}
                </div>
                <div className="form-group mt-4">
                  <h5>Current Password</h5>
                  <input
                    type="password"
                    {...register("cupassword", {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    })}
                    className="form-control"
                    placeholder="Enter current Password"
                  />
                  {errors.cupassword && (
                    <div>
                      <p className="text-danger">
                        Password should be of length 6-15{" "}
                      </p>
                      <p className="text-danger">
                        Should contain atleast one uppercase,lowercase,number &
                        special character
                      </p>
                    </div>
                  )}
                </div>
                <div className="form-group mt-4">
                  <h5>New Password</h5>
                  <input
                    type="password"
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    })}
                    className="form-control"
                    placeholder="Enter new Password"
                  />
                  {errors.password && (
                    <div>
                      <p className="text-danger">
                        Password should be of length 6-15{" "}
                      </p>
                      <p className="text-danger">
                        Should contain atleast one uppercase,lowercase,number &
                        special character
                      </p>
                    </div>
                  )}
                </div>
                <div className="form-group mt-4">
                  <h5>Confirm New Password</h5>
                  <input
                    type="password"
                    {...register("cpassword", {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    })}
                    className="form-control"
                    placeholder="Confirm new Password"
                  />
                  {errors.cpassword && (
                    <div>
                      <p className="text-danger">
                        Password should be of length 6-15{" "}
                      </p>
                      <p className="text-danger">
                        Should contain atleast one uppercase,lowercase,number &
                        special character
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <button type="submit" className="submit-btn mt-5">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
