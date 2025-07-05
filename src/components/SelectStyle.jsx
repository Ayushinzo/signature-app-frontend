import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function SelectStyle({ setShowSelectStyle, name, setName, setStyleValue, styleValue }) {
    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/30 p-4">
            <div className="rounded-2xl shadow-2xl bg-white w-full max-w-xl">
                <div className="flex items-center justify-between px-6 py-5 border-b">
                    <h2 className="font-bold text-2xl text-gray-800">Signature Details</h2>
                </div>
                <div className="px-6 py-6">
                    <Box>
                        <TextField
                            id="outlined-basic"
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-root': { borderRadius: 2 },
                                '& label': { fontWeight: 500 }
                            }}
                        />
                    </Box>
                    <FormControl component="fieldset" sx={{ width: '100%' }}>
                        <FormLabel
                            component="legend"
                            sx={{ fontWeight: 600, color: '#333', mb: 2, fontSize: '1.1rem' }}
                        >
                            Signature Style
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-label="signature-style"
                            name="signature-style"
                            value={styleValue}
                            onChange={(e) => setStyleValue(e.target.value)}
                            sx={{ gap: 2 }}
                        >
                            <FormControlLabel
                                value="Kristi"
                                control={<Radio />}
                                label={name || 'Kristi'}
                                sx={{
                                    '.MuiFormControlLabel-label': {
                                        fontFamily: 'Kristi, cursive',
                                        fontSize: '2rem',
                                        color: '#374151'
                                    },
                                    mx: 1
                                }}
                            />
                            <FormControlLabel
                                value="Handlee"
                                control={<Radio />}
                                label={name || 'Handlee'}
                                sx={{
                                    '.MuiFormControlLabel-label': {
                                        fontFamily: 'Handlee, cursive',
                                        fontSize: '2rem',
                                        color: '#374151'
                                    },
                                    mx: 1
                                }}
                            />
                            <FormControlLabel
                                value="Allura"
                                control={<Radio />}
                                label={name || 'Allura'}
                                sx={{
                                    '.MuiFormControlLabel-label': {
                                        fontFamily: 'Allura, cursive',
                                        fontSize: '2rem',
                                        color: '#374151'
                                    },
                                    mx: 1
                                }}
                            />
                            <FormControlLabel
                                value="Alex Brush"
                                control={<Radio />}
                                label={name || 'Alex Brush'}
                                sx={{
                                    '.MuiFormControlLabel-label': {
                                        fontFamily: 'Alex Brush, cursive',
                                        fontSize: '2rem',
                                        color: '#374151'
                                    },
                                    mx: 1
                                }}
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="px-6 py-4 border-t flex justify-end">
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setShowSelectStyle(false)}
                            sx={{ fontWeight: 600, borderRadius: 2 }}
                        >
                            Cancel
                        </Button>
                        {/* <Button
                            variant="contained"
                            color="primary"
                            onClick={() => show()}
                            sx={{ fontWeight: 600, borderRadius: 2 }}
                        >
                            Apply
                        </Button> */}
                    </Stack>
                </div>
            </div>
        </div>
    )
}

export default SelectStyle
