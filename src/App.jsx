import axios from "axios";
import { useEffect, useState } from "react"
import { BarState } from "./components/BarState";

function App() {
  const [ poke, setPoke ] = useState(null);
  const colors = ['#278a2c', '#c91435','#e08504', '#13a1f2'];

  const inputFetchPoke = async (poke = 'pikachu') => {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`);
      const pokeData = {
        name: data.name,
        stats: data.stats.filter(st => ['hp','attack','defense', 'speed'].includes(st.stat.name)).map((stts, ind) => {
          return {
            name: stts.stat.name,
            value: stts.base_stat,
            color: colors[ind],
          };
        }),
        image: data.sprites.other.dream_world.front_default,
        types: data.types.map( ty => ty.type.name),
      }
      console.log(pokeData);
      setPoke(pokeData);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handlePoke = (e) => {
    e.target.previousSibling.value && inputFetchPoke(e.target.previousSibling.value);
  };

  useEffect(() => {
    const fetchPoke = async (poke = 'pikachu') => {
      try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`);
        const pokeData = {
          name: data.name,
          stats: data.stats.filter(st => ['hp','attack','defense', 'speed'].includes(st.stat.name)).map((stts, ind) => {
            return {
              name: stts.stat.name,
              value: stts.base_stat,
              color: colors[ind],
            };
          }),
          image: data.sprites.other.dream_world.front_default,
          types: data.types.map( ty => ty.type.name),
        }
        console.log(pokeData);
        setPoke(pokeData);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPoke();
  }, []);
  return (
    <div className="container">
      <div className="input-area">
        <input type="text" placeholder="Pokémon" />
        <svg onClick={handlePoke} xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
      </div>
      <div className="hero">
        <img src={poke?.image} alt="poke_image" />
        <div className="stats">
          <div className="labels">
              <h3>{poke?.name}</h3>
              <div>
                {poke?.types.map((type, index) =>
                  <span key={index}>{type}</span>
                )}
              </div>
          </div>
          <div className="stats-values">
            {poke?.stats.map((data, key) => 
              <BarState data={data} key={key} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
