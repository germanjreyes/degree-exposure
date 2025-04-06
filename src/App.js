import React, { useState, useEffect } from 'react';

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

// Add academic degree levels
const degreePrograms = {
  "Associate's Degree": ["Nursing", "Accounting", "HR Management", "Marketing"],
  "Bachelor's Degree": ["Computer Science", "Finance", "Graphic Design", "Education", "Civil Engineering", "Psychology"],
  "Master's Degree": ["Computer Science", "Finance", "Marketing", "Civil Engineering", "Psychology"],
  "Doctoral Degree": ["Computer Science", "Education", "Psychology"]
};

function AIExposureVisualization() {
  const [dataType, setDataType] = useState('occupations');
  const [exposureType, setExposureType] = useState('negative');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedItem, setSelectedItem] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedItems, setComparedItems] = useState([]);
  const [degreeFilter, setDegreeFilter] = useState('all');
  
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
  
  // Apply degree filter for majors
  if (dataType === 'majors' && degreeFilter !== 'all') {
    data = data.filter(item => 
      degreePrograms[degreeFilter].includes(item.name)
    );
  }
  
  // Apply search filter
  if (searchTerm) {
    data = data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Apply sorting
  if (sortOrder === 'alphabetical') {
    data.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === 'lowest') {
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

  // Handle item selection
  const handleItemClick = (item) => {
    if (compareMode) {
      // In compare mode, toggle selection in comparedItems array
      if (comparedItems.find(i => i.name === item.name)) {
        // Remove if already selected
        setComparedItems(comparedItems.filter(i => i.name !== item.name));
      } else if (comparedItems.length < 3) {
        // Add if less than 3 items are selected
        setComparedItems([...comparedItems, item]);
      }
    } else {
      // In regular mode, update selectedItem
      setSelectedItem(selectedItem?.name === item.name ? null : item);
    }
  };

  // Clear comparison when switching data types
  useEffect(() => {
    setComparedItems([]);
    setSelectedItem(null);
  }, [dataType]);

  // Get related occupations for a major
  const getRelatedOccupations = (majorName) => {
    // This is a simple mapping for demonstration
    const mapping = {
      "Computer Science": ["Software Developer"],
      "Nursing": ["Registered Nurse"],
      "Finance": ["Financial Analyst"],
      "Graphic Design": ["Graphic Designer"],
      "Education": ["Elementary Teacher"],
      "Marketing": ["Marketing Manager"],
      "Civil Engineering": ["Civil Engineer"],
      "HR Management": ["HR Specialist"],
      "Accounting": ["Accountant"],
      "Psychology": ["HR Specialist"]
    };
    
    return mockData.occupations.filter(occ => 
      mapping[majorName] && mapping[majorName].includes(occ.name)
    );
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333'
      }}>AI Exposure Explorer</h1>
      <p style={{
        textAlign: 'center',
        marginBottom: '30px',
        color: '#666'
      }}>
        Explore how different {dataType} may be impacted by AI technology
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
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px',
            color: '#444'
          }}>
            View By
          </label>
          <div style={{display: 'flex', gap: '10px'}}>
            <button
              onClick={() => setDataType('occupations')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: dataType === 'occupations' ? '#3b82f6' : '#e5e7eb',
                color: dataType === 'occupations' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Occupations
            </button>
            <button
              onClick={() => setDataType('majors')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: dataType === 'majors' ? '#3b82f6' : '#e5e7eb',
                color: dataType === 'majors' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              College Majors
            </button>
          </div>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px',
            color: '#444'
          }}>
            AI Impact Type
          </label>
          <div style={{display: 'flex', gap: '10px'}}>
            <button
              onClick={() => setExposureType('negative')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: exposureType === 'negative' ? '#ef4444' : '#e5e7eb',
                color: exposureType === 'negative' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Replacement Risk
            </button>
            <button
              onClick={() => setExposureType('positive')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: exposureType === 'positive' ? '#10b981' : '#e5e7eb',
                color: exposureType === 'positive' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Complementary AI
            </button>
          </div>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px',
            color: '#444'
          }}>
            Sort By
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="default">Default Order</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
            <option value="lowest">Lowest Exposure First</option>
            <option value="highest">Highest Exposure First</option>
          </select>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px',
            color: '#444'
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
                padding: '10px 10px 10px 35px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                outline: 'none',
                fontSize: '14px',
                boxSizing: 'border-box'
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
      
      {/* Degree filter - only show for majors */}
      {dataType === 'majors' && (
        <div style={{
          marginBottom: '20px',
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px',
            color: '#444'
          }}>
            Filter by Degree Level
          </label>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
            <button
              onClick={() => setDegreeFilter('all')}
              style={{
                padding: '8px 12px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: degreeFilter === 'all' ? '#4b5563' : '#e5e7eb',
                color: degreeFilter === 'all' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              All Degrees
            </button>
            {Object.keys(degreePrograms).map(degree => (
              <button
                key={degree}
                onClick={() => setDegreeFilter(degree)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: degreeFilter === degree ? '#4b5563' : '#e5e7eb',
                  color: degreeFilter === degree ? 'white' : '#1f2937',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                {degree}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Comparison toggle */}
      <div style={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <label style={{fontSize: '14px', fontWeight: '500', color: '#444'}}>
            Compare Mode
          </label>
          <div 
            style={{
              width: '44px',
              height: '24px',
              backgroundColor: compareMode ? '#3b82f6' : '#e5e7eb',
              borderRadius: '12px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.2s ease'
            }}
            onClick={() => {
              // Toggle compare mode
              const newCompareMode = !compareMode;
              setCompareMode(newCompareMode);
              
              // Reset selections when toggling
              if (newCompareMode) {
                // When entering compare mode, clear single selection
                setComparedItems(selectedItem ? [selectedItem] : []);
                setSelectedItem(null);
              } else {
                // When exiting compare mode, clear compared items
                setSelectedItem(comparedItems.length > 0 ? comparedItems[0] : null);
                setComparedItems([]);
              }
            }}
          >
            <div 
              style={{
                width: '18px',
                height: '18px',
                backgroundColor: 'white',
                borderRadius: '50%',
                position: 'absolute',
                left: compareMode ? '22px' : '4px',
                top: '3px',
                transition: 'left 0.2s ease'
              }}
            />
          </div>
        </div>
        
        {compareMode && (
          <div style={{fontSize: '14px', color: '#666'}}>
            Select up to 3 items to compare ({comparedItems.length}/3)
          </div>
        )}
      </div>
      
      {/* Main visualization */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        {compareMode && comparedItems.length > 0 ? (
          // Comparison view
          <div>
            <h3 style={{marginBottom: '15px', fontWeight: 'bold', color: '#333'}}>Comparison View</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '10px'
            }}>
              {/* Headers */}
              <div></div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${comparedItems.length}, 1fr)`,
                gap: '10px',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                {comparedItems.map((item, idx) => (
                  <div key={idx}>{item.name}</div>
                ))}
              </div>
              
              {/* Replacement Risk row */}
              <div style={{fontWeight: '500', color: '#dc2626'}}>Replacement Risk</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${comparedItems.length}, 1fr)`,
                gap: '10px'
              }}>
                {comparedItems.map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      height: '30px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${item.negativeExposure}%`,
                        backgroundColor: getColor(item.negativeExposure),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.negativeExposure > 50 ? 'white' : 'black',
                        fontWeight: '500'
                      }}
                    >
                      {item.negativeExposure}%
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Complementary AI row */}
              <div style={{fontWeight: '500', color: '#059669', marginTop: '10px'}}>Complementary AI</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${comparedItems.length}, 1fr)`,
                gap: '10px'
              }}>
                {comparedItems.map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      height: '30px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${item.positiveExposure}%`,
                        backgroundColor: positiveColors[Math.floor(item.positiveExposure / 20)],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.positiveExposure > 50 ? 'white' : 'black',
                        fontWeight: '500'
                      }}
                    >
                      {item.positiveExposure}%
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Actions */}
              <div></div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${comparedItems.length}, 1fr)`,
                gap: '10px',
                marginTop: '10px'
              }}>
                {comparedItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setComparedItems(comparedItems.filter(i => i.name !== item.name))}
                    style={{
                      padding: '5px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: '#fee2e2',
                      color: '#b91c1c',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Remove
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Regular item list view
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {data.map((item, index) => {
              const value = exposureType === 'negative' ? item.negativeExposure : item.positiveExposure;
              const isSelected = selectedItem?.name === item.name || comparedItems.find(i => i.name === item.name);
              
              return (
                <div 
                  key={index} 
                  onClick={() => handleItemClick(item)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    padding: '8px',
                    borderRadius: '6px',
                    border: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: isSelected ? '#f0f9ff' : 'transparent'
                  }}
                >
                  <div style={{ 
                    width: '150px', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap',
                    fontWeight: isSelected ? '600' : 'normal',
                    fontSize: '15px'
                  }}>
                    {item.name}
                  </div>
                  <div style={{ 
                    flex: 1, 
                    height: '28px', 
                    backgroundColor: '#f3f4f6', 
                    borderRadius: '6px', 
                    overflow: 'hidden',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05) inset'
                  }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${value}%`,
                        backgroundColor: getColor(value),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '10px',
                        color: value > 50 ? 'white' : 'black',
                        fontWeight: '500',
                        fontSize: '14px',
                        transition: 'width 0.5s ease-out'
                      }}
                    >
                      {value}%
                    </div>
                  </div>
                  
                  {compareMode && (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '4px',
                      border: '2px solid #3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isSelected ? '#3b82f6' : 'white',
                      color: isSelected ? 'white' : '#3b82f6',
                      fontWeight: 'bold'
                    }}>
                      {isSelected ? '✓' : ''}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Detail view when an item is selected */}
      {selectedItem && !compareMode && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{marginBottom: '15px', fontWeight: 'bold', color: '#333'}}>
            {selectedItem.name} Details
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {/* Replacement Risk */}
            <div>
              <div style={{marginBottom: '10px', fontWeight: '500', color: '#dc2626'}}>
                Replacement Risk
              </div>
              <div style={{height: '28px', backgroundColor: '#f3f4f6', borderRadius: '6px', overflow: 'hidden'}}>
                <div
                  style={{
                    height: '100%',
                    width: `${selectedItem.negativeExposure}%`,
                    backgroundColor: getColor(selectedItem.negativeExposure),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: selectedItem.negativeExposure > 50 ? 'white' : 'black',
                    fontWeight: '500'
                  }}
                >
                  {selectedItem.negativeExposure}%
                </div>
              </div>
            </div>
            
            {/* Enhancement Potential */}
            <div>
              <div style={{marginBottom: '10px', fontWeight: '500', color: '#059669'}}>
                Complementary AI Potential
              </div>
              <div style={{height: '28px', backgroundColor: '#f3f4f6', borderRadius: '6px', overflow: 'hidden'}}>
                <div
                  style={{
                    height: '100%',
                    width: `${selectedItem.positiveExposure}%`,
                    backgroundColor: positiveColors[Math.floor(selectedItem.positiveExposure / 20)],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: selectedItem.positiveExposure > 50 ? 'white' : 'black',
                    fontWeight: '500'
                  }}
                >
                  {selectedItem.positiveExposure}%
                </div>
              </div>
            </div>
          </div>
          
          {/* Related information based on data type */}
          {dataType === 'majors' && (
            <div>
              <h4 style={{marginBottom: '10px', fontWeight: 'bold', color: '#555'}}>
                Related Occupations
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {getRelatedOccupations(selectedItem.name).map((occ, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px'
                  }}>
                    <div>{occ.name}</div>
                    <div style={{display: 'flex', gap: '15px'}}>
                      <span style={{color: '#dc2626'}}>
                        Risk: {occ.negativeExposure}%
                      </span>
                      <span style={{color: '#059669'}}>
                        Complementary: {occ.positiveExposure}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Interpretation and recommendations */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f0f9ff',
            borderRadius: '6px',
            border: '1px solid #bfdbfe'
          }}>
            <h4 style={{marginBottom: '10px', fontWeight: 'bold', color: '#1e40af'}}>
              AI Impact Analysis
            </h4>
            <p style={{marginBottom: '10px', lineHeight: '1.5', color: '#334155'}}>
              {selectedItem.negativeExposure > 60 ? 
                `${selectedItem.name} shows a high replacement risk (${selectedItem.negativeExposure}%), suggesting many tasks in this field could be automated by AI.` :
                selectedItem.negativeExposure > 30 ?
                  `${selectedItem.name} shows a moderate replacement risk (${selectedItem.negativeExposure}%), with some tasks potentially automatable.` :
                  `${selectedItem.name} shows a low replacement risk (${selectedItem.negativeExposure}%), indicating resilience to AI automation.`
              }
              
              {selectedItem.positiveExposure > 70 ? 
                ` However, there is significant potential (${selectedItem.positiveExposure}%) for AI to enhance productivity in this field, creating new opportunities.` :
                selectedItem.positiveExposure > 50 ?
                  ` There is moderate potential (${selectedItem.positiveExposure}%) for AI to enhance work in this field.` :
                  ` The potential for AI to enhance work in this field is relatively limited (${selectedItem.positiveExposure}%).`
              }
            </p>
            <p style={{lineHeight: '1.5', color: '#334155'}}>
              {dataType === 'majors' ? 
                `Students pursuing ${selectedItem.name} should consider complementary skills that enhance their ability to work alongside AI technologies.` :
                `Professionals in ${selectedItem.name} should consider upskilling in areas that complement rather than compete with AI capabilities.`
              }
            </p>
          </div>
        </div>
      )}
      
      <div style={{
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginTop: '20px'
      }}>
        <h3 style={{fontWeight: 'bold', marginBottom: '15px', color: '#475569'}}>About This Visualization</h3>
        
        <div style={{marginBottom: '15px'}}>
          <h4 style={{fontWeight: '600', fontSize: '16px', marginBottom: '8px', color: '#334155'}}>What This Shows</h4>
          <p style={{marginBottom: '10px', lineHeight: '1.6', color: '#475569'}}>
            This tool visualizes two dimensions of AI's potential impact on careers and education:
          </p>
          <ul style={{paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: '#475569'}}>
            <li><span style={{fontWeight: '600', color: '#dc2626'}}>Replacement Risk:</span> The percentage of tasks that could potentially be automated or replaced by AI technologies.</li>
            <li><span style={{fontWeight: '600', color: '#059669'}}>Complementary AI:</span> The degree to which AI might complement human capabilities in this field rather than replace human workers.</li>
          </ul>
        </div>
        
        <div>
          <h4 style={{fontWeight: '600', fontSize: '16px', marginBottom: '8px', color: '#334155'}}>How To Use This Tool</h4>
          <ul style={{paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: '#475569'}}>
            <li>Toggle between <strong>Occupations</strong> and <strong>College Majors</strong> to explore different perspectives</li>
            <li>Use <strong>Compare Mode</strong> to directly compare up to 3 items side by side</li>
            <li>Click on any item to view detailed information and analysis</li>
            <li>For college majors, explore related occupations to understand career path implications</li>
          </ul>
          <p style={{fontSize: '14px', color: '#64748b', marginTop: '15px', fontStyle: 'italic'}}>
            Note: This visualization uses simulated data based on current research on AI capabilities. Actual impacts may vary as technologies evolve.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIExposureVisualization;