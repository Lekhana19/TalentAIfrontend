import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Download,
  Share2,
  Building2,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [expandedDepartment, setExpandedDepartment] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalEmployees, setModalEmployees] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/hiring/department_data")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error fetching department data:", err));
  }, []);

  const toggleDepartment = (departmentName: string) => {
    setExpandedDepartment(
      expandedDepartment === departmentName ? null : departmentName
    );
  };

  const filteredDepartments = departments.filter((department: any) => {
    const departmentName = department.name.toLowerCase();
    const employeeMatch = department.employees.some((emp: any) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return departmentName.includes(searchTerm.toLowerCase()) || employeeMatch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="mt-2 text-gray-600">
            Manage and view department-wise employee distribution
          </p>
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
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments or employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Departments List */}
      <div className="space-y-6">
        {filteredDepartments.map((department: any) => (
          <div
            key={department.name}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            {/* Department Header */}
            <div
              className="p-6 cursor-pointer"
              onClick={() => toggleDepartment(department.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {department.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {department.headCount} employees
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="grid grid-cols-3 gap-8 text-sm">
                    <div>
                      <p className="text-gray-500">Attrition Rate</p>
                      <p className="font-medium text-gray-900">
                        {department.metrics.attritionRate}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Avg Tenure</p>
                      <p className="font-medium text-gray-900">
                        {department.metrics.avgTenure}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Open Positions</p>
                      <p className="font-medium text-gray-900">
                        {department.metrics.openPositions}
                      </p>
                    </div>
                  </div>
                  {expandedDepartment === department.name ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Department Details */}
            {expandedDepartment === department.name && (
              <div className="border-t border-gray-200">
                {/* Department Manager */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    Department Manager
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={department.manager.image}
                        alt={department.manager.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {department.manager.name}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {department.manager.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {department.manager.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employee List */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      Employees
                    </h3>
                    <button
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      onClick={() => {
                        fetch(
                          `http://127.0.0.1:8000/hiring/department_data/name/${department.name}`
                        )
                          .then((res) => res.json())
                          .then((data) => {
                            setModalEmployees(data);
                            setShowModal(true);
                          })
                          .catch((err) => {
                            console.error("Error loading employees:", err);
                            setModalEmployees([]);
                          });
                      }}
                    >
                      View All
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {department.employees.map((employee: any) => (
                      <div
                        key={employee.email}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={employee.image}
                          alt={employee.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {employee.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {employee.role}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {employee.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {employee.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-6xl max-h-[90vh] overflow-hidden relative animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">
                Employees in Department
              </h2>
              <button
                className="text-gray-400 hover:text-gray-600 transition text-xl"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {Array.isArray(modalEmployees) && modalEmployees.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {modalEmployees.map((employee) => (
                    <div
                      key={employee.email}
                      className="flex items-center gap-4 p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                      <img
                        src={
                          employee.image ||
                          "https://ui-avatars.com/api/?name=User&size=80&background=gray&color=fff"
                        }
                        alt={employee.name}
                        className="h-12 w-12 rounded-full object-cover border"
                      />
                      <div className="w-full">
                        <p className="font-semibold text-gray-900">
                          {employee.name}
                        </p>
                        <p className="text-sm text-gray-600">{employee.role}</p>
                        <div className="flex items-start gap-1 text-xs text-gray-500 mt-1 break-all">
                          <Mail className="h-3 w-3 flex-shrink-0 mt-[2px]" />
                          <span className="break-all">{employee.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">
                  No employees found in this department.
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end px-6 py-3 border-t border-gray-200 bg-gray-50">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
