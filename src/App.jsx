import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.scss';
import Villagers from './assets/Components/Villagers';
import Species from './assets/Components/Species';
import Personality from './assets/Components/Personality';
import Gender from './assets/Components/Gender';
import User from './assets/Components/User';
import Filters from './assets/Components/Filters';

function App() {
  const [changeSel, setChangeSel] = useState("");
  //   const [nombre, setNombre] = useState('');

  //   function handleInputChange(e) {
  //     setNombre(e.target.value);
  //   };

  //   fetch(`http://localhost:3005/api/     /{nombre}`)
  //     .then(response => response.json())
  //     .then(res => {

  //       console.log(res);
  //     })

  //     .catch(error => console.error('Error en la búsqueda:', error));
  // };


  return (
    <>
      <BrowserRouter>
        <header>
          <h1 className='titulo'>Nookapedia</h1>
          <nav>
            <ul>
              <li>
                <Link className='linkVillagers' to={'/villagers'}>Villagers</Link>
              </li>
            </ul>
          </nav>
          <div>
            <Link className='linkUser' to={'/user'}>Login/Register</Link>
          </div>
        </header>
        <main>
          <div className='buscador'>
            <input className='selector'
              placeholder="Search..."
            // value={palabraClave}
            //  onChange={handleInputChange} 
            />
            <button className='go'>Search</button>
          </div>
        </main>
        <Filters changeSel={changeSel} setChangeSel={setChangeSel} />
        <Routes>
          <Route path='/villagers' element={<Villagers changeSel={changeSel} setChangeSel={setChangeSel} />} />
          <Route path='/species/:specie' element={<Species changeSel={changeSel} setChangeSel={setChangeSel} />} />
          <Route path='/personality/:personality' element={<Personality changeSel={changeSel} setChangeSel={setChangeSel} />} />
          <Route path='/gender/:gender' element={<Gender changeSel={changeSel} setChangeSel={setChangeSel} />} />
          <Route path='/user' element={<User />} />
        </Routes>
        <div className='ola'><img src="../public/bgFooter.png" alt="" /></div>
        <footer className='footer'>
          <p>2023©</p>
          <p>Made with MUCHISIMA anxiety y ayuda de Peio ♡</p>
          <img className='iconoFooter' src="../public/ico.png" alt="Icono Juego" />
        </footer>
        <div><a className='up' href="#">TOP</a></div>
      </BrowserRouter>
    </>
  );
};

export default App;