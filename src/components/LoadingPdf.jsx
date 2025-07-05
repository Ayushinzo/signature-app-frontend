import React from 'react'

function LoadingPdf() {
  return (
    <div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
        <svg width="48" height="48" viewBox="0 0 50 50">
            <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#1976d2"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="31.415, 31.415"
                transform="rotate(72.0001 25 25)"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="1s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
        <span style={{ marginTop: '1rem', color: '#1976d2', fontWeight: 'bold', fontSize: '1.1rem' }}>
            Loading PDF...
        </span>
    </div>
    </div>
  )
}

export default LoadingPdf
