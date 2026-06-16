import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Carrinho.css";

function Carrinho() {

  const {
    cartItems,
    removeFromCart,
    changeQuantity,
    clearCart
  } = useContext(CartContext);

  const total = cartItems.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <div>
       
        <img
          src={logo}
          alt="César Açaí"
          className="logoCarrinho"
        />

      <h1 className="Titulo">Carrinho</h1>
      

      {cartItems.map((item, index) => (
  <div key={index} className="cart-item">

    <div className="cart-info">
      <h3>{item.nome}</h3>

      <p>{item.tamanho}ml</p>

      <p>R$ {item.preco.toFixed(2)}</p>

      <p>
        Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
      </p>
    </div>

    <div className="cart-actions">

      <button
        onClick={() =>
          changeQuantity(item.produtoId, item.tamanho, -1)
        }
      >
        -
      </button>

      <span>{item.quantidade}</span>

      <button
        onClick={() =>
          changeQuantity(item.produtoId, item.tamanho, +1)
        }
      >
        +
      </button>

      <button
        onClick={() =>
          removeFromCart(item.produtoId, item.tamanho)
        }
      >
        🗑️
      </button>

    </div>

  </div>
))}
     <div className="cart-summary">

  <h3>Total do pedido</h3>

  <h2>R$ {total.toFixed(2)}</h2>

  <Link to="/checkout">
    <button
      className="checkout-btn"
      disabled={cartItems.length === 0}
    >
      🛒 Finalizar Pedido
    </button>
  </Link>

</div>

<Link to="/">
  <button className="continue-btn">
    ⬅ Continuar comprando
  </button>
</Link>

<button
  className="clear-btn"
  onClick={clearCart}
>
  🗑️ Limpar carrinho
</button>

    </div>
  );
}

export default Carrinho;