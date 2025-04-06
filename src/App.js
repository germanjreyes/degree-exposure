import React, { useState } from 'react';

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

function App() {
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

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px'
      }}>AI Exposure Visualization</h1>
      <p style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        Explore how different {dataType} are impacted by AI
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px'
          }}>
            View By
          </label>
          <div style={{display: 'flex', gap: '10px'}}>
            <button
              onClick={() => setDataType('occupations')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: dataType === 'occupations' ? '#3b82f6' : '#e5e7eb',
                color: dataType === 'occupations' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Occupations
            </button>
            <button
              onClick={() => setDataType('majors')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: dataType === 'majors' ? '#3b82f6' : '#e5e7eb',
                color: dataType === 'majors' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              College Majors
            </button>
          </div>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px'
          }}>
            Exposure Type
          </label>
          <div style={{display: 'flex', gap: '10px'}}>
            <button
              onClick={() => setExposureType('negative')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: exposureType === 'negative' ? '#ef4444' : '#e5e7eb',
                color: exposureType === 'negative' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Replacement Risk
            </button>
            <button
              onClick={() => setExposureType('positive')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: exposureType === 'positive' ? '#10b981' : '#e5e7eb',
                color: exposureType === 'positive' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Enhancement
            </button>
          </div>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px'
          }}>
            Sort By
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #d1d5db',
              outline: 'none'
            }}
          >
            <option value="default">Default Order</option>
            <option value="lowest">Lowest Exposure First</option>
            <option value="highest">Highest Exposure First</option>
          </select>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px'
          }}>
            Search
          </label>
          <div style={{position: 'relative'}}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${dataType}...`}
              style={{
                width: '100%',
                padding: '8px 8px 8px 30px',
                borderRadius: '5px',
                border: '1px solid #d1d5db',
                outline: 'none'
              }}
            />
            <div style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }}>
              🔍
            </div>
          </div>
        </div>
      </div>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {data.map((item, index) => {
            const value = exposureType === 'negative' ? item.negativeExposure : item.positiveExposure;
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.name}
                </div>
                <div style={{ flex: 1, height: '24px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${value}%`,
                      backgroundColor: getColor(value),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '8px',
                      color: value > 50 ? 'white' : 'black',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}
                  >
                    {value}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div style={{
        padding: '15px',
        backgroundColor: '#eff6ff',
        borderRadius: '5px',
        border: '1px solid #bfdbfe',
        marginTop: '20px'
      }}>
        <h3 style={{fontWeight: 'bold', marginBottom: '10px'}}>About This Visualization</h3>
        <p style={{marginBottom: '10px'}}>This tool shows two types of AI exposure:</p>
        <ul style={{paddingLeft: '20px', marginBottom: '10px'}}>
          <li><span style={{fontWeight: '600', color: '#dc2626'}}>Replacement Risk:</span> The percentage of tasks that could potentially be replaced by AI.</li>
          <li><span style={{fontWeight: '600', color: '#059669'}}>Enhancement Potential:</span> The potential for AI to enhance productivity and capabilities in this field.</li>
        </ul>
        <p style={{fontSize: '14px', color: '#6b7280', marginTop: '10px'}}>Note: This is simulated data for demonstration purposes.</p>
      </div>
    </div>
  );
}

export default App;