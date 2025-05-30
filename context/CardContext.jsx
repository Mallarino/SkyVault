import React, { createContext, use, useContext, useState } from "react";

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [shouldRefresh, setShouldRefresh] = useState(true);

  // Guardamos el estado global para mostrar el mensaje de "Offline" solo una vez
  const [alreadyRun, setAlreadyRun] = useState(false);

  // Guardamos las cartas en un contexto global para no tener que llamarlas siempre que se abra la vista
  const [cards, setCards] = useState([]); 

  return (
    <CardContext.Provider value={{ alreadyRun, setAlreadyRun, shouldRefresh, setShouldRefresh, cards, setCards }}>
      {children}
    </CardContext.Provider>
  );
};

export const useRefreshCard = () => useContext(CardContext)