import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Profile({ setIsAuthenticated }) {


    let navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setIsAuthenticated(true);
        }
    }, []);

    function handleLogout() {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        console.log(localStorage.getItem("token"));
        navigate("/");
    }


    return (
        <>

            <button className="logout" onClick={handleLogout}>Log Out</button>


            //Hacer que se vea el array de favoritos que tiene que ir en un componente a parte
        </>
    );
};