import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PopUp from "../Components/PopUp";
import VillagersList from "./VillagersList";

export default function Gender({ changeSel }) {

    const [animals, setAnimals] = useState(null);
    let { gender } = useParams();
    const [animal, setAnimal] = useState(null);
    const [popUp, setPopUp] = useState('');

    useEffect(() => {
        console.log(changeSel);
        if (changeSel !== "") {

            apiCall('http://localhost:3005/api/gender/' + changeSel);
        }
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