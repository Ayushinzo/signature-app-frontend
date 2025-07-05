import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PdfViewer from '../components/PdfViewer';
import Signature from '../components/Signature'
import SelectStyle from '../components/SelectStyle';
import axios from 'axios'
import PopupDialog from '../components/PopUp';

function Sign() {
  let location = useLocation()
  let navigate = useNavigate()
  const { pdf } = location.state || {};
  const [file, setFile] = useState(pdf)
  const [showSelectStyle, setShowSelectStyle] = useState(false)
  const [name, setName] = useState('Ayush Shembekar')
  const [styleValue, setStyleValue] = useState('Kristi')
  const [currentPage, setCurrentPage] = useState(1);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })
  const [color, setColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(20)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // useEffect(() => {
  //   setFile(pdf || null)
  // }, [pdf])

  useEffect(() => {
    if (pdf) {
      setFile(pdf || null)
    }
    else {
      navigate('/sign-pdf')
    }
  }, [pdf])

  async function handleSignPdf() {
    try {
      setLoading(true)
      if (!name || !styleValue || !coordinates || !color || !fontSize) {
        setLoading(false)
        setMessage("Please fill all the fields before signing the PDF.");
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('page', currentPage);
      formData.append('coordinates', JSON.stringify(coordinates));
      formData.append('color', color);
      formData.append('fontSize', fontSize);
      formData.append('fontFamily', styleValue);
      formData.append('pdf', pdf);

      let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/document/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.data.success) {
        setLoading(false)
        navigate('/sign-pdf/download', {
          state: {
            url: response.data.url
          }
        })
      }
      else {
        setLoading(false)
        setMessage(response.data.message || "Failed to sign PDF file")
      }
    } catch (error) {
      setLoading(false)
      setMessage("An error occurred while signing the PDF file")
    }
  }

  return (
    <>
      <PopupDialog
        open={!!message}
        onClose={() => setMessage('')}
        title="Notification"
        message={message}
        confirmText="OK"
        onConfirm={() => setMessage('')}
      />
      <div className='mt-[80px] flex gap-3 h-[88vh]'>
        {
          showSelectStyle &&
          <SelectStyle name={name} setName={setName} setShowSelectStyle={setShowSelectStyle} setStyleValue={setStyleValue} styleValue={styleValue} />
        }

        <PdfViewer file={file} setShowSelectStyle={setShowSelectStyle} currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <Signature setShowSelectStyle={setShowSelectStyle} name={name} styleValue={styleValue} setCoordinates={setCoordinates} color={color} setColor={setColor} fontSize={fontSize} setFontSize={setFontSize} handleSignPdf={handleSignPdf} loading={loading} />
      </div>
    </>
  )
}

export default Sign;