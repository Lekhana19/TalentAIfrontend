import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';

export default function ProjectRequirements() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [requirements, setRequirements] = useState(() => {
    const saved = localStorage.getItem("projectRequirements");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (requirements) {
      localStorage.setItem("projectRequirements", JSON.stringify(requirements));
    } else {
      localStorage.removeItem("projectRequirements");
    }
  }, [requirements]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);

    const formData = new FormData();
    formData.append('file', file);

    fetch("http://127.0.0.1:8000/project/upload_project_pdf", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((data) => setRequirements(data))
      .catch((err) => {
        console.error("Upload failed:", err);
        setUploadedFile(null);
      });
  }, []);

  const clearUpload = () => {
    setUploadedFile(null);
    setRequirements(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Requirements</h1>
          <p className="mt-2 text-gray-600">Upload project documents to find matching talent</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Requirements</h2>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600">
              {isDragActive
                ? 'Drop the files here...'
                : 'Drag and drop your files here, or click to select files'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: PDF, DOC, DOCX
            </p>
          </div>

          {/* Uploaded File Preview */}
          {uploadedFile && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Uploaded Documents</h3>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{uploadedFile.name}</div>
                    <div className="text-xs text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(1)} MB
                    </div>
                  </div>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-500"
                  onClick={clearUpload}
                  aria-label="Remove uploaded file"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <button
                className="mt-4 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 text-sm font-medium"
                onClick={clearUpload}
                aria-label="Clear uploaded file and requirements"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        {requirements && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Composition & Suggestions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {requirements.required_skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Team Composition</h3>
                <div className="space-y-3">
                  {requirements.team_plan.map((role, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-1 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{role.role}</div>
                          <div className="text-xs text-gray-500">{role.required_skills.join(', ')}</div>
                        </div>
                        <div className="text-sm font-medium text-blue-600">{role.count_needed} needed</div>
                      </div>

                      {/* Matching candidates as carousel */}
                      <div className="mt-3 relative">
                        <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-4">
                          {role.matching_candidates.map((cand, idx) => (
                            <div
                              key={idx}
                              className="min-w-[250px] max-w-[400px] flex-shrink-0 border border-gray-200 rounded-lg shadow p-4 bg-white"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                                  {cand.name.split(" ")[0][0] + " " + cand.name.split(" ")[1][0]}
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-900">{cand.name}</h4>
                                  <p className="text-xs text-gray-600">{cand.role}</p>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 mb-2">{cand.experience}</p>
                              <div className="flex flex-wrap gap-1">
                                {cand.skills.slice(0, 5).map((skill, i) => (
                                  <span
                                    key={i}
                                    className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                              <a
                                href={`mailto:${cand.email}?subject=Opportunity&body=Hi ${cand.name},`}
                                className="block text-center w-full bg-blue-600 text-white py-2 px-4 mt-4 rounded-lg"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Reach Out
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}