export const BotonVolver = ({ onClick, texto = "Volver" }) => {
    return (
      <button 
        type="button" 
        className="btn btn-secondary" 
        onClick={onClick}
      >
        {texto}
      </button>
    );
  };
  
