import PopUp from "../Components/PopUp";
import { useEffect, useState } from "react";
import Card from "./Card";

export default function Home({ handleLike, heart }) {
    const [animal, setAnimal] = useState(null);
    const [popUp, setPopUp] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [filteredAnimals, setFilteredAnimals] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        apiCall('http://localhost:3005/api/villagers/');
    }, []);

    function apiCall(url) {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setError(false);
                setLoaded(true);
                randomAnimal(res);
                infinite(res);

            })
            .catch(e => {
                setError(true);
                setLoaded(null);
            });
    };

    function infinite(animals) {
        function updateAnimal() {
            randomAnimal(animals);
            setTimeout(updateAnimal, 5000);
        }

        updateAnimal();
    }

    function randomAnimal(animals) {
        const random = Math.floor(Math.random() * (animals.length - 1));
        let randomAnimal = animals[random];
        setFilteredAnimals([randomAnimal]);
    };

    function handleClose() {
        setPopUp(!popUp);
    };

    function popInfo(id) {
        const filteredAnimal = filteredAnimals.filter(animal => animal._id === id);
        setAnimal(filteredAnimal[0]);
        setPopUp(!popUp);
    };

    return (
        <>
            {popUp ? <PopUp handleClose={handleClose} animal={animal} handleLike={handleLike} heart={heart} /> : ''}
            {error ? <div className="vibrar"><img src="../../../public/error.png" alt="" /></div> : ''}
            {loaded ?
                <Card popInfo={popInfo} animals={filteredAnimals} />
                : loaded === false ? <div className="loader"><img src="../../../public/loader.gif" alt="" /></div> : ''}
        </>
    );
};