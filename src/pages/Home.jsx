import { useState } from "react";
import { produtos } from "../data/Produtos";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import Header from "../components/Header";
import "../styles/Home.css";

function Home() {

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  

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

      {produtoSelecionado && (
        <ProductModal
          produto={produtoSelecionado}
          onClose={() => setProdutoSelecionado(null)}
        />
      )}

    </div>
  );
}

export default Home;