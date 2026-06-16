import "../styles/ProductCard.css";

function ProductCard({ produto, onEscolher }) {
  return (
    <div className="product-card">

      <div className="product-icon">
        🍧
      </div>

      <h2>{produto.nome}</h2>

      <p className="description">
        {produto.descricao}
      </p>

      <div className="sizes">
        <span>300ml • R$ {produto.tamanhos[0].preco.toFixed(2)}</span>

        <span>500ml • R$ {produto.tamanhos[1].preco.toFixed(2)}</span>
      </div>

      <button onClick={onEscolher}>
        Escolher
      </button>

    </div>
  );
}

export default ProductCard;