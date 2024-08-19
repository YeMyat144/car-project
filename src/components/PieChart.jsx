import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function BrandPieChart({ data }) {
  const chartData = Object.keys(data).map((brand) => ({
    name: brand,
    value: data[brand].totalCount,
  }));

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5555', '#A45DBE',
    '#00BFFF', '#FFD700', '#FF69B4', '#32CD32', '#FFA07A', '#6A5ACD',
    '#20B2AA', '#FF4500', '#2E8B57', '#800080', '#FF1493', '#00CED1',
    '#FF6347', '#B8860B'
  ];

  // Custom legend rendering
  const renderLegend = (value, entry) => {
    const brand = entry.payload.name;
    const count = entry.payload.value;
    return (
      <span>
        {brand} ({count})
      </span>
    );
  };

  return (
  <Container>
  <div className="text-center bg-primary text-white p-2">  
    <h5 className="m-0">Car Brands Distribution</h5>  
  </div>  
  <div className="p-3">  
    <div className="d-flex justify-content-center">  
      <ResponsiveContainer width="100%" height={400}>  
        <PieChart>  
          <Pie  
            data={chartData}  
            cx="50%"  
            cy="50%"  
            outerRadius={150}  
            fill="#8884d8"  
            dataKey="value"  
          >  
            {chartData.map((_, index) => (  
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />  
            ))}  
          </Pie>  
          <Tooltip />  
          <Legend verticalAlign="bottom" height={36} formatter={renderLegend} />  
        </PieChart>  
      </ResponsiveContainer>  
    </div>  
  </div>  
  </Container>
  );
}

export default BrandPieChart;
