import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PopUp from "../Components/PopUp";
import VillagersList from "./VillagersList";

export default function Gender({ changeSel }) {

    const [animals, setAnimals] = useState(null);
    const [filteredAnimals, setFilteredAnimals] = useState(null);
    let { gender } = useParams();
    const [animal, setAnimal] = useState(null);
    const [popUp, setPopUp] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (changeSel !== "") {
            apiCall('http://localhost:3005/api/gender/' + changeSel);
        }
    }, [changeSel]);

    function apiCall(url) {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setAnimals(res);
                setFilteredAnimals(res);
                setLoaded(true);
            });
    };

    function handleInputChange(e) {
        e.preventDefault();
        console.log(e.target.villager.value);

        setFilteredAnimals([...animals.filter(animal => animal.name.toLowerCase().includes(e.target.villager.value.toLowerCase()))]);
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
            <form className='buscador' onSubmit={handleInputChange}>
                <input className='selector'
                    placeholder="Search..."
                    name='villager'
                />
                <button type='submit' className='go'>Search</button>
            </form>
            {popUp ? <PopUp handleClose={handleClose} animal={animal} /> : ''}
            {loaded ?
                <VillagersList popInfo={popInfo} animals={filteredAnimals} />
                : <div className="loader"><img src="../../../public/loader.gif" alt="" /></div>}
        </>
    );
};