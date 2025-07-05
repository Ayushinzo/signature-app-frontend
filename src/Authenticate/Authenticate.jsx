import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Authenticate({ children }) {
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    async function verifyUser() {
        try {
            setLoading(true)
            let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (response.data.success) {
                navigate("/sign-pdf")
                setLoading(false)
            }
            else {
                console.log(response.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        verifyUser()
    }, [])
    return (
        <>
            {children}
        </>
    )
}

export default Authenticate
