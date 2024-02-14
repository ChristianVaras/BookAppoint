import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
  const [especialidad, setEspecialidad] = useState("");

  function recolectarDatos(especialidad) {
    setEspecialidad(especialidad);
  }

  console.log("en contexto ", especialidad);

  return (
    <CartContext.Provider value={{ recolectarDatos, especialidad }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
