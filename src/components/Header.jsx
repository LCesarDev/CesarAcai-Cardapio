import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Header.css";
import logo from "../assets/logo.png";

function Header() {

  const { cartItems } = useContext(CartContext);

  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const clienteSalvo = localStorage.getItem("cliente_atual");

    if (clienteSalvo) {
      setCliente(JSON.parse(clienteSalvo));
    }
  }, []);

  return (
    <header className="header">

      <div className="logo-area">
  <img
    src={logo}
    alt="César Açaí"
    className="logo"
  />

  <h2>César Açaí</h2>
</div>

      <div className="header-right">

        <div className="user-box">
          {
  cliente
    ? cliente.nome
        .trim()
        .split(" ")
        .slice(0, 2)
        .join(" ")
    : "Visitante"
}
        </div>

        <Link
          to="/carrinho"
          className="cart-button"
        >
          🛒 {cartItems.length}
        </Link>

      </div>

    </header>
  );
}

export default Header;