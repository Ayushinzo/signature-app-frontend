import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function Upload() {
    const [pdf, setPdf] = useState(null)
    let navigate = useNavigate()
    return (
        <div className='mt-[130px] text-center'>
            <h2 className='font-bold text-5xl'>Sign PDF</h2>
            <p className='mt-4 font-semibold text-2xl text-gray-500'>Your tool to eSign documents. Sign a document yourself</p>
            <Button
                component="label"
                variant="contained"
                className="!mt-5 !rounded-2xl !shadow-lg !transition !duration-300 !ease-in-out hover:!shadow-xl active:!scale-95"
                tabIndex={-1}
                sx={{
                    width: "250px",
                    height: "80px",
                    fontSize: 20,
                    textTransform: "none",
                    backgroundColor: "#1976d2",
                    "&:hover": {
                        backgroundColor: "#115293",
                    },
                    background: "red"
                }}
                startIcon={<CloudUploadIcon sx={{ fontSize: 24 }} />}
                aria-label="Upload PDF files"
            >
                Select PDF file
                <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                        setPdf(event.target.files[0])
                        if (event.target.files[0]) {
                            navigate('/sign-pdf/sign', {
                                state: {
                                    pdf: event.target.files[0]
                                }
                            })
                        }
                    }}
                    required
                    accept="application/pdf"
                />
            </Button>
        </div>
    )
}

export default Upload
