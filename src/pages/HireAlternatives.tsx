import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ArrowLeft, Star } from 'lucide-react';

export default function HireAlternatives() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/hiring/hire_alternatives")
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error("Error fetching hire alternatives:", err));
  }, []);

  return (
    <div className="space-y-12">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Recommended Hiring</h1>
            <p className="mt-2 text-gray-600">Browse and filter top candidates recommended based on the attrition data.</p>
        </div>
      {matches.map((entry, idx) => (
        <div key={idx} className="border border-gray-200 rounded-xl shadow-sm bg-white p-6">
          {/* Current Employee Header */}
          <div className="flex items-center gap-4 mb-4">


          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                        {entry.employee.name.split(" ")[0][0] +" "+ entry.employee.name.split(" ")[1][0]}
                      </div>


            <div>
              <h2 className="text-xl font-bold text-gray-900">{entry.employee.name}</h2>
              <p className="text-sm text-gray-600">{entry.employee.role} • {entry.employee.department}</p>
              <p className="text-xs text-gray-500">{entry.employee.tenure}</p>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <div className="text-sm text-red-600 font-semibold">{entry.employee.riskScore}% Risk</div>
              <div className="text-xs text-red-500">Reason: {entry.employee.reason}</div>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {entry.employee.skills.map((skill, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{skill}</span>
            ))}
          </div>

          <div className="flex items-center justify-between mb-2 mt-6">
            <h3 className="text-md font-semibold text-gray-800">
              Recommended Replacement Candidates
            </h3>
            <span className="text-sm text-gray-500 italic">
              Based on skill match and experience
            </span>
          </div>

          {/* Alternatives Carousel */}
          <div className="relative">
            <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-4">
              {entry.alternatives.map((alt, index) => (
                <div
                  key={index}
                  className="min-w-[250px] flex-shrink-0 border border-gray-200 rounded-lg shadow p-4 bg-white"
                >
                  <div className="flex items-center gap-3 mb-3">
                    
          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                        {alt.name.split(" ")[0][0] +" "+ alt.name.split(" ")[1][0]}
                      </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{alt.name}</h3>
                      <p className="text-xs text-gray-600">{alt.role}</p>
                    </div>
                    <Star className="h-4 w-4 text-yellow-500 ml-auto" />
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{alt.experience}</p>
                  <div className="mb-2 text-sm text-blue-600 font-medium">Match Score: {alt.matchScore}%</div>
                  <div className="flex flex-wrap gap-1">
                    {alt.skills.slice(0, 5).map((skill, i) => (
                      <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}