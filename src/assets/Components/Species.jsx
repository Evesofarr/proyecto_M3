import { useEffect, useState } from "react";
import PopUp from "../Components/PopUp";
import VillagersList from "./VillagersList";

export default function Species({ changeSel }) {

    const [animals, setAnimals] = useState(null);
    const [animal, setAnimal] = useState(null);
    const [popUp, setPopUp] = useState('');

    useEffect(() => {
        if (changeSel !== "") {
            apiCall('http://localhost:3005/api/species/' + changeSel);
        }
        console.log(changeSel);
    }, [changeSel]);

    function apiCall(url) {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setAnimals(res);
            });
    };

    function handleClose() {
        setPopUp(!popUp);
    };


    function popInfo(id) {
        let filteredAnimal = animals.filter(animal => animal._id === id);

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