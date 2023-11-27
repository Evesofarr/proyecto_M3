import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setIsAuthenticated(true);
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/");
    }


    return (
        <>
            <Link to={'/'}>
                <button className="logout" onClick={handleLogout}>Log Out</button>
            </Link>
        </>
    );
};