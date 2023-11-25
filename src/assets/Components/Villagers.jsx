import { useEffect, useState } from "react";
import PopUp from "../Components/PopUp";
import VillagersList from "./VillagersList";

export default function Villagers({ changeSel, setChangeSel }) {

    const [animals, setAnimals] = useState(null);
    const [animal, setAnimal] = useState(null);
    const [popUp, setPopUp] = useState('');

    useEffect(() => {
        apiCall('http://localhost:3005/api/villagers/');
    }, []);
    function apiCall(url) {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setAnimals(res);
            })
            .catch(err => console.log(err));
    };

    function handleClose() {
        setPopUp(!popUp);
    };

    function popInfo(id) {
        const filteredAnimal = animals.filter(animal => animal._id === id);
        setAnimal(filteredAnimal[0]);
        setPopUp(!popUp);
    };

    return (
        <>
            {popUp ? <PopUp handleClose={handleClose} animal={animal} /> : ''}
            <VillagersList popInfo={popInfo} animals={animals} />
        </>
    );
};