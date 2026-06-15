import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
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

      <h1>Carrinho</h1>

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
      <h2>Total: R$ {total.toFixed(2)}</h2>

      <Link to="/checkout">
        <button>Finalizar Pedido</button>
      </Link>

      <button
  onClick={clearCart}
  style={{
    marginTop: "10px",
    background: "#ff4d4d",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px"
  }}
>
  Limpar carrinho
</button>

    </div>
  );
}

export default Carrinho;