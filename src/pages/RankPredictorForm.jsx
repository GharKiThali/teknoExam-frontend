import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const RankPredictorForm = () => {
  const [marks, setMarks] = useState("");
  const [category, setCategory] = useState("");
  const [predictedCollege, setPredictedCollege] = useState([]);
  const [error, setError] = useState("");

  const collegeCutoffs = {
    general: [
      { name: "NIT Trichy", cutoff: 700 },
      { name: "NIT Delhi", cutoff: 650 },
      { name: "NIT Allahabad", cutoff: 600 },
      { name: "NIT Warangal", cutoff: 540 },
      { name: "NIT Bhopal", cutoff: 510 },
      { name: "NIT Kurukshetra", cutoff: 495 },
      { name: "NIT Jamshedpur", cutoff: 480 },
      { name: "NIT Raipur", cutoff: 465 },
      { name: "NIT Patna", cutoff: 450 },
      { name: "NIT Agra", cutoff: 445 },
      { name: "NIT Meghalaya", cutoff: 440 },
      { name: "IIIT Bhopal", cutoff: 430 },
      { name: "NIT Vadodara", cutoff: 420 },
    ],
    obc: [
      { name: "NIT Trichy", cutoff: 600 },
      { name: "NIT Delhi", cutoff: 550 },
      { name: "NIT Allahabad", cutoff: 500 },
      { name: "NIT Warangal", cutoff: 480 },
      { name: "NIT Bhopal", cutoff: 460 },
      { name: "NIT Kurukshetra", cutoff: 450 },
      { name: "NIT Jamshedpur", cutoff: 440 },
      { name: "NIT Raipur", cutoff: 430 },
      { name: "NIT Patna", cutoff: 425 },
      { name: "NIT Agra", cutoff: 420 },
      { name: "NIT Meghalaya", cutoff: 410 },
      { name: "IIIT Bhopal", cutoff: 400 },
      { name: "NIT Vadodara", cutoff: 390 },
    ],
    sc: [
      { name: "NIT Trichy", cutoff: 400 },
      { name: "NIT Delhi", cutoff: 350 },
      { name: "NIT Allahabad", cutoff: 300 },
      { name: "NIT Warangal", cutoff: 280 },
      { name: "NIT Bhopal", cutoff: 260 },
      { name: "NIT Kurukshetra", cutoff: 250 },
      { name: "NIT Jamshedpur", cutoff: 240 },
      { name: "NIT Raipur", cutoff: 230 },
      { name: "NIT Patna", cutoff: 220 },
      { name: "NIT Agra", cutoff: 215 },
      { name: "NIT Meghalaya", cutoff: 210 },
      { name: "IIIT Bhopal", cutoff: 205 },
      { name: "NIT Vadodara", cutoff: 200 },
    ],
    st: [
      { name: "NIT Trichy", cutoff: 300 },
      { name: "NIT Delhi", cutoff: 250 },
      { name: "NIT Allahabad", cutoff: 200 },
      { name: "NIT Warangal", cutoff: 190 },
      { name: "NIT Bhopal", cutoff: 195 },
      { name: "NIT Kurukshetra", cutoff: 180 },
      { name: "NIT Jamshedpur", cutoff: 185 },
      { name: "NIT Raipur", cutoff: 170 },
      { name: "NIT Patna", cutoff: 160 },
      { name: "NIT Agra", cutoff: 150 },
      { name: "NIT Meghalaya", cutoff: 140 },
      { name: "IIIT Bhopal", cutoff: 130 },
      { name: "NIT Vadodara", cutoff: 120 },
    ],
  };

  const maxMarks = 1000;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setPredictedCollege([]);

    const score = parseInt(marks);
    const selectedCategory = category.toLowerCase();

    if (!collegeCutoffs[selectedCategory]) {
      setError("Invalid category selected.");
      return;
    }

    if (isNaN(score) || score < 0 || score > maxMarks) {
      setError(`Please enter valid marks between 0 and ${maxMarks}`);
      return;
    }

    const sortedColleges = [...collegeCutoffs[selectedCategory]];
    const highestCutoff = sortedColleges[0].cutoff;

    let matchedColleges;

    if (score >= highestCutoff) {
      // Score top ya usse upar hai, top 3 colleges show karo
      matchedColleges = sortedColleges.slice(0, 3);
    } else {
      const index = sortedColleges.findIndex((college) => score >= college.cutoff);
      if (index === -1) {
        setError("No college found for the entered marks");
        return;
      }
      matchedColleges = sortedColleges.slice(index, index + 3);
    }

    setPredictedCollege(matchedColleges);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/60/66/7e/60667eb0809709e74a0271d8cd667799.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#FAE3C6] rounded-xl shadow-lg p-6 z-10">
        <div className="flex items-center text-[#075B5E] font-medium mb-4">
          <Link to="/welcome">
            <IoArrowBack className="mr-2" />
          </Link>
          <span>Test Rank Predictor</span>
        </div>

        <h2 className="text-center font-bold text-lg text-black mb-2">
          Predict Rank/College
          <br />
          for NIMCET 2025
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="Enter Your Marks"
            className="px-4 py-2 shadow-md shadow-white bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 shadow-md shadow-white bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
            required
          >
            <option value="">Select Category</option>
            <option value="general">General</option>
            <option value="obc">OBC</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
          </select>

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-[#948979] to-[#5A827E] text-black font-semibold py-2 rounded-md transition"
          >
            Predict Result
          </button>
        </form>

        {error && (
          <div className="mt-5 text-center text-red-500 font-semibold">
            ❌ {error}
          </div>
        )}

        {predictedCollege.length > 0 && (
          <div className="mt-5">
            <h3 className="text-center text-green-600 font-semibold mb-4">
              🎓 You are predicted to get:
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {predictedCollege.map((college, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-purple-100 to-purple-200 py-1 rounded-xl shadow text-center w-[60vw] md:w-[10vw] mx-auto"
                >
                  <p className="text-sm font-semibold text-gray-800">
                    {index + 1}. {college.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankPredictorForm;
