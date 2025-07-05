import React, { useEffect, useRef, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import gsap from 'gsap'
import { Draggable } from 'gsap/all';
import { Box, TextField, InputAdornment, Typography, Tooltip, Button } from '@mui/material';
import Slider from '@mui/material/Slider';

function Signature({ setShowSelectStyle, name, styleValue, setCoordinates, color, setColor, fontSize, setFontSize, handleSignPdf, loading }) {

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  useEffect(() => {
    gsap.registerPlugin(Draggable)

    Draggable.create("#draggable", {
      onPress: function () {
        // Create a copy
        let clone = this.target.cloneNode(true);
        document.body.appendChild(clone);

        // Make the clone focusable
        clone.setAttribute("tabindex", "0");

        // Border around the clone
        clone.style.border = '2px dashed blue'
        clone.style.padding = '4px 8px'

        // Position the clone where the original is
        gsap.set(clone, {
          position: "absolute",
          top: this.target.offsetTop,
          left: this.target.offsetLeft
        });

        // Disable the original's dragging behavior
        this.disable();

        // Make the clone draggable
        Draggable.create(clone, {
          type: "x,y",
          bounds: document.getElementsByClassName('droppable')[0],
          onRelease: function () {
            const cloneRect = clone.getBoundingClientRect();
            const containerRect = document.getElementsByClassName('droppable')[0].getBoundingClientRect();

            const left = cloneRect.left - containerRect.left;
            const top = cloneRect.top - containerRect.top;
            
            const containerHeight = containerRect.height;
            const containerWidth = containerRect.width;

            const domX = left;
            const domY = containerHeight - top;

            const pdfX = (domX / containerWidth) * 595;
            const pdfY = (domY / containerHeight) * 842;

            setCoordinates({
              x: Math.round(pdfX),
              y: Math.round(pdfY)
            });
          }
        })[0].startDrag(this.pointerEvent); // Forward drag start

        // Remove clone on double-click
        clone.addEventListener("dblclick", function () {
          clone.remove();
          Draggable.get("#draggable").enable()
        });
      }
    });

    return () => {
      Draggable.get("#draggable")?.kill();
    };
  }, [])

  return (
    <div className="w-2/8 max-w-lg mx-auto bg-white p-5 border-blue-100 shadow-xl transition-shadow duration-300 h-[100%] !overflow-x-auto scrollBar">
      <div>
        <h2 className="text-center font-extrabold text-4xl text-blue-900 mb-4 tracking-tight drop-shadow-md select-none">
          Sign Document
        </h2>
        <p className="text-center text-blue-600 text-base mb-7">
          Select your signature style and sign securely below.
        </p>
      </div>
      <hr className="my-6 border-blue-200" />
      <div className="flex flex-col gap-3">
        {/* Signature Style Card */}
        <div className="flex items-center justify-between py-5 px-6 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-xl cursor-pointer transition-transform duration-200">
          <div className="flex items-center gap-6 select-none">
            <CreateIcon className="text-white !scale-125 drop-shadow-xl" />
            <span className="font-bold text-2xl text-white drop-shadow-lg tracking-wide">
              Simple Signature
            </span>
          </div>
        </div>

        {/* Required Field */}
        <div className='mt-6'>
          <p className="font-semibold text-blue-800 text-sm tracking-wide">Required Field</p>
          <div className="mt-2 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-2xl flex items-center justify-between shadow-lg border border-blue-200 hover:shadow-2xl transition-shadow duration-200">
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2 shadow" />
              <p
                style={{
                  fontFamily: styleValue,
                  letterSpacing: '0.04em',
                  color: color,
                  fontSize: fontSize + 'px',
                  overflowWrap: 'anywhere',  // modern and works well
                  wordBreak: 'break-word',   // fallback
                  whiteSpace: 'normal',      // allows wrapping
                  lineHeight: 1.1
                }}
                className="text-gray-900 text-lg font-semibold select-none !z-100"
                id="draggable"
              >
                {name.trim()}
              </p>
            </div>

            <IconButton
              onClick={() => setShowSelectStyle(true)}
              className="!bg-white"
              aria-label="Edit signature style"
              size="large"
            >
              <CreateIcon className="text-blue-700 scale-125" />
            </IconButton>
          </div>
        </div>

        {/* Adjust font size */}
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Adjust font size
          </Typography>
          <Slider
            valueLabelDisplay="on"
            min={10}
            max={50}
            color="primary"
            aria-label="Value slider"
            sx={{
              mt: 2,
              '& .MuiSlider-thumb': {
                borderRadius: '50%',
              },
            }}
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          />
        </Box>

        {/* Choose color */}
        <Box display="flex" flexDirection="column" gap={1} width="100%" >
          <Typography variant="subtitle2" color="text.secondary">
            Choose color
          </Typography>
          <TextField
            type="color"
            value={color}
            onChange={handleColorChange}
            variant="outlined"
            size="medium"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title={color} arrow>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: color,
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                        boxShadow: '0 0 6px rgba(0,0,0,0.3)',
                      }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            sx={{
              '& input[type="color"]': {
                cursor: 'pointer',
                padding: 0,
                width: '100%',
                height: 48,
                minHeight: 48,
                border: 'none',
                background: 'none',
              },
              '.MuiOutlinedInput-root': {
                paddingLeft: '8px',
              }
            }}
          />
        </Box>

        {/* Sign Button */}
        <Button
          onClick={handleSignPdf}
          variant='contained'
          className="flex items-center justify-center w-full gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold !px-10 !py-4 !rounded-full shadow-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg !mt-5"
          type="button"
          startIcon={<ArrowForwardIcon />}
          loading={loading}
          disabled={loading}
        >
          Sign
        </Button>
      </div>
    </div>
  )
}

export default Signature