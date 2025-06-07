import React, { useEffect, useState } from 'react';
import axios from '../instant/axios';
import { useNavigate } from 'react-router-dom';


const OtpPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email:'',
    city: ''
  });

  const navigate = useNavigate();

// 
const [placeholder, setPlaceholder] = useState('');
  const fullText = 'Enter your Phone Number with +91 (e.g. +919123456789)';
useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(prev => prev + fullText.charAt(index));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100); // typing speed

    return () => clearInterval(interval);
  }, []);

  const sendOtp = async () => {
   if (!phone.match(/^\d{10}$/)) {
  alert('Enter a valid 10-digit phone number');
  return;
}

    try {
      setLoading(true);
      await axios.post('/api/auth/send-otp', { phone: `+91${phone}` });

      alert('OTP sent!');
      setStep(2);
    } catch (err) {
      alert('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!phone) return;
    setResending(true);
    try {
      await axios.post('/api/auth/send-otp', { phone });
      alert('OTP resent successfully!');
    } catch (err) {
      alert('Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length < 4) {
      alert('Please enter a valid OTP');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/verify-otp', { phone, otp });
      if (res.data.message === 'OTP verified successfully') {
        alert('OTP verified successfully!');
        localStorage.setItem('userPhone', phone);


        setStep(3);
      } else {
        alert('Invalid OTP');
      }
    } catch (err) {
      alert('Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  const saveDetails = async () => {
    if (!details.firstName || !details.lastName || !details.city) {
      alert('Please fill all the details');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/auth/save-details', { phone, ...details });
      alert('Details saved successfully!');
      navigate('/welcome');

    } catch (err) {
      alert('Failed to save details');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div
    className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-4"
    style={{
      backgroundImage:"url('https://i.pinimg.com/736x/60/66/7e/60667eb0809709e74a0271d8cd667799.jpg')"
    }}
  >
   
    {/* <div className="absolute inset-0 bg-black/60 bg-opacity-0 pointer-events-none"></div> */}


   
    <div className="relative z-10 w-full flex flex-col items-center">
     
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
        {step === 1
          ? "Lakshya MCA NIMCET 2025"
          : step === 2
          // ? "🔒 Verify OTP to Continue"
          // : "📝 Fill Your Details"
          }
      </h1>

    
      {step === 1 && (
        <div className="bg-white/40  shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-black">Registration</h2>
          <input
            type="text"
            placeholder={placeholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 shadow-md shadow-black bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#819A91] mb-4"
          />
          <button
            onClick={sendOtp}
            disabled={loading}
            className={`w-full py-2 text-white font-medium rounded-md transition ${
              loading
                ? "bg-[#075B5E] cursor-not-allowed"
                : "bg-[#075B5E] hover:bg-[#A7C1A8]"
            }`}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-[#075B5E]">Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          />
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <button
              onClick={verifyOtp}
              disabled={loading}
              className={`w-full py-2 text-white font-medium rounded-md transition ${
                loading
                  ? "bg-[#819A91] cursor-not-allowed"
                  : "bg-[#819A91] hover:bg-[#A7C1A8]"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={resendOtp}
              disabled={resending}
              className={`w-full py-2 text-white font-medium rounded-md transition ${
                resending
                  ? "bg-gradient-to-r from-[#948979] to-[#5A827E] cursor-not-allowed"
                  : "bg-[#36a59a] hover:bg-[#325551]"
              }`}
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-[#075B5E]">Your Details</h2>
          <input
            type="text"
            placeholder="First Name"
            value={details.firstName}
            onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={details.lastName}
            onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          />
          <input
            type="text"
            placeholder="email"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          />
          <input
            type="text"
            placeholder="City"
            value={details.city}
            onChange={(e) => setDetails({ ...details, city: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          />
          <button
            onClick={saveDetails}
            disabled={loading}
            className={`w-full py-2 text-white font-medium rounded-md transition ${
              loading
                ? "bg-[#819A91] cursor-not-allowed"
                : "bg-[#819A91] hover:bg-[#A7C1A8]"
            }`}
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      )}
    </div>
  </div>
);

};

export default OtpPage;