import React, { useState } from 'react';
import { BarChart3, Users, TrendingDown, ArrowRight, Download, Share2, UserPlus, DollarSign, Clock, Target, BriefcaseIcon, TrendingUp, AlertTriangle, ChevronRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area } from 'recharts';

const riskByDepartment = [
  { department: 'Engineering', count: 12, risk: 'High' },
  { department: 'Sales', count: 8, risk: 'Medium' },
  { department: 'Marketing', count: 5, risk: 'Low' },
  { department: 'Product', count: 7, risk: 'High' },
  { department: 'Design', count: 4, risk: 'Medium' }
];

const highRiskEmployees = [
  {
    name: 'John Smith',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    riskScore: 85,
    age: 32,
    gender: 'Male',
    salary: 145000,
    tenure: '3.5 years',
    lastPromotion: '14 months ago',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
  },
  {
    name: 'Sarah Wilson',
    role: 'Product Manager',
    department: 'Product',
    riskScore: 78,
    age: 29,
    gender: 'Female',
    salary: 130000,
    tenure: '2.8 years',
    lastPromotion: '18 months ago',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
  },
  {
    name: 'Michael Chen',
    role: 'UX Designer',
    department: 'Design',
    riskScore: 72,
    age: 35,
    gender: 'Male',
    salary: 115000,
    tenure: '4.2 years',
    lastPromotion: '24 months ago',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
  }
];

const retentionStrategies = [
  {
    title: 'Compensation Review',
    description: 'Schedule immediate compensation reviews for high-risk employees',
    impact: 'High',
    timeframe: 'Immediate',
    factors: ['Salary below market rate', 'No recent raises', 'High performance ratings'],
    costEstimate: '$150,000 - $200,000',
    affectedEmployees: 12
  },
  {
    title: 'Career Development',
    description: 'Create personalized growth plans and mentorship opportunities',
    impact: 'Medium',
    timeframe: '1-3 months',
    factors: ['Limited promotion opportunities', 'Skill stagnation', 'Low engagement scores'],
    costEstimate: '$50,000 - $75,000',
    affectedEmployees: 28
  },
  {
    title: 'Work-Life Balance',
    description: 'Implement flexible working hours and remote work options',
    impact: 'High',
    timeframe: '1 month',
    factors: ['Long working hours', 'Commute time', 'Personal circumstances'],
    costEstimate: '$25,000 - $40,000',
    affectedEmployees: 45
  }
];

const ageGenderData = [
  { name: '20-30', Male: 15, Female: 18 },
  { name: '31-40', Male: 25, Female: 22 },
  { name: '41-50', Male: 12, Female: 10 },
  { name: '51+', Male: 8, Female: 5 }
];

const attritionTrends = [
  { month: 'Jan', rate: 4.2, industry: 5.1 },
  { month: 'Feb', rate: 4.5, industry: 5.0 },
  { month: 'Mar', rate: 4.8, industry: 5.2 },
  { month: 'Apr', rate: 4.3, industry: 5.1 },
  { month: 'May', rate: 4.1, industry: 5.0 },
  { month: 'Jun', rate: 3.9, industry: 4.9 }
];

const riskFactors = [
  { name: 'Compensation', value: 35 },
  { name: 'Career Growth', value: 25 },
  { name: 'Work-Life Balance', value: 20 },
  { name: 'Job Satisfaction', value: 15 },
  { name: 'Management', value: 5 }
];

const departmentMetrics = [
  { name: 'Engineering', headcount: 150, attrition: 8.5, engagement: 7.2, riskLevel: 'High' },
  { name: 'Sales', headcount: 80, attrition: 12.3, engagement: 6.8, riskLevel: 'Medium' },
  { name: 'Marketing', headcount: 45, attrition: 5.2, engagement: 8.1, riskLevel: 'Low' },
  { name: 'Product', headcount: 35, attrition: 7.8, engagement: 7.5, riskLevel: 'Medium' },
  { name: 'Design', headcount: 25, attrition: 6.4, engagement: 7.9, riskLevel: 'Low' }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('6M');

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attrition Risk Dashboard</h1>
          <p className="mt-2 text-gray-600">Monitor and manage employee retention risks</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
            {['1M', '3M', '6M', '1Y', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +5.2% vs last month
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk Employees</p>
              <h3 className="text-2xl font-bold text-gray-900">36</h3>
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +12.5% vs last month
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Retention Rate</p>
              <h3 className="text-2xl font-bold text-gray-900">94.2%</h3>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +1.8% vs industry avg
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Replacement Cost</p>
              <h3 className="text-2xl font-bold text-gray-900">$2.1M</h3>
              <p className="text-xs text-yellow-600 flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3" />
                Potential annual impact
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Attrition Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Attrition Trends</h2>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              <Filter className="h-4 w-4" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attritionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rate" stroke="#0088FE" name="Our Rate" />
                <Line type="monotone" dataKey="industry" stroke="#82ca9d" name="Industry Avg" strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution by Department */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Risk Distribution by Department</h2>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              <Filter className="h-4 w-4" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attrition" fill="#0088FE" name="Attrition Rate %" />
                <Bar dataKey="engagement" fill="#82ca9d" name="Engagement Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Age and Gender Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Attrition Risk by Age and Gender</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageGenderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Male" fill="#0088FE" />
                <Bar dataKey="Female" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Primary Risk Factors</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskFactors}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {riskFactors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* High Risk Employees */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">High Risk Employees</h2>
            <Link
              to="/hire-alternatives"
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <UserPlus className="h-4 w-4" />
              Find Alternatives
            </Link>
          </div>
          <div className="space-y-4">
            {highRiskEmployees.map((employee, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="h-10 w-10 rounded-full ring-2 ring-gray-200"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-red-600">{employee.riskScore}% Risk</div>
                    <p className="text-xs text-gray-500">{employee.department}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                  <div>
                    <span className="block text-gray-500">Tenure</span>
                    {employee.tenure}
                  </div>
                  <div>
                    <span className="block text-gray-500">Last Promotion</span>
                    {employee.lastPromotion}
                  </div>
                  <div>
                    <span className="block text-gray-500">Age • Gender</span>
                    {employee.age} years • {employee.gender}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-red-600"
                      style={{ width: `${employee.riskScore}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2">
              View All High Risk Employees
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Retention Strategies */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Retention Strategies</h2>
          <div className="space-y-4">
            {retentionStrategies.map((strategy, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{strategy.title}</h3>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    strategy.impact === 'High' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {strategy.impact} Impact
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                  <div>
                    <span className="block text-gray-500">Estimated Cost</span>
                    {strategy.costEstimate}
                  </div>
                  <div>
                    <span className="block text-gray-500">Affected Employees</span>
                    {strategy.affectedEmployees} employees
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {strategy.factors.map((factor, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
                      {factor}
                    </span>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Timeframe: {strategy.timeframe}</span>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    Implement Strategy
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