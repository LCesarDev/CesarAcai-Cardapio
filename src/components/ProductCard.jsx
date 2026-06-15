import "../styles/ProductCard.css";

function ProductCard({ produto, onEscolher }) {
  return (
    <div className="product-card">

      <h2>{produto.nome}</h2>

      <p className="description">
        {produto.descricao}
      </p>

      <p className="price">
        A partir de R$ {produto.tamanhos[0].preco.toFixed(2)}
      </p>

      <button onClick={onEscolher}>
        Escolher
      </button>

    </div>
  );
}

export default ProductCard;