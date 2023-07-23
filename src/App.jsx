import { useState, useEffect } from "react";

import jugadoresDataFacil from "./json/jugadoresFacil.json";
import jugadoresDataIntermedio from "./json/jugadoresIntermedio.json";
import jugadoresDataDificil from "./json/jugadoresDificil.json";

import { AiOutlineEnter } from "react-icons/ai";

import ContentPlayers from "./components/ContentPlayers";
import ReiniciarBtn from "./components/ReiniciarBtn";
import HomeBtn from "./components/HomeBtn";

// Función para reorganizar aleatoriamente el arreglo de jugadores
const shuffleArray = (array) => {
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray;
};

function App() {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [shuffledPlayers, setShuffledPlayers] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(null);

  useEffect(() => {
    setShuffledPlayers(
      shuffleArray(
        difficulty === "facil"
          ? jugadoresDataFacil
          : difficulty === "intermedio"
          ? jugadoresDataIntermedio
          : jugadoresDataDificil
      )
    );
  }, [difficulty]);

  let currentPlayer = shuffledPlayers[currentPlayerIndex];

  const handleClick = () => {
    if (inputValue === "") {
      return;
    }

    if (currentPlayerIndex + 1 == shuffledPlayers.length) {
      setIsGameOver(true);
    }

    const nombresJugadorActual = currentPlayer.nombres.map((nombre) =>
      nombre.toLowerCase()
    );
    const normalizedInputValue = inputValue.trim().toLowerCase();

    if (nombresJugadorActual.includes(normalizedInputValue)) {
      setInputValue("");
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const restart = () => {
    setCurrentPlayerIndex(0);
    setInputValue("");
    setShuffledPlayers(
      shuffleArray(
        difficulty === "facil"
          ? jugadoresDataFacil
          : difficulty === "intermedio"
          ? jugadoresDataIntermedio
          : jugadoresDataDificil
      )
    );
    setIsGameOver(false);
  };

  const chooseDifficulty = (e) => {
    setDifficulty(e);
  };

  const inicioBtn = () => {
    setDifficulty(null);
    setCurrentPlayerIndex(0);
    setInputValue("");
    setShuffledPlayers(
      shuffleArray(
        difficulty === "facil"
          ? jugadoresDataFacil
          : difficulty === "intermedio"
          ? jugadoresDataIntermedio
          : jugadoresDataDificil
      )
    );
  };

  return (
    <div className="h-screen md:py-16 md:px-8 py-2">
      <div className="flex justify-center relative w-full h-full">
        <div className="text-white flex flex-col gap-y-10">
          <h1 className="md:text-4xl text-2xl text-center font-semibold">
            Adivina el jugador del <span className="font-bold"><span className="text-[#40CFFF]">Fút</span><span>bo</span><span className="text-[#FFFF00]">l</span> <span className="text-[#FFFF00]">A</span><span>rgen</span><span className="text-[#40CFFF]">tino</span></span>
          </h1>

          {difficulty === null ? (
            <div className="flex items-center gap-y-20 flex-col px-5 h-2/3 m-auto w-full">
              <p className="text-2xl">
                <strong>Elige la dificultad</strong>
              </p>
              <div className="flex items-center justify-center flex-col md:flex-row md:gap-x-8 w-full gap-y-6 md:gap-y-0 ">
                <button
                  onClick={(e) => chooseDifficulty(e.currentTarget.value)}
                  value="facil"
                  className="w-1/3 animate-fade-right bg-red-400 rounded text-center py-6"
                >
                  <span className="text-xl font-semibold">Fácil</span>
                </button>
                <button
                  onClick={(e) => chooseDifficulty(e.currentTarget.value)}
                  value="intermedio"
                  className="w-1/3 animate-jump bg-red-400 rounded text-center py-6"
                >
                  <span className="text-xl font-semibold">Intermedio</span>
                </button>
                <button
                  onClick={(e) => chooseDifficulty(e.currentTarget.value)}
                  value="dificil"
                  className="w-1/3 animate-fade-left bg-red-400 rounded text-center py-6"
                >
                  <span className="text-xl font-semibold">Difícil</span>
                </button>
              </div>
            </div>
          ) : isGameOver ? (
            <div className="flex justify-center items-center flex-col gap-y-10 px-5 h-full">
              <div className="bg-[#26282c] w-full flex justify-center">
                {currentPlayerIndex === shuffledPlayers.length
                  ? "Lo lograste paaa"
                  : "Alto bot"}
              </div>

              <ReiniciarBtn
                restart={restart}
                classes={
                  "bg-green-600 rounded-lg w-full md:w-1/3 py-2 mt-5 absolute bottom-24 md:bottom-0"
                }
              />
            </div>
          ) : (
            <ContentPlayers
              currentPlayer={currentPlayer}
              inputValue={inputValue}
              handleKeyPress={handleKeyPress}
              handleClick={handleClick}
              AiOutlineEnter={AiOutlineEnter}
              restart={restart}
              setInputValue={setInputValue}
            />
          )}
        </div>

        {difficulty !== null ? (
          <div className="absolute md:top-5 md:right-20 bottom-6">
            <span className="text-white font-semibold text-2xl">
              {currentPlayerIndex} /{" "}
              {difficulty === null ? 0 : shuffledPlayers.length}
            </span>
          </div>
        ) : undefined}

        {difficulty !== null ? <HomeBtn inicioBtn={inicioBtn} /> : undefined}
      </div>
    </div>
  );
}

export default App;
