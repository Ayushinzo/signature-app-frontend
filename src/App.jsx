import './App.css'
import { Button, Stack } from '@mui/material'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

function App() {
  let navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-3 sm:px-8 py-5 shadow-sm bg-white sticky top-0 z-50">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">LegalMark</h1>
        <Stack spacing={1.5} direction='row'>
          <Button variant="text" color="primary" onClick={() => navigate('/auth/login')}>Login</Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/auth/register')}>Register</Button>
        </Stack>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-10 lg:px-24 py-6 sm:py-20 bg-gradient-to-br from-blue-50 to-white">
        <motion.div
          className="lg:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold leading-tight text-blue-800">
            Secure. Fast. Legal.
          </h2>
          <p className="text-lg text-gray-600 max-w-xl">
            LegalMark helps individuals and teams sign documents online with full legal compliance, robust security, and seamless collaboration.
          </p>
          <Stack spacing={2} direction={'row'}>
            <Button variant="contained" color="primary" size="large" onClick={() => navigate('/auth/login')}>Get Started</Button>
            <Button variant="outlined" color="primary" size="large">Try Demo</Button>
          </Stack>
        </motion.div>

        <motion.div
          className="lg:w-1/2 mb-12 lg:mb-0 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/home.png"
            alt="Digital Signature"
            className="w-80 lg:w-[400px]"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20 px-8 lg:px-24">
        <h3 className="text-center text-3xl font-bold text-blue-700 mb-14">Why Choose LegalMark?</h3>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <img src="https://cdn-icons-png.flaticon.com/512/3771/3771526.png" alt="Legal" className="w-16 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Legally Binding</h4>
            <p className="text-gray-600">Our signatures comply with global e-signature laws including IT Act and eIDAS.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <img src="https://cdn-icons-png.flaticon.com/512/1642/1642545.png" alt="Secure" className="w-16 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Bank-Grade Security</h4>
            <p className="text-gray-600">All documents are encrypted and stored securely in the cloud.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <img src="https://cdn-icons-png.flaticon.com/512/1007/1007330.png" alt="Fast" className="w-16 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Instant Sharing</h4>
            <p className="text-gray-600">Easily send documents to others and get them signed within minutes.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SignEase. All rights reserved.
      </footer>
    </div>
  )
}

export default App
