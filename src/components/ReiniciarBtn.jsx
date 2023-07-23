const ReiniciarBtn = ({ restart, classes }) => {
  return (
    <button onClick={restart} className={classes}>
      Reiniciar
    </button>
  );
};

export default ReiniciarBtn;
