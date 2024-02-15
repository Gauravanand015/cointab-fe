import { createContext, useState } from "react";

export const idContext = createContext({
  id: null,
});

const IdProvider = ({ children }) => {
  const [id, setId] = useState(null);

  return (
    <idContext.Provider value={{ id, setId }}>{children}</idContext.Provider>
  );
};

export default IdProvider;
