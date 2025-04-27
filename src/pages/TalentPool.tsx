import React, { useEffect, useState } from 'react';
import { Search, Filter, SlidersHorizontal, Download, Share2, Star, StarOff, Briefcase, GraduationCap, MapPin } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  role: string;
  experience: string;
  education: string;
  location: string;
  matchScore: number;
  skills: string[];
}

export default function TalentPool() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [experienceFilter, setExperienceFilter] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);

  // Fetch candidates with filters
  useEffect(() => {
    const controller = new AbortController();
    const rolesParam = roleFilter.length > 0 ? `&roles=${encodeURIComponent(roleFilter.join(','))}` : '';
    const experienceParam = experienceFilter ? `&experience=${encodeURIComponent(experienceFilter)}` : '';

    fetch(
      `http://127.0.0.1:8000/hiring/talent_pool?page=${page}&limit=6&search=${encodeURIComponent(searchTerm)}${rolesParam}${experienceParam}`,
      {
        signal: controller.signal,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data.candidates || []);
        setTotalPages(data.totalPages || 1);
        // Extract unique roles from candidates for the role filter
        const roles = [...new Set(data.candidates.map((c: Candidate) => c.role))];
        setAvailableRoles(roles);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Error fetching talent pool:', err);
        }
      });

    return () => controller.abort();
  }, [searchTerm, page, experienceFilter, roleFilter]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExperienceFilter(e.target.value);
    setPage(1); // Reset to first page
  };

  const toggleRoleFilter = (role: string) => {
    setRoleFilter((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
    setPage(1); // Reset to first page
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Talent Pool</h1>
          <p className="mt-2 text-gray-600">Browse and filter top candidates from our talent database</p>
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

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 relative min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // Reset to first page
              }}
              placeholder="Search candidates by name, skills, or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Experience:</label>
            <select
              value={experienceFilter}
              onChange={handleExperienceChange}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Experience Levels</option>
              <option value="0-2">0-2 Years</option>
              <option value="3-5">3-5 Years</option>
              <option value="6+">6+ Years</option>
            </select>
          </div>
          {/* <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
              <Filter className="h-4 w-4" />
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
              <SlidersHorizontal className="h-4 w-4" />
              Sort
            </button>
          </div> */}
        </div>
        {/* Role Filter Checkboxes */}
        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Filter by Role:</div>
          <div className="flex flex-wrap gap-4">
            {availableRoles.length > 0 ? (
              availableRoles.map((role) => (
                <label key={role} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={roleFilter.includes(role)}
                    onChange={() => toggleRoleFilter(role)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{role}</span>
                </label>
              ))
            ) : (
              <span className="text-sm text-gray-500">No roles available</span>
            )}
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                    {candidate.name.split(' ')[0][0] + candidate.name.split(' ')[1][0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-gray-600">{candidate.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(candidate.id)}
                  className="text-gray-400 hover:text-yellow-500"
                >
                  {favorites.includes(candidate.id) ? (
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ) : (
                    <StarOff className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="h-4 w-4" />
                  {candidate.experience}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GraduationCap className="h-4 w-4" />
                  {candidate.education}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {candidate.location}
                </div>
              </div>

              <div className="mt-4">
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

              <div className="mt-4">
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

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}