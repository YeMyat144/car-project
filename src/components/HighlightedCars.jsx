import React, { useState, useEffect } from 'react';  
import { Tabs, Tab, Button } from 'react-bootstrap';  
import data from '../data/taladrod-cars.min.json';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import './HighlightedCars.css'; // Assuming you create this stylesheet for custom styles  
import { Colors } from 'chart.js';
import { color } from 'chart.js/helpers';

function HighlightedCars() {  
  const [highlightedCars, setHighlightedCars] = useState([]);  
  const [allCars] = useState(data.Cars);  
  const [activeTab, setActiveTab] = useState('All');  
  const [activeAllCarsTab, setActiveAllCarsTab] = useState('All');  

  // Load highlighted cars from local storage on component mount  
  useEffect(() => {  
    const savedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];  
    setHighlightedCars(savedCars);  
  }, []);  

  // Save highlighted cars to local storage  
  const saveToLocalStorage = (cars) => {  
    localStorage.setItem('highlightedCars', JSON.stringify(cars));  
  };  

  // Add a car to highlighted cars  
  const addCarToHighlight = (carId) => {  
    const carToAdd = allCars.find((car) => car.Cid === carId);  
    const updatedCars = [...highlightedCars, carToAdd];  
    setHighlightedCars(updatedCars);  
    saveToLocalStorage(updatedCars);  
  };  

  // Remove a car from highlighted cars  
  const removeCarFromHighlight = (carId) => {  
    const updatedCars = highlightedCars.filter((car) => car.Cid !== carId);  
    setHighlightedCars(updatedCars);  
    saveToLocalStorage(updatedCars);  
  };  

  // Extract unique brands from highlighted cars  
  const brands = [...new Set(highlightedCars.map((car) => car.NameMMT.split(' ')[0]))];  

  // Extract unique brands from all cars  
  const allBrands = [...new Set(allCars.map((car) => car.NameMMT.split(' ')[0]))];  

  return (  
    <div>  
      <h1>Highlighted Cars</h1>  
      {highlightedCars.length === 0 ? (  
        <p>No highlighted car yet</p>  
      ) : (  
        <Tabs  
          id="highlighted-car-tabs"  
          activeKey={activeTab}  
          onSelect={(k) => setActiveTab(k)}  
          className="mb-3"  
        >  
          {brands.map((brand) => (  
            <Tab eventKey={brand} title={brand} key={brand} className="custom-tab">  
              <div className="row">  
                {highlightedCars  
                  .filter((car) => car.NameMMT.split(' ')[0] === brand)  
                  .map((car) => (  
                    <div key={car.Cid} className="col-3 mb-4">  
                      <div className="car-item">  
                        <img src={car.Img100} alt={car.NameMMT} className="img-fluid" />  
                        <p style={{ margin: '0' }}>{car.NameMMT}</p>  
                        <p style={{ margin: '0' }}>Year: {car.Yr}</p>  
                        <p style={{ margin: '0' }}>Price: {car.Prc}</p>  
                        <Button variant="danger" onClick={() => removeCarFromHighlight(car.Cid)}>Remove</Button>  
                      </div>  
                    </div>  
                  ))}  
              </div>  
            </Tab>  
          ))}  
        </Tabs>  
      )}  

      <h2>All Cars</h2>  
      <Tabs  
        id="all-cars-tabs"  
        activeKey={activeAllCarsTab}  
        onSelect={(k) => setActiveAllCarsTab(k)}  
        className="mb-3"  
      >  
        <Tab eventKey="All" title="All" className="custom-tab">  
          <div className="row">  
            {allCars.map((car) => (  
              <div key={car.Cid} className="col-3 mb-4">  
                <div className="car-item">  
                  <img src={car.Img100} alt={car.NameMMT} className="img-fluid" />  
                  <p style={{ margin: '0' }}>{car.NameMMT}</p>  
                  <p style={{ margin: '0' }}>Year: {car.Yr}</p>  
                  <p style={{ margin: '0' }}>Price: {car.Prc}</p>  
                  <Button variant="primary" onClick={() => addCarToHighlight(car.Cid)}>Highlight</Button>  
                </div>  
              </div>  
            ))}  
          </div>  
        </Tab>  
        {allBrands.map((brand) => (  
          <Tab eventKey={brand} title={brand} key={brand} className="custom-tab">  
            <div className="row">  
              {allCars  
                .filter((car) => car.NameMMT.split(' ')[0] === brand)  
                .map((car) => (  
                  <div key={car.Cid} className="col-3 mb-4">  
                    <div className="car-item">  
                      <img src={car.Img100} alt={car.NameMMT} className="img-fluid" />  
                      <p style={{ margin: '0' }}>{car.NameMMT}</p>  
                      <p style={{ margin: '0' }}>Year: {car.Yr}</p>  
                      <p style={{ margin: '0' }}>Price: {car.Prc}</p>  
                      <Button variant="primary" onClick={() => addCarToHighlight(car.Cid)}>Highlight</Button>  
                    </div>  
                  </div>  
                ))}  
            </div>  
          </Tab>  
        ))}  
      </Tabs>  
    </div>  
  );  
}  

export default HighlightedCars;