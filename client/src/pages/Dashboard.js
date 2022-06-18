import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const [name, setName] = useState(null)
    const navigate = useNavigate()

    const loadData = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('data'))
            const res = await axios.get('/api/user/user-data', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.success) {

                setName(res.data.data)
            }
            else {
                navigate('/')

            }
        } catch (error) {
            // navigate('/')
            console.log(error);
        }
    }
    useEffect(() => {
        loadData()

    }, [])

    const logout = () => {
        localStorage.removeItem("data");
        navigate('/')
    };
    return (
        <>
            <div className='bg-success p-5'>
                <h2 className='text-white text-center'>Dashboard</h2>

            </div>
            <div className='mt-5 p-3'>
                <button className='btn mt-3 btn-danger float-end me-3' onClick={logout}>Logout</button>
                <br />
                <h2 className='mt-5'>Name: {name?.user}</h2>
                <h2>Email: {name?.email}</h2>
            </div>

        </>

    )
}

export default Dashboard