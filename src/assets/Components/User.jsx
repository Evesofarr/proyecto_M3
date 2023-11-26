export default function User() {

    return (
        <>
            <div className="log-register">
                <button className="uButtonSpecial">Log In</button>
                <button className="uButtonSpecial">Register</button>
            </div>
            <form className="loginForm">
                <input className="logRegInput" type="text" id="username" name="username" placeholder="Username" required />
                <input className="logRegInput" type="password" id="password" name="password" placeholder="Password" required />
                <button className="uButton" type="submit">Login</button>
            </form>
            <form className="registerForm">
                <input className="logRegInput" type="text" id="name" name="name" placeholder="Name" required />
                <input className="logRegInput" type="text" id="email" name="email" placeholder="Email" required />
                <input className="logRegInput" type="text" id="username" name="username" placeholder="Username" required />
                <input className="logRegInput" type="password" id="password" name="password" placeholder="Password" required />
                <button className="uButton" type="submit">Register</button>
            </form>
        </>
    );

};