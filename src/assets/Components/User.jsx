import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function User({ isAuthenticated, setIsAuthenticated }) {
    const [user, setUser] = useState('');
    const location = useLocation();
    let navigate = useNavigate();
    const isRegisterPage = location.pathname.includes('/register');
    const [success, setSuccess] = useState(false);
    const [popError, setPopError] = useState(false);

    function apiCall(url, username, password) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(res => {
                if (res.access_token) {
                    localStorage.setItem('token', res.access_token);
                    localStorage.setItem('themeuid', res.user._id);
                    let favedString = JSON.stringify(res.user.faved);
                    localStorage.setItem("faved", favedString);
                    setIsAuthenticated(true);
                    setSuccess(true);
                    setUser(res.user);
                    setTimeout(() => {
                        navigate("/villagers");
                    }, 3000);
                }
                else {
                    setPopError(true);
                }
            })
            .catch(err =>
                setSuccess(false));
    };

    function handleClosePop() {
        setPopError(!popError);
    };


    function handleInputLoginChange(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        apiCall('http://localhost:3005/api/auth/login', username, password);
    }

    return (
        <>
            {isAuthenticated ? (<>
                <h1 style={{ color: "grey" }}>Welcome {user.username}</h1>
                <img className="saludo" src="/public/saludo.gif" alt="" /></>
            ) : (
                <>
                    {!isAuthenticated ?
                        <>
                            <div className="log-register">
                                <button className={isRegisterPage ? 'uButtonSpecial' : 'uButtonSpecial aqui'} >Log In</button>
                                <Link to="/user/register">
                                    <button className={isRegisterPage ? 'uButtonSpecial aqui' : 'uButtonSpecial'}>Register</button>
                                </Link>
                            </div>
                            <form className="loginForm" onSubmit={handleInputLoginChange}>
                                <input className="logRegInput" type="text" id="username" name="username" placeholder="Username" required />
                                <input className="logRegInput" type="password" id="password" name="password" placeholder="Password" required />
                                <button className="uButton" type="submit">Login</button>
                            </form>
                        </>
                        : ''}

                    {success ?
                        ''
                        : <>
                            {popError ?
                                <div className="popUserErr" onClick={handleClosePop}>
                                    <div className="infoUser">
                                        <p className="closeUser">X</p>
                                        <p className="msjUser">Did I forgot my own password or username?</p>
                                        <img className="userImgError" src="../../../public/errorUsuario.gif" alt="" />
                                    </div>
                                </div > : ''}
                        </>}
                </>
            )}
        </>
    );
}
