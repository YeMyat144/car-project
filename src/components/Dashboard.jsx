import React, { useState, useEffect } from 'react';
import CarTable from './CarTable';
import PieChart from './PieChart';
import StackedBarChart from './StackedBarChart';
import data from '../data/taladrod-cars.min.json';

function Dashboard() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(data.Cars);
  }, []);

  const carsByBrandAndModel = cars.reduce((acc, car) => {
    const { NameMMT, Prc } = car;
    const brand = NameMMT.split(' ')[0];
    const model = NameMMT.split(' ')[1];
    
    if (!acc[brand]) {
      acc[brand] = { totalValue: 0, totalCount: 0, models: {} };
    }

    acc[brand].totalValue += parseInt(Prc.replace(/,/g, ''), 10);
    acc[brand].totalCount += 1;

    if (!acc[brand].models[model]) {
      acc[brand].models[model] = { value: 0, count: 0 };
    }

    acc[brand].models[model].value += parseInt(Prc.replace(/,/g, ''), 10);
    acc[brand].models[model].count += 1;

    return acc;
  }, {});

  return (
    <div>  
  <h1>Dashboard</h1>  
  <CarTable data={carsByBrandAndModel} />  
  
  <div className="row">  
    <div className="col-md-6">  
      <PieChart data={carsByBrandAndModel} />  
    </div>  
    <div className="col-md-6">  
      <StackedBarChart data={carsByBrandAndModel} />  
    </div>  
  </div>  
</div>
  );
}

export default Dashboard;
