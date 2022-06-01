import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from '../src/components/LandingPage/LandingPage';
import Home from '../src/components/Home/Home';
import CreatePokemon from '../src/components/CreatePokemon/CreatePokemon';
import DetailPokemon from '../src/components/DetailsPokemon/DetailPokemon.jsx'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/> 
        <Route path="/home" element={<Home/>}/>
        <Route exact path="/pokemons" element={<CreatePokemon/>}/>
        <Route path="/pokemons/:id" element={<DetailPokemon/>}/>  
      </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
