import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
    const location = useLocation();
    const isRegisterPage = location.pathname.includes('/register');
    const [user, setUser] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    function apiCall(url, username, password, name, email, faved) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, name, email, faved })
        })
            .then(res => res.json())
            .then(res => {
                setUser(res.user);
                setSuccess(true);
                setTimeout(() => {
                    navigate("/user");
                }, 3000);
            })
            .catch(err => console.log(err));
    };


    function apiCall(url, username, password, name, email, faved) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, name, email, faved })
        })
            .then(res => res.json())
            .then(res => {
                if (res.errorType === "usernameExists") {
                    setError("El nombre de usuario ya está en uso");
                } else if (res.errorType === "emailExists") {
                    setError("El correo electrónico ya está registrado");
                } else if (res.error) {
                    setError(res.error);
                } else {
                    setUser(res.user);
                    setSuccess(true);
                    setTimeout(() => {
                        navigate("/user");
                    }, 3000);
                }
            })
            .catch(err => console.log(err));
    };


    function handleInputRegisterChange(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const faved = e.target.faved.value;
        apiCall('http://localhost:3005/api/user/register', username, password, name, email, faved);
    };

    return (
        <>
            <div className="log-register">
                <Link to="/user">
                    <button className={isRegisterPage ? 'uButtonSpecial' : 'uButtonSpecial aqui'}>Log In</button>
                </Link>
                <button className={isRegisterPage ? 'uButtonSpecial aqui' : 'uButtonSpecial'}>Register</button>
            </div>

            <form className="registerForm" onSubmit={handleInputRegisterChange}>
                {success ?
                    <div className="popRegister">
                        <div className="infoRegister">
                            <img src="../../../public/welcome.gif" alt="" />
                        </div>
                    </div >
                    : <p className="errorRegistro">{error}</p>}


                <input className="logRegInput" type="text" id="name" name="name" placeholder="Name" required />

                <input className="logRegInput" type="text" id="email" name="email" placeholder="Email" required />

                <input className="logRegInput" type="text" id="username" name="username" placeholder="Username" required />

                <input className="logRegInput" type="password" id="password" name="password" placeholder="Password" required />

                <input className="logRegInput" type="text" id="faved" name="faved" style={{ display: "none" }} />


                <button className="uButton" type="submit">Register</button>
            </form>

        </>
    );
};