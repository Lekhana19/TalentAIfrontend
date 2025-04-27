import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  TrendingDown,
  Download,
  Share2,
  UserPlus,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('6M');
  // State variables for various endpoints
  const [riskCurveData, setRiskCurveData] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [topRiskFactors, setTopRiskFactors] = useState([]);
  
  // Other dummy data (retentionStrategies, attritionTrends, riskFactors, etc.) remain here if needed
  const [retentionStrategies, setRetentionStrategies] = useState([
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
  ]);
  
  const [attritionTrends, setAttritionTrends] = useState([
    { month: 'Jan', rate: 4.2, industry: 5.1 },
    { month: 'Feb', rate: 4.5, industry: 5.0 },
    { month: 'Mar', rate: 4.8, industry: 5.2 },
    { month: 'Apr', rate: 4.3, industry: 5.1 },
    { month: 'May', rate: 4.1, industry: 5.0 },
    { month: 'Jun', rate: 3.9, industry: 4.9 }
  ]);
  
  // For the Age & Gender Distribution chart; see transformation example below.
  const [ageGenderData, setAgeGenderData] = useState([]);
  
  useEffect(() => {
    // Fetch risk curve data
    fetch('http://127.0.0.1:8000/analytics/risk_curve_data')
      .then((res) => res.json())
      .then((data) => {
        // Save raw data if needed
        setRiskCurveData(data);
        // Transform data: Group by Age_Range for Age & Gender Distribution
        const grouped = {};
        data.forEach((item) => {
          const range = item.Age_Range;
          const gender = item.OriginalGender;
          if (!grouped[range]) {
            grouped[range] = { name: range, Male: 0, Female: 0 };
          }
          grouped[range][gender] += Number(item.Attrition_Percentage) || 1;
        });
        setAgeGenderData(Object.values(grouped));
      })
      .catch((err) => console.error('Error fetching risk curve data:', err));
      
    // Fetch top employees data
    fetch('http://127.0.0.1:8000/analytics/top_employees_data')
      .then((res) => res.json())
      .then((data) => {
        setTopEmployees(data);
      })
      .catch((err) => console.error('Error fetching top employees data:', err));
      
    // Fetch department data
    fetch('http://127.0.0.1:8000/analytics/department_pie_data')
      .then((res) => res.json())
      .then((data) => {
        setDepartmentData(data);
      })
      .catch((err) => console.error('Error fetching department data:', err));
    
    // *** New: Fetch Top Risk Factors ***
    fetch('http://127.0.0.1:8000/analytics/top_risk_factors')
      .then((res) => res.json())
      .then((data) => {
        // Transform API response to the format required by the PieChart
        // API response format: { risk_factor: "...", importance: 0.2311 }
        // Transform to: { name: "risk_factor", value: importance * 100 }
        const transformed = data.map(item => ({
          name: item.risk_factor,
          value: item.importance * 100  // Adjust multiplication if needed
        }));
        setTopRiskFactors(transformed);
      })
      .catch(err => console.error('Error fetching primary risk factors:', err));
  }, []);

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

      {/* Key Metrics Section (unchanged for brevity) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Example card for Total Employees */}
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

      {/* Main Charts Section (unchanged) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Attrition Trends Chart */}
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
        {/* Risk Distribution by Department Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Risk Distribution by Department</h2>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              <Filter className="h-4 w-4" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Department" />
                <YAxis label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Percentage" fill="#0088FE" name="Risk %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Age & Gender Distribution Chart */}
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
                <Bar dataKey="Male" fill="#0088FE" name="Male" />
                <Bar dataKey="Female" fill="#00C49F" name="Female" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Risk Factors Section */}
        {/* Primary Risk Factors PieChart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Primary Risk Factors</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topRiskFactors}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {topRiskFactors.map((entry, index) => (
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
        {/* High Risk Employees Section */}
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
            {topEmployees.length > 0 ? (
              topEmployees.map((employee, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      {/* Display placeholder or actual employee image if available */}
                      <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                        {employee.OriginalEmployeeNumber}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {employee.FirstName} {employee.LastName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Top Factor: {employee.Top_Contributing_Factor}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-red-600">
                        {employee.Attrition_Risk_Percentage}% Risk
                      </div>
                      <p className="text-xs text-gray-500">Dept: {employee.Department}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-red-600"
                        style={{ width: `${employee.Attrition_Risk_Percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No high risk employees found.</p>
            )}
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2">
              View All High Risk Employees
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Retention Strategies Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Retention Strategies</h2>
          <div className="space-y-4">
            {retentionStrategies.map((strategy, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{strategy.title}</h3>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    strategy.impact === 'High'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-yellow-50 text-yellow-700'
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