import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function StackedBarChart({ data }) {
  // Format the data for the chart
  const chartData = Object.keys(data).map((brand) => {
    const brandData = { brand };
    Object.keys(data[brand].models).forEach((model) => {
      brandData[model] = data[brand].models[model].count;
    });
    return brandData;
  });

  // Define a color map where each brand gets a unique color
  const brandColors = Object.keys(data).reduce((colors, brand, index) => {
    colors[brand] = `hsl(${(index * 360) / Object.keys(data).length}, 70%, 50%)`;
    return colors;
  }, {});

  return (
    <Container>
    <div className="bg-primary text-white p-3">  
      <h4 className="m-0 text-center">Brand Model Distribution</h4>  
    </div>  
    <div className="p-3">  
      <div className="d-flex justify-content-center">  
        <ResponsiveContainer width="150%" height={400}>  
          <BarChart  
            data={chartData}  
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}  
          >  
            <XAxis   
      dataKey="brand"   
      tick={{   
        angle: -50,   
        textAnchor: 'end',   
        fontSize: '6px' // Adjusting the label size  
      }}   
      height={60}   
    />  
            <YAxis />  
            <Tooltip />  
            {Object.keys(data).map((brand) =>  
              Object.keys(data[brand].models).map((model) => (  
                <Bar  
                  key={model}  
                  dataKey={model}  
                  stackId="a"  
                  fill={brandColors[brand]}  
                />  
              ))  
            )}  
          </BarChart>  
        </ResponsiveContainer>  
      </div>  
    </div>  
    <h5 className="text-muted mt-4 text-center">  
      This chart displays the distribution of different models across various brands.  
    </h5>  
  </Container>
  );
}

export default StackedBarChart;
