import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginpic from '../online.svg'
import { useForm } from 'react-hook-form'

function Register() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();


    const registerSubmit = async (data) => {
        if (data.password === data.cpassword) {
            const userData = {
                email: data.email,
                user: data.user,
                password: data.password
            }
            console.log(userData);
            await axios.post('auth/register', userData)
                .then(log => {
                    if (log.data.success) {
                        toast.success(log.data.msg, {
                            position: "top-right",
                            autoClose: 5000,
                            theme: "colored"

                        })
                        toast.success("Mail sent please verify you email", {
                            position: "top-right",
                            autoClose: 5000,
                            theme: "colored"

                        })
                        setTimeout(function () {
                            navigate('/')
                        }, 3000);

                        // localStorage.setItem("data", JSON.stringify(userData))
                    } else {
                        toast.error(log.data.msg, {
                            position: "top-right",
                            autoClose: 5000,
                            theme: "colored"

                        })
                    }

                })

                .catch(error => {
                    toast.error(error.data.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        theme: "colored"

                    })
                })

        } else {
            console.log("Passwords doesn't match");
            toast.error("Passwords doesn't match", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored"

            })
        }

    }
    return (
        <div className='row bgcolor p-4'>
            <h2 className='text-white text-center pb-1'>Ay! Captain Register here</h2>

            <div className="col-md-5 mx-auto mt-3 py-5 px-5">
                <div className="card p-3 bg-white">
                    <h2 className='pt-2 px-4'>Register</h2>
                    <form className='mt-5 mx-4' onSubmit={handleSubmit(registerSubmit)}>
                        <div className="form-group">
                            <h5>Name</h5>
                            <input type="text" className="form-control" placeholder="Enter name" required {...register("user", { required: true, minLength: 6 })} />

                            {errors.user && <p className='text-danger mt-1'>Name should be of atleast 6 characters</p>}
                        </div>
                        <div className='form-group mt-4'>
                            <h5>Email address</h5>
                            <input type="email" className="form-control" placeholder="Enter email" required {...register("email",
                                {
                                    required: true,
                                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                })} />
                            {errors.email && <p className='text-danger mt-1'>Please check your email</p>}
                        </div>
                        <div className="form-group mt-4">
                            <h5>Password</h5>
                            <input type="password" {...register("password",
                                {
                                    required: true,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                                })} className="form-control" placeholder="Password" />
                            {errors.password && <div>
                                <p className='text-danger'>Password should be of length 6-15 </p>
                                <p className='text-danger'>Should contain atleast one uppercase,lowercase,number & special character</p>
                            </div>}
                        </div>
                        <div className="form-group mt-4">
                            <h5>Confirm Password</h5>
                            <input type="password" {...register("cpassword",
                                {
                                    required: true,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                                })} className="form-control" placeholder="Confirm Password" />
                            {errors.cpassword && <div>
                                <p className='text-danger'>Password should be of length 6-15 </p>
                                <p className='text-danger'>Should contain atleast one uppercase,lowercase,number & special character</p>
                            </div>}
                        </div>
                        <div className='text-center'>

                            <button type="submit" className="submit-btn mt-5">Submit</button>
                        </div>
                    </form>
                    <Link className="text-primary text-center my-3" to="/">Already Registered? Click here to login</Link>
                </div>
                <ToastContainer />
            </div>
            <div className="col-md-6 mr-5 text-center mt-3 py-5">
                <img className='img-class img-fuild' src={loginpic} width="450px" height="450px" alt="" />
            </div>

        </div>
    )
}

export default Register