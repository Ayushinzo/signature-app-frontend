import React from 'react'
import { useLocation } from 'react-router-dom'

function Download() {
    let location = useLocation();
    const { url } = location.state || {}
    return (
        <div className='w-[100%] h-[92vh] mt-15 p-2'>
            <iframe src={url} className='w-[100%] h-[100%] !m-auto'></iframe>
        </div>
    )
}

export default Download
