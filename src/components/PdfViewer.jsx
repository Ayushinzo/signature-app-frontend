import React, { useEffect, useMemo, useState } from 'react'
import { Document, Page } from 'react-pdf'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { pdfjs } from 'react-pdf';
import LoadingPdf from '../components/LoadingPdf'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

function PdfViewer({ file, setShowSelectStyle, setCurrentPage, currentPage }) {
    const [loadingPercent, setLoadingPercent] = useState(0);
    const [numPages, setNumPages] = useState(0)
    // const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadingTask = pdfjs.getDocument(URL.createObjectURL(file));
        loadingTask.onProgress = ({ loaded, total }) => {
            setLoadingPercent(Math.round((loaded / total) * 100));
        };
    }, [file])

    const fileUrl = useMemo(() => {
        if (file) {
            return URL.createObjectURL(file);
        }
        return null;
    }, [file]);
    return (
        <div className="relative flex w-6/8 rounded !shadow-lg h-[88vh] ">
            <div className={`absolute top-0 left-0 w-full z-10 ${loadingPercent === 100 && 'hidden'}`}>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress color="success" variant="determinate" value={loadingPercent} />
                </Box>
            </div>

            {/* Left side: Thumbnails */}
            <div className="w-1/4 overflow-y-auto p-2 bg-gradient-to-br from-blue-100 to-blue-300 mr-3 scrollBar">
                <Document
                    file={fileUrl}
                    onLoadSuccess={({ numPages }) => {
                        setNumPages(numPages);
                        setShowSelectStyle(true)
                    }}
                    loading={<LoadingPdf />}
                    onLoadError={(err) => console.error('PDF load error:', err)}
                >
                    {Array.from({ length: numPages }, (_, i) => (
                        <div
                            key={`thumb_${i + 1}`}
                            className="flex justify-center mb-3"
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            <div
                                className={`border ${currentPage === i + 1 ? 'border-blue-500' : 'border-gray-300'
                                    } rounded shadow-sm cursor-pointer`}
                            >
                                <Page
                                    pageNumber={i + 1}
                                    width={130}
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                />
                            </div>
                        </div>
                    ))}
                </Document>
            </div>

            {/* Right side: Selected page view */}
            <div className="w-3/4 flex justify-center items-start p-4 overflow-auto bg-gradient-to-br from-blue-100 to-blue-300 scrollBar">
                <Document
                    file={fileUrl}
                    loading={<LoadingPdf />}
                    onLoadError={(err) => console.error('PDF load error:', err)}
                >
                    <Page
                        pageNumber={currentPage}
                        width={720}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        className="shadow-lg rounded droppable"
                    />
                </Document>
            </div>
        </div>
    )
}

export default PdfViewer
