import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginpic from '../online.svg'

function Register() {
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const navigate = useNavigate()

    const registerSubmit = async (e) => {
        e.preventDefault()
        if (password === cpassword) {
            const userData = {
                email,
                user,
                password
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
                    <form className='mt-5 mx-4' onSubmit={registerSubmit}>
                        <div className="form-group">
                            <h5>Name</h5>
                            <input type="text" value={user} onChange={(e) => setUser(e.target.value)} className="form-control" placeholder="Enter name" required />
                        </div>
                        <div className='form-group mt-4'>
                            <h5>Email address</h5>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email" required />
                        </div>
                        <div className="form-group mt-4">
                            <h5>Password</h5>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                        </div>
                        <div className="form-group mt-4">
                            <h5>Confirm Password</h5>
                            <input type="password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} className="form-control" placeholder="Confirm Password" required />
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