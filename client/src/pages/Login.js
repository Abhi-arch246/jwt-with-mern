import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginpic from '../online.svg'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        toast.success("Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"

        })
    }

    return (
        <div className='row bgcolor pt-4'>
            <h2 className='text-white text-center pb-1'>Ay! Captain Welcome back</h2>

            <div className="col-md-6 text-center py-5 mt-3">
                <img className="img-fuild img-class rounded" src={loginpic} width='450px' height="450px" alt="" />
            </div>
            <div className="col-md-4 py-5 mt-3">
                <div className="card p-3 bg-white">
                    <h2 className='pt-2 px-4'>Login</h2>

                    <form onSubmit={loginSubmit} className='mt-5 mx-4'>
                        <div className="form-group">
                            <h5>Email address</h5>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required placeholder="Enter email" autoFocus />
                        </div>
                        <div className="form-group mt-4">
                            <h5>Password</h5>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required placeholder="Password" />
                        </div>
                        <div className='text-center'>
                            <button type="submit" className="submit-btn mt-5">Submit</button>

                        </div>
                        <br />

                    </form>
                    <Link className="text-primary text-center my-3" to="/register">Not Registered? Click here</Link>
                </div>
                <ToastContainer />
            </div>

        </div>
    )
}

export default Login