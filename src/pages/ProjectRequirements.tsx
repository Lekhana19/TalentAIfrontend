import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Download, Share2 } from 'lucide-react';

export default function ProjectRequirements() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [requirements, setRequirements] = useState<any>(() => {
    const saved = localStorage.getItem("projectRequirements");
    return saved ? JSON.parse(saved) : null;
  });
  useEffect(() => {
    if (requirements) {
      localStorage.setItem("projectRequirements", JSON.stringify(requirements));
    }
  }, [requirements]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);

    const formData = new FormData();
    formData.append('file', file);

    fetch("http://127.0.0.1:8000/upload_project_pdf", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((data) => setRequirements(data))
      .catch((err) => console.error("Upload failed:", err));
  }, []);

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
                  onClick={() => {
                    setUploadedFile(null);
                    setRequirements(null);
                  }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
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
                  {requirements.required_skills.map((skill: string, index: number) => (
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
                  {requirements.team_plan.map((role: any, index: number) => (
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
  
                      {/* Matching candidates */}
                      {/* Matching candidates as cards */}
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {role.matching_candidates.map((cand: any, idx: number) => (
                          <div
                            key={idx}
                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between"
                          >
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">{cand.name}</h4>
                              <p className="text-xs text-gray-500">{cand.role} • {cand.experience}</p>
                              <p className="text-xs text-gray-400 mt-1">{cand.location}</p>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {cand.skills.map((skill: string, i: number) => (
                                <span
                                  key={i}
                                  className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
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
