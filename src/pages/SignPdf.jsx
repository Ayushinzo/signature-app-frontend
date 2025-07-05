import React from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Upload from '../components/Upload'
import PdfLists from '../components/PdfLists'

function SignPdf() {
  let location = useLocation()
  const isChildRoute = location.pathname !== '/sign-pdf'
  return (
    <div>
      <Header />
      {isChildRoute ? (
        <Outlet />
      ) : (
        <>
          <Upload />
          <PdfLists />
        </>
      )}
    </div>
  )
}

export default SignPdf
