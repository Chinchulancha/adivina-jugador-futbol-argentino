import { useState, useEffect } from "react";
import ReiniciarBtn from './ReiniciarBtn'

const ContentPlayers = ({
  currentPlayer,
  inputValue,
  handleKeyPress,
  handleClick,
  restart,
  setInputValue,
  AiOutlineEnter
}) => {
  const [fadeDown, setFadeDown] = useState(false); // State variable to track the fade-down effect

  useEffect(() => {
    // Trigger the fade-down effect whenever the "currentPlayer" prop changes
    setFadeDown(true);

    // Reset the fade-down state after the animation duration (adjust this as needed)
    const fadeDownDuration = 1000; // 1 second
    const timer = setTimeout(() => {
      setFadeDown(false);
    }, fadeDownDuration);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [currentPlayer]);

  // Verificar si currentPlayer es undefined antes de usarlo
  const imagenSrc = currentPlayer?.imagen || "";
  const altText = currentPlayer?.nombres[0] || "";

  return (
    <div className="flex justify-center items-center flex-col gap-y-10">
      {currentPlayer && (
        <img
          src={imagenSrc}
          alt={altText}
          className={`min-w-[350px] max-w-[375px] min-h-[350px] max-h-[500px] md:min-w-[350px] md:max-w-[550px] md:min-h-[400px] md:max-h-[550px] ${
            fadeDown ? "animate-fade-down" : "" 
          }`}
        />
      )}

      <div className="absolute bottom-24 md:bottom-0">
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
        <ReiniciarBtn restart={restart} classes={"bg-green-600 rounded-lg w-full py-1.5 mt-5"}/>
      </div>
    </div>
  );
};

export default ContentPlayers;
