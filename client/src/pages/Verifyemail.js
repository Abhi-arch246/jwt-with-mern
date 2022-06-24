import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Verifyemail() {
    const params = useParams()

    const tokenVerify = async () => {
        try {
            console.log(params.token);
            const res = await axios.post('/auth/verify-email', { token: params.token })
            console.log(res.data);
            toast.success("Email verified successfully", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored"

            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        tokenVerify()
    }, [])
    return (
        <>
            <div>Verifyemail</div>

            <ToastContainer />

        </>
    )
}

export default Verifyemail