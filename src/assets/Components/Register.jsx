import { Link, useLocation } from "react-router-dom";

export default function Register() {
    const location = useLocation();
    const isRegisterPage = location.pathname.includes('/register');

    function handleInputRegisterChange(e) {
        e.preventDefault();
        name = (e.target.name.value);
        username = (e.target.username.value);
        email = (e.target.email.value);
        password = (e.target.name.value);
    }

    return (
        <>
            <div className="log-register">
                <Link to="/user">
                    <button className={isRegisterPage ? 'uButtonSpecial' : 'uButtonSpecial aqui'}>Log In</button>
                </Link>
                <button className={isRegisterPage ? 'uButtonSpecial aqui' : 'uButtonSpecial'}>Register</button>
            </div>

            <form className="registerForm" onSubmit={handleInputRegisterChange}>
                <input className="logRegInput" type="text" id="name" name="name" placeholder="Name" required />
                <input className="logRegInput" type="text" id="email" name="email" placeholder="Email" required />
                <input className="logRegInput" type="text" id="username" name="username" placeholder="Username" required />
                <input className="logRegInput" type="password" id="password" name="password" placeholder="Password" required />
                <button className="uButton" type="submit">Register</button>
            </form>
        </>
    );
};