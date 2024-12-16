import { useLocation } from 'react-router-dom';
import "./Recipe.css";

const Recipe = () => {
    const location = useLocation();
    const { item } = location.state; // Access the selected recipe details

    return (
        <div className="recipe-container">
            <div className="recipe-header">
                <h1>{item.title}</h1>
                <img src={item.img} alt={item.title} className="recipe-img" />
            </div>
            <div className="recipe-details">
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Area:</strong> {item.area}</p>
            </div>
            <div className="recipe-instructions">
                <h2>How to Make</h2>
                <p>{item.instructions}</p>
            </div>
        </div>
    );
};

export default Recipe;
