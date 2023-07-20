import { useState, useEffect } from 'react';
import jugadoresData from './jugadores.json';
import { AiOutlineEnter } from 'react-icons/ai';

// Función para reorganizar aleatoriamente el arreglo de jugadores
const shuffleArray = (array) => {
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray;
};

function App() {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [shuffledPlayers, setShuffledPlayers] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    setShuffledPlayers(shuffleArray(jugadoresData));
  }, []);

  let currentPlayer = shuffledPlayers[currentPlayerIndex];

  const handleClick = () => {
    if (inputValue === '') {
      return;
    }

    if ((currentPlayerIndex + 1) == shuffledPlayers.length) {
      setIsGameOver(true);
    }

    const nombresJugadorActual = currentPlayer.nombres.map((nombre) =>
      nombre.toLowerCase()
    );
    const normalizedInputValue = inputValue.trim().toLowerCase();

    if (nombresJugadorActual.includes(normalizedInputValue)) {
      setInputValue('');
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    }else{
      setIsGameOver(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const restart = () => {
    setCurrentPlayerIndex(0);
    setInputValue('');
    setShuffledPlayers(shuffleArray(jugadoresData));
    setIsGameOver(false);
  };

  return (
    <div className="h-screen md:py-16 md:px-8 py-2">
      <div className='flex justify-center relative w-full h-full'>
      <div className="text-white flex flex-col gap-y-10">
        <h1 className="md:text-4xl text-2xl text-center">Adivina el jugador del fútbol argentino</h1>

        {isGameOver ? (<div className="flex justify-center items-center flex-col gap-y-10 px-5 h-full">
          <div className='bg-[#26282c] w-full flex justify-center'>
          {currentPlayerIndex === shuffledPlayers.length ? 'Lo lograste paaa' : 'Alto bot'}
          </div>

          <button onClick={restart} className='bg-green-600 rounded-lg w-full md:w-1/3 py-2 mt-5 absolute bottom-24 md:bottom-0'>
            Reiniciar
          </button>
        </div>
        
        ) : (<div className="flex justify-center items-center flex-col gap-y-10">
        {currentPlayer && (
          <img
            src={currentPlayer.imagen}
            alt={currentPlayer.nombres[0]}
            className="min-w-[350px] max-w-[375px] min-h-[350px] max-h-[500px] md:min-w-[350px] md:max-w-[550px] md:min-h-[400px] md:max-h-[550px]"
          />
        )}

          <div className='absolute bottom-24 md:bottom-0'>
          <div className="flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nombre del jugador"
              className={`text-black rounded-l-lg px-4 py-2 w-60 outline-none font-semibold`}
            />
            <button
              onClick={handleClick}
              className="bg-red-500 text-white rounded-r-lg px-4 py-2"
            >
              <AiOutlineEnter className="text-2xl" />
            </button>

            
          </div>
          <button onClick={restart} className='bg-green-600 rounded-lg w-full py-1.5 mt-5'>
            Reiniciar
          </button>
          </div>
        </div>)}

      </div>

      <div className='absolute md:top-5 md:right-20 bottom-6'>
        <span className='text-white font-semibold text-2xl'>{currentPlayerIndex} / {shuffledPlayers.length}</span>
      </div>
      </div>
    </div>
  );
}

export default App;
