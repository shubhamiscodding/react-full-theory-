
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Meal from './parts/Home/Meal.jsx';
import Cocktail from './parts/Cocktail/Cocktail.jsx';
import HarryPotter from './parts/HarryPotter/HarryPotter.jsx';
import Bank from './parts/Bank.jsx';
import Recipe from './parts/Home/Recipe.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Meal />} />
          <Route path="/recipe/:title" element={<Recipe />} />
          <Route path="/Cocktail" element={<Cocktail />} /> 
          <Route path="/HarryPotter" element={<HarryPotter />} />   
          <Route path="/Bank" element={<Bank />} />   
        </Routes>
      </Router>
    </>
  );
}

export default App;
