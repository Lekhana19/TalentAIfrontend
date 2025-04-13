import React, { useState } from 'react';
import { Users, Search, Filter, Download, Share2, Building2, Mail, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const departments = [
  {
    name: 'Engineering',
    headCount: 150,
    manager: {
      name: 'David Chen',
      email: 'david.chen@company.com',
      phone: '+1 (555) 123-4567',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    employees: [
      {
        name: 'John Smith',
        role: 'Senior Software Engineer',
        email: 'john.smith@company.com',
        location: 'San Francisco, CA',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
      },
      {
        name: 'Sarah Wilson',
        role: 'Frontend Developer',
        email: 'sarah.wilson@company.com',
        location: 'New York, NY',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
      }
    ],
    metrics: {
      attritionRate: '8.5%',
      avgTenure: '3.2 years',
      openPositions: 5
    }
  },
  {
    name: 'Sales',
    headCount: 80,
    manager: {
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      phone: '+1 (555) 234-5678',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    employees: [
      {
        name: 'Michael Brown',
        role: 'Senior Sales Executive',
        email: 'michael.brown@company.com',
        location: 'Chicago, IL',
        image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
      }
    ],
    metrics: {
      attritionRate: '12.3%',
      avgTenure: '2.5 years',
      openPositions: 3
    }
  },
  {
    name: 'Marketing',
    headCount: 45,
    manager: {
      name: 'Jessica Lee',
      email: 'jessica.lee@company.com',
      phone: '+1 (555) 345-6789',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    employees: [
      {
        name: 'Alex Thompson',
        role: 'Content Marketing Manager',
        email: 'alex.thompson@company.com',
        location: 'Austin, TX',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
      }
    ],
    metrics: {
      attritionRate: '5.2%',
      avgTenure: '4.1 years',
      openPositions: 2
    }
  }
];

export default function Departments() {
  const [expandedDepartment, setExpandedDepartment] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDepartment = (departmentName: string) => {
    setExpandedDepartment(expandedDepartment === departmentName ? null : departmentName);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="mt-2 text-gray-600">Manage and view department-wise employee distribution</p>
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
        {departments.map((department) => (
          <div key={department.name} className="bg-white rounded-xl shadow-sm border border-gray-200">
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
                    <h2 className="text-lg font-semibold text-gray-900">{department.name}</h2>
                    <p className="text-sm text-gray-600">{department.headCount} employees</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="grid grid-cols-3 gap-8 text-sm">
                    <div>
                      <p className="text-gray-500">Attrition Rate</p>
                      <p className="font-medium text-gray-900">{department.metrics.attritionRate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Avg Tenure</p>
                      <p className="font-medium text-gray-900">{department.metrics.avgTenure}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Open Positions</p>
                      <p className="font-medium text-gray-900">{department.metrics.openPositions}</p>
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
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Department Manager</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={department.manager.image}
                        alt={department.manager.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{department.manager.name}</p>
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
                    <h3 className="text-sm font-medium text-gray-900">Employees</h3>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      View All
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {department.employees.map((employee) => (
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
                          <p className="font-medium text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-600">{employee.role}</p>
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
    </div>
  );
}