import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.scss';
import Villagers from './assets/Components/Villagers';
import Species from './assets/Components/Species';
import Personality from './assets/Components/Personality';
import Gender from './assets/Components/Gender';
import User from './assets/Components/User';
import Filters from './assets/Components/Filters';
import { ThemeContext } from './contexts/theme-context';
import { FavsContext } from './contexts/favsContext';
import ToggleTheme from './assets/Components/ToggleTheme';
import Home from './assets/Components/Home';
import Register from './assets/Components/Register';
import Profile from './assets/Components/Profile';


function App() {
  const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem('default-theme');
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };
  const [theme, setTheme] = useState(getDefaultTheme());
  const [changedFavs, setChangedFavs] = useState(false);
  const [changeSel, setChangeSel] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [heart, setHeart] = useState("♡");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);


  return (
    <>
      <BrowserRouter>
        <FavsContext.Provider value={{ changedFavs, setChangedFavs }}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={`theme-${theme}`}>
              <div className="body">
                <header>
                  <Link to="/" className='titulo'><h1 className='header-logo'><img className="logo" src="../public/ico.png" alt="" />Nookapedia</h1></Link>
                  <nav>
                    <ul>
                      <li>
                        <Link className='linkVillagers' to={'/villagers'}>Villagers</Link>
                      </li>
                    </ul>
                  </nav>
                  <div>{isAuthenticated ? <Link className='linkUser AccesoUsuario' to={'/profile'}>Profile</Link> : <Link className='linkUser' to={'/user'}>Login</Link>}

                  </div>
                </header>
                <ToggleTheme />
                <main >
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/villagers'
                      element={<>
                        <Filters changeSel={changeSel} setChangeSel={setChangeSel} /> <Villagers changeSel={changeSel} setChangeSel={setChangeSel} />
                      </>} />
                    <Route path='/species/:specie' element={<>
                      <Filters changeSel={changeSel} setChangeSel={setChangeSel} /><Species changeSel={changeSel} setChangeSel={setChangeSel} />
                    </>} />
                    <Route path='/personality/:personality' element={<>
                      <Filters changeSel={changeSel} setChangeSel={setChangeSel} /> <Personality changeSel={changeSel} setChangeSel={setChangeSel} />
                    </>} />
                    <Route path='/gender/:gender' element={<>
                      <Filters changeSel={changeSel} setChangeSel={setChangeSel} /><Gender changeSel={changeSel} setChangeSel={setChangeSel} />
                    </>} />
                    <Route path='/user' element={<User isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path='/profile' element={<Profile setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path='user/register' element={<Register />} />
                  </Routes>
                </main>
                <div className='ola'><img src="../public/bgFooter.png" alt="" /></div>
                <footer className='footer'>
                  <img src="../public/switch.png" alt="" className="switch" />
                  <p>Made by Peio y un poco de ayuda de Eve ♡</p>
                  <img className='iconoFooter' src="../public/ico.png" alt="Icono Juego" />
                </footer>
                <div className='lubina'><img src="../public/lubina-unscreen.gif" alt="" /></div>
                <div><a className="up" href="#">TOP</a></div>
              </div>
            </div>
          </ThemeContext.Provider>
        </FavsContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;