import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OtpPage from './pages/OtpPage';
import WelcomeCard from './pages/WelcomeCard';
import RankPredictorForm from './pages/RankPredictorForm';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<OtpPage />} />
      <Route path="/welcome" element={<WelcomeCard />} />
      <Route path="/rank-predictor" element={<RankPredictorForm />} />
      <Route path="*" element={<Navigate to="/otp" replace />} />
    </Routes>
  );
};

export default App;
