import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./Cocktail.css";

const Cocktail = () => {
    const [menu, setMenu] = useState([]);
    const [selectalph, setSelectalph] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCocktail, setSelectedCocktail] = useState(null); // Store selected cocktail
    const [showPopup, setShowPopup] = useState(false); // Control visibility of the popup

    const fetchMenu = (query = "", selectalph = "") => {
        let url;

        if (query) {
            url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
        } else if (selectalph) {
            url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${selectalph}`;
        } else {
            url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
        }

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.drinks && Array.isArray(data.drinks)) {
                    const drinkData = data.drinks.map((drink) => ({
                        id: drink.idDrink,
                        img: drink.strDrinkThumb,
                        title: drink.strDrink,
                        category: drink.strCategory,
                        alcoholic: drink.strAlcoholic,
                        instructions: drink.strInstructions,
                        ingredients: getIngredients(drink)
                    }));
                    setMenu(drinkData);
                } else {
                    console.error("No Drinks found in the response.");
                    setMenu([]);
                }
            })
            .catch((error) => console.log("Error fetching data:", error));
    };

    const getIngredients = (drink) => {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            if (ingredient) {
                ingredients.push(ingredient);
            }
        }
        return ingredients;
    };

    const handleSearch = () => {
        fetchMenu(searchQuery);
    };

    const openPopup = (cocktail) => {
        setSelectedCocktail(cocktail);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedCocktail(null);
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    useEffect(() => {
        if (selectalph) {
            fetchMenu("", selectalph);
        }
    }, [selectalph]);

    return (
        <>
            <nav className="navbar">
                <ul className="nav-list">
                    <li className="nav-item"><Link to="/">Meal</Link></li>
                    <li className="nav-item"><Link to="/Cocktail">Cocktail</Link></li>
                    <li className="nav-item"><Link to="/HarryPotter">HarryPotter</Link></li>
                    <li className="nav-item"><Link to="/Bank">Bank</Link></li>
                </ul>
            </nav>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for a cocktail..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button"></button>
            </div>

            <div className="menu-container">
                <h2>Cocktail Menu</h2>
                <div className="menu-list">
                    {menu.length > 0 ? (
                        menu.map((item) => (
                            <div key={item.id} className="menu-item" onClick={() => openPopup(item)}>
                                <img src={item.img} alt={item.title} />
                                <h3>{item.title}</h3>
                                <p>Category: {item.category}</p>
                                <p>Alcoholic: {item.alcoholic}</p>
                            </div>
                        ))
                    ) : (
                        <div>No cocktails found.</div>
                    )}
                </div>
            </div>

            <div className="alpha">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                    <div key={letter} onClick={() => setSelectalph(letter)} className="alpha-item">
                        {letter}
                    </div>
                ))}
            </div>

            {showPopup && selectedCocktail && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-popup" onClick={closePopup}>Close</button>
                        <h2>{selectedCocktail.title}</h2>
                        <img src={selectedCocktail.img} alt={selectedCocktail.title} />
                        <p><strong>Category:</strong> {selectedCocktail.category}</p>
                        <p><strong>Alcoholic:</strong> {selectedCocktail.alcoholic}</p>
                        <p><strong>Ingredients:</strong></p>
                        <ul>
                            {selectedCocktail.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <p><strong>Instructions:</strong> {selectedCocktail.instructions}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cocktail;
