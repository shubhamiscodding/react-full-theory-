import React, { useState, useEffect } from "react";
import "./BankDetails.css";
import { Link } from "react-router-dom";

const Bank = () => {
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [subAreaData, setSubAreaData] = useState([]);
  const [finalData, setFinalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSubArea, setSelectedSubArea] = useState("");

  // Fetch states
  const fetchStates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://bank-apis.justinclicks.com/API/V1/STATE/");
      if (!response.ok) throw new Error("Failed to fetch states");
      const data = await response.json();
      setStateData(data);
    } catch (err) {
      setError("Failed to fetch states.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch cities based on selected state
  const fetchCities = async (state) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${state}/`);
      if (!response.ok) throw new Error("Failed to fetch cities");
      const data = await response.json();
      setCityData(data);
    } catch (err) {
      setError("Failed to fetch cities.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch areas based on selected city
  const fetchAreas = async (state, city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${state}/${city}/`);
      if (!response.ok) throw new Error("Failed to fetch areas");
      const data = await response.json();
      setAreaData(data);
    } catch (err) {
      setError("Failed to fetch areas.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch sub-areas based on selected area
  const fetchSubAreas = async (state, city, area) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${state}/${city}/${area}/`);
      if (!response.ok) throw new Error("Failed to fetch sub-areas");
      const data = await response.json();
      setSubAreaData(data);
    } catch (err) {
      setError("Failed to fetch sub-areas.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch final data based on selected sub-area
  const fetchFinalData = async (state, city, area, subArea) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://bank-apis.justinclicks.com/API/V1/STATE/${state}/${city}/${area}/${subArea}/${subArea}.json`
      );
      if (!response.ok) throw new Error("Failed to fetch final data");
      const data = await response.json();
      setFinalData(data);
    } catch (err) {
      setError("Failed to fetch final data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/">Meal</Link></li>
          <li className="nav-item"><Link to="/Cocktail">Cocktail</Link></li>
          <li className="nav-item"><Link to="/HarryPotter">HarryPotter</Link></li>
          <li className="nav-item"><Link to="/Bank">Bank</Link></li>
        </ul>
      </nav>

      <h1>Async API Example</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <h3>State:</h3>
        <select
          onChange={(e) => {
            const state = e.target.value;
            setSelectedState(state);
            setCityData([]);
            setAreaData([]);
            setSubAreaData([]);
            setFinalData(null);
            fetchCities(state);
          }}
          value={selectedState}
        >
          <option value="">Select State</option>
          {stateData.map((state, index) => (
            <option key={state.id || index} value={state.name}>{state.name}</option>
          ))}
        </select>
      </div>

      {selectedState && (
        <div>
          <h3>City:</h3>
          <select
            onChange={(e) => {
              const city = e.target.value;
              setSelectedCity(city);
              setAreaData([]);
              setSubAreaData([]);
              setFinalData(null);
              fetchAreas(selectedState, city);
            }}
            value={selectedCity}
          >
            <option value="">Select City</option>
            {cityData.map((city, index) => (
              <option key={city.id || index} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>
      )}

      {selectedCity && (
        <div>
          <h3>Area:</h3>
          <select
            onChange={(e) => {
              const area = e.target.value;
              setSelectedArea(area);
              setSubAreaData([]);
              setFinalData(null);
              fetchSubAreas(selectedState, selectedCity, area);
            }}
            value={selectedArea}
          >
            <option value="">Select Area</option>
            {areaData.map((area, index) => (
              <option key={area.id || index} value={area.name}>{area.name}</option>
            ))}
          </select>
        </div>
      )}

      {selectedArea && (
        <div>
          <h3>Sub-Area:</h3>
          <select
            onChange={(e) => {
              const subArea = e.target.value;
              setSelectedSubArea(subArea);
              setFinalData(null);
              fetchFinalData(selectedState, selectedCity, selectedArea, subArea);
            }}
            value={selectedSubArea}
          >
            <option value="">Select Sub-Area</option>
            {subAreaData.map((subArea, index) => (
              <option key={subArea.id || index} value={subArea.name}>{subArea.name}</option>
            ))}
          </select>
        </div>
      )}

      {selectedSubArea && finalData && (
        <div>
          <h3>Final Data:</h3>
          {/* Displaying final data directly in the UI */}
          <div>
            <p><strong>Details:</strong></p>
            {finalData.key1 && <p><strong>Data Key 1:</strong> {finalData.key1}</p>}
            {finalData.key2 && <p><strong>Data Key 2:</strong> {finalData.key2}</p>}
            {/* Add more fields from the final data as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bank;
