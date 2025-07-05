import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const [open, setOpen] = React.useState(false);
    const [userData, setUserData] = React.useState({
        username: '',
        email: ''
    });
    const navigate = useNavigate();
    window.addEventListener('click', (e) => {
        if (e.target.className !== 'w-14 h-14 rounded-full border-4 border-purple-200 shadow-md object-cover cursor-pointer hover:ring-4 hover:ring-pink-200 transition-all duration-200') {
            setOpen(false);
        }
    })

    async function fetchUserData() {
        try {
            let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/getUserDetails`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data.success) {
                setUserData(response.data.user);
            }
            else {
                localStorage.removeItem('token');
                navigate('/auth/login');
            }
        } catch (error) {
            localStorage.removeItem('token');
            navigate('/auth/login');
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/auth/login');
        } else {
            fetchUserData();
        }
    }, [])
    return (
        <header className="shadow-lg bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 py-3 px-5 md:px-10 flex items-center justify-between fixed left-0 right-0 top-0 z-50">
            <h1 className="text-3xl font-black text-indigo-700 flex items-center gap-3">
                LegalMark
            </h1>
            <div className="flex items-center gap-5 relative">
                <img
                    src="/nouser.avif"
                    alt="User avatar"
                    className="w-14 h-14 rounded-full border-4 border-purple-200 shadow-md object-cover cursor-pointer hover:ring-4 hover:ring-pink-200 transition-all duration-200"
                    onClick={() => setOpen(!open)}
                />
                <div className={`absolute right-0 top-16 bg-white bg-opacity-95 border border-purple-200 rounded-xl shadow-2xl p-6 flex flex-col items-center min-w-[230px] ${open ? 'block' : 'hidden'}`}>
                    <h2 className="font-bold text-xl text-indigo-900 mb-1">{userData.username}</h2>
                    <p className="text-sm text-gray-500 mb-3 break-all">{userData.email}</p>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        sx={{
                            borderRadius: '20px',
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: 'none',
                        }}
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/auth/login');
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header
