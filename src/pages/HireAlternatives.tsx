import React from 'react';
import { Users, ArrowRight, Star, Download, Share2 } from 'lucide-react';

const currentEmployee = {
  name: 'John Smith',
  role: 'Senior Software Engineer',
  department: 'Engineering',
  tenure: '4 years',
  riskScore: 78,
  reason: 'Compensation',
  skills: ['React', 'Node.js', 'Python', 'AWS'],
  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
};

const alternatives = [
  {
    name: 'Sarah Wilson',
    role: 'Senior Software Engineer',
    experience: '8 years',
    matchScore: 95,
    skills: ['React', 'Node.js', 'Python', 'AWS', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
  },
  {
    name: 'Michael Chen',
    role: 'Lead Software Engineer',
    experience: '7 years',
    matchScore: 88,
    skills: ['React', 'Node.js', 'Java', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
  }
];

export default function HireAlternatives() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hire Alternatives</h1>
          <p className="mt-2 text-gray-600">Find and compare potential replacements for high-risk employees</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Employee */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Current Employee</h2>
            <div className="px-2.5 py-1 text-xs font-medium bg-red-50 text-red-700 rounded-full">
              High Risk
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <img
              src={currentEmployee.image}
              alt={currentEmployee.name}
              className="h-16 w-16 rounded-full ring-2 ring-gray-200"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{currentEmployee.name}</h3>
              <p className="text-sm text-gray-600">{currentEmployee.role}</p>
              <p className="text-sm text-gray-500">{currentEmployee.department} • {currentEmployee.tenure}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Risk Score</span>
                <span className="text-sm font-medium text-red-600">{currentEmployee.riskScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-red-600"
                  style={{ width: `${currentEmployee.riskScore}%` }}
                />
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Primary Risk Factor</div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                {currentEmployee.reason}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Skills</div>
              <div className="flex flex-wrap gap-2">
                {currentEmployee.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden lg:flex items-center justify-center">
          <ArrowRight className="h-8 w-8 text-gray-400" />
        </div>

        {/* Alternatives */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {alternatives.map((candidate, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={candidate.image}
                      alt={candidate.name}
                      className="h-12 w-12 rounded-full ring-2 ring-gray-200"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-600">{candidate.role}</p>
                    </div>
                  </div>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Match Score</span>
                      <span className="text-sm font-medium text-blue-600">{candidate.matchScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${candidate.matchScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}