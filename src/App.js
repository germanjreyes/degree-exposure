import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Search } from 'lucide-react';

// Mock data - in the future this will be replaced with imported CSV data
const mockData = {
  occupations: [
    { name: "Software Developer", negativeExposure: 45, positiveExposure: 85 },
    { name: "Registered Nurse", negativeExposure: 20, positiveExposure: 65 },
    { name: "Financial Analyst", negativeExposure: 60, positiveExposure: 70 },
    { name: "Graphic Designer", negativeExposure: 55, positiveExposure: 75 },
    { name: "Elementary Teacher", negativeExposure: 15, positiveExposure: 60 },
    { name: "Marketing Manager", negativeExposure: 50, positiveExposure: 80 },
    { name: "Civil Engineer", negativeExposure: 30, positiveExposure: 75 },
    { name: "HR Specialist", negativeExposure: 40, positiveExposure: 60 },
    { name: "Accountant", negativeExposure: 65, positiveExposure: 55 },
    { name: "Chef", negativeExposure: 10, positiveExposure: 50 }
  ],
  majors: [
    { name: "Computer Science", negativeExposure: 50, positiveExposure: 90 },
    { name: "Nursing", negativeExposure: 20, positiveExposure: 70 },
    { name: "Finance", negativeExposure: 65, positiveExposure: 75 },
    { name: "Graphic Design", negativeExposure: 60, positiveExposure: 80 },
    { name: "Education", negativeExposure: 25, positiveExposure: 65 },
    { name: "Marketing", negativeExposure: 55, positiveExposure: 85 },
    { name: "Civil Engineering", negativeExposure: 35, positiveExposure: 80 },
    { name: "HR Management", negativeExposure: 45, positiveExposure: 65 },
    { name: "Accounting", negativeExposure: 70, positiveExposure: 60 },
    { name: "Psychology", negativeExposure: 30, positiveExposure: 75 }
  ]
};

const AIExposureVisualization = () => {
  const [dataType, setDataType] = useState('occupations');
  const [exposureType, setExposureType] = useState('negative');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  // Colors for the bars
  const negativeColors = ['#ffcccb', '#ff6666', '#ff0000', '#cc0000', '#8b0000'];
  const positiveColors = ['#ccffcc', '#66ff66', '#00ff00', '#00cc00', '#008b00'];

  const getColor = (value) => {
    const colors = exposureType === 'negative' ? negativeColors : positiveColors;
    if (value < 20) return colors[0];
    if (value < 40) return colors[1];
    if (value < 60) return colors[2];
    if (value < 80) return colors[3];
    return colors[4];
  };

  // Filter and sort data
  let data = [...mockData[dataType]];
  
  // Apply search filter
  if (searchTerm) {
    data = data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Apply sorting
  if (sortOrder === 'lowest') {
    data.sort((a, b) => 
      a[exposureType === 'negative' ? 'negativeExposure' : 'positiveExposure'] - 
      b[exposureType === 'negative' ? 'negativeExposure' : 'positiveExposure']
    );
  } else if (sortOrder === 'highest') {
    data.sort((a, b) => 
      b[exposureType === 'negative' ? 'negativeExposure' : 'positiveExposure'] - 
      a[exposureType === 'negative' ? 'negativeExposure' : 'positiveExposure']
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded shadow-md border border-gray-200">
          <p className="font-bold">{data.name}</p>
          <p>
            {exposureType === 'negative' ? 'Risk of Replacement: ' : 'Potential Enhancement: '}
            <span className="font-bold">{exposureType === 'negative' ? data.negativeExposure : data.positiveExposure}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-4">AI Exposure Visualization</h1>
      <p className="text-center mb-6">
        Explore how different {dataType} are impacted by AI
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            View By
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setDataType('occupations')}
              className={`flex-1 py-2 px-3 rounded text-sm font-medium ${
                dataType === 'occupations'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Occupations
            </button>
            <button
              onClick={() => setDataType('majors')}
              className={`flex-1 py-2 px-3 rounded text-sm font-medium ${
                dataType === 'majors'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              College Majors
            </button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exposure Type
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setExposureType('negative')}
              className={`flex-1 py-2 px-3 rounded text-sm font-medium ${
                exposureType === 'negative'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Replacement Risk
            </button>
            <button
              onClick={() => setExposureType('positive')}
              className={`flex-1 py-2 px-3 rounded text-sm font-medium ${
                exposureType === 'positive'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Enhancement Potential
            </button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="default">Default Order</option>
            <option value="lowest">Lowest Exposure First</option>
            <option value="highest">Highest Exposure First</option>
          </select>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${dataType}...`}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={90}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey={exposureType === 'negative' ? 'negativeExposure' : 'positiveExposure'}
              name={exposureType === 'negative' ? 'Replacement Risk' : 'Enhancement Potential'}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getColor(exposureType === 'negative' ? entry.negativeExposure : entry.positiveExposure)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
        <h3 className="font-bold mb-2">About This Visualization</h3>
        <p className="mb-2">This tool shows two types of AI exposure:</p>
        <ul className="list-disc pl-6 mb-2">
          <li><span className="font-semibold text-red-600">Replacement Risk:</span> The percentage of tasks that could potentially be replaced by AI.</li>
          <li><span className="font-semibold text-green-600">Enhancement Potential:</span> The potential for AI to enhance productivity and capabilities in this field.</li>
        </ul>
        <p className="text-sm text-gray-600 mt-2">Note: This is simulated data for demonstration purposes.</p>
      </div>
    </div>
  );
};

export default AIExposureVisualization;