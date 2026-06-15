import { useState, useContext } from "react";
import { Link } from "react-router-dom";


import { produtos } from "../data/Produtos";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { CartContext } from "../context/CartContext";
import Header from "../components/Header";


import "../styles/Home.css";

function Home() {

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const { cartItems } = useContext(CartContext);

  return (
    

    <div className="home">

       <Header />

      {produtos.map(produto => (
        <ProductCard
          key={produto.id}
          produto={produto}
          onEscolher={() => setProdutoSelecionado(produto)}
        />
      ))}

      {
        produtoSelecionado && (
          <ProductModal
            produto={produtoSelecionado}
            onClose={() => setProdutoSelecionado(null)}
          />
        )
      }

    </div>
  );
}

export default Home;