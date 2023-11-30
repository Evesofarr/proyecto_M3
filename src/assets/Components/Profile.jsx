import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import PopUp from "./PopUp";
import VillagersList from "./VillagersList";
import { FavsContext } from "../../contexts/favsContext";

export default function Profile({ setIsAuthenticated }) {
    const [popUp, setPopUp] = useState(false);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [animal, setAnimal] = useState(null);
    const [animals, setAnimals] = useState(null);
    const [faved, setFaved] = useState(false);
    const { changedFavs } = useContext(FavsContext);
    let navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            setIsAuthenticated(true);

            fetch(`http://localhost:3005/api/user/${localStorage.getItem("themeuid")}/favorites`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            })
                .then(response => response.json())
                .then(data =>
                    setFavorites(data),
                    setLoaded(true)
                )
                .catch(error => console.error('Error al obtener favoritos:', error));
        }
    }, [setIsAuthenticated, changedFavs]);

    // useEffect(() => {
    //     const fetchCharacterById = async (characterId) => {
    //         console.log(characterId);
    //         try {
    //             const response = await fetch(`http://localhost:3005/api/villagers/id/${characterId}`);
    //             const characterData = await response.json();
    //             setCharacters(prevCharacters => [...prevCharacters, characterData]);
    //         } catch (error) {
    //             console.error('Error al obtener información del personaje:', error);
    //         }
    //     };

    //     favorites.length > 0 ? Promise.all(favorites.map(favoriteId => {
    //         fetchCharacterById(favoriteId);
    //     })) : '';
    // }, [favorites]);

    function handleLogout() {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        navigate("/");
    }

    function handleClose() {
        setPopUp(!popUp);
    };

    function popInfo(id) {
        let filteredAnimal = favorites.filter(animal => animal._id === id);
        setAnimal(filteredAnimal[0]);
        setPopUp(!popUp);
    };

    return (
        <>
            <button className="logout" onClick={handleLogout}>Log Out</button>
            <div>
                <h2 className="favoritos">Favorites</h2>
                {popUp ? <PopUp handleClose={handleClose} animal={animal} /> : ''}
                {error ? <div className="vibrar"><img src="../../../public/error.png" alt="" /></div> : ''}
                {loaded ?
                    <VillagersList favorites={true} popInfo={popInfo} animals={favorites} />
                    : loaded === false ? <div className="loader"><img src="../../../public/loader.gif" alt="" /></div> : ''}
            </div>
        </>
    );
}
