import React, { useEffect, useState } from 'react';
import axios from '../instant/axios'; 
import { useNavigate } from 'react-router-dom';

const WelcomeCard = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate('/rank-predictor'); 
  };

  useEffect(() => {
    const phone = localStorage.getItem('userPhone');
    if (!phone) return;

    axios.get(`/api/auth/getuser?phone=${phone}`)
      .then(res => {
        const firstName = res.data.firstName;
        console.log("Fetched name:", firstName);
        setName(firstName);
      })
      .catch(err => {
        console.error('Error fetching user details:', err);
      });
  }, []);

  return (
 <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 flex flex-col items-center gap-6">

       
        <div className="relative w-full aspect-video bg-[#075B5E] rounded-lg flex items-center justify-center">
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-red-500 rotate-45"></div>
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div className="w-4 h-4 bg-purple-500 rotate-45"></div>
          </div>
        </div>

       
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#075B5E] mb-2">Hello, {name || 'Guest'}</h2>
          <p className="text-gray-600 text-sm mt-1">Welcome to Test Institute</p>
        </div>

      
        <button
        onClick={onSubmit}
         className="bg-gradient-to-r from-[#948979] to-[#5A827E]
         text-black font-semibold px-6 py-2 rounded-full transition duration-300 shadow-md w-full text-center">
          Predict Your Rank and College
        </button>
      </div>
    </div>
  );
};


export default WelcomeCard;
