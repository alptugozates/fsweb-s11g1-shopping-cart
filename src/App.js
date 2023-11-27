import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ProductContext } from "./contexts/ProductContext";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { CartContext } from "./contexts/CartContext";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    return storedCart;
  });

  const addItem = (item) => {
    const isAlreadyInCart = cart.find((cartItem) => cartItem.id === item.id);
    if (!isAlreadyInCart) {
      setCart([...cart, item]);
    } else {
      setCart([...cart]);
    }

  };
  const removeItem = (id) => {
    setCart([...cart.filter((item) => item.id !== id)])
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }} >
        <CartContext.Provider value={{ cart, removeItem }} >

          <Navigation cart={cart} />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart cart={cart} />
            </Route>
          </main>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
