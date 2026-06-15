import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Header.css";

function Header() {

  const { cartItems } = useContext(CartContext);

  return (
    <header className="header">
      <h2>César Açaí</h2>

      <Link
        to="/carrinho"
        className="cart-button"
      >
        🛒 {cartItems.length}
      </Link>
    </header>
  );
}

export default Header;