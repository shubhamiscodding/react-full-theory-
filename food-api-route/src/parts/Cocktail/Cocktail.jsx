import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./Cocktail.css"

const Cocktail = () => {
    const [menu, setMenu] = useState([]);
    const [selectalph , setSelectalph] = useState("");
    const [searchQuery , setSearchQuery] = useState("");

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
                        alcoholic: drink.strAlcoholic
                    }));
                    setMenu(drinkData);
                } else {
                    console.error("No Drinks found in the response.");
                    setMenu([]);
                }
            })
            .catch((error) => console.log("Error fetching data:", error));
    };

    const handleSearch = () => {
        fetchMenu(searchQuery);
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
                            <div key={item.id} className="menu-item">
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
        </>
    );
};

export default Cocktail;
