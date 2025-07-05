import React, { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import PopupDialog from '../components/PopUp.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

function PdfLists() {
    const [pdfFiles, setPdfFiles] = useState([])
    const [open, setOpen] = useState(false)
    const [selectedPdfId, setSelectedPdfId] = useState(null);
    const [message, setMessage] = useState('')

    let navigate = useNavigate()

    async function fetchPdfFiles() {
        try {
            let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/document/getPdfFiles`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data.success) {
                setPdfFiles(response.data.pdfFilers);
            }
        } catch (error) { }
    }

    useEffect(() => {
        fetchPdfFiles()
    }, [])

    async function handleDelete(id) {
        try {
            let response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/document/delete?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data.success) {
                setOpen(false)
                setSelectedPdfId(null)
                setPdfFiles(pdfFiles.filter(pdf => pdf._id !== id))
                setMessage("PDF file deleted successfully")
            }
            else {
                setOpen(false)
                setSelectedPdfId(null)
                setMessage(response.data.message || "Failed to delete PDF file")
            }
        } catch (error) {
            setOpen(false)
            setSelectedPdfId(null)
            setMessage("An error occurred while deleting the PDF file")
        }
    }

    async function handlePreview(url) {
        try {
            navigate('/sign-pdf/download', {
                state: {
                    url: url
                }
            })
        } catch (error) {
            setMessage("An error occurred while trying to preview the PDF file")
        }
    }

    return (
        <>
            <ConfirmDialog
                open={open}
                onClose={() => setOpen(false)}
                title="Delete PDF"
                message="Are you sure you want to delete this PDF file?"
                onConfirm={() => handleDelete(selectedPdfId)}
            />
            <PopupDialog
                open={!!message}
                onClose={() => setMessage('')}
                title="Notification"
                message={message}
                confirmText="OK"
                onConfirm={() => setMessage('')}
            />
            <div className="min-h-screen mt-16 flex items-start justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4">
                    {pdfFiles.map((pdfUrl, index) => (
                        <div
                            key={index}
                            className="relative group rounded-lg shadow-md cursor-pointer select-none hover:scale-105 transition-all"
                            onDoubleClick={() => handlePreview(pdfUrl.url)}
                        >
                            {/* Delete button container */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity !z-50">
                                <IconButton
                                    onClick={() => {
                                        setSelectedPdfId(pdfUrl._id);
                                        setOpen(true)
                                    }} // <-- add your handler
                                    size="medium"
                                    sx={{
                                        backgroundColor: 'rgba(239, 68, 68, 0.9)', // Tailwind red-500 equivalent
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: 'rgba(220, 38, 38, 1)' // darker red on hover
                                        }
                                    }}
                                >
                                    <DeleteIcon fontSize="medium" />
                                </IconButton>
                            </div>

                            <Document file={pdfUrl.url}>
                                <div className="flex items-center justify-center">
                                    <Page
                                        pageNumber={1}
                                        height={300}
                                        width={undefined}
                                        renderMode="canvas"
                                        renderAnnotationLayer={false}
                                        renderTextLayer={false}
                                        className="rounded p-2 !z-0"
                                    />
                                </div>
                            </Document>
                            <p className="text-center text-sm mt-2">{index + 1}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default PdfLists
