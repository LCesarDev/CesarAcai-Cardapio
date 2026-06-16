
import "../styles/ProductModal.css";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function ProductModal({ produto, onClose }) {

  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const { addToCart } = useContext(CartContext);

  return (
    <div className="modal-overlay">

      <div className="modal-content">

        <h2>{produto.nome}</h2>

        <p className="desc">{produto.descricao}</p>
        <div className="product-preview">
  🍧
</div>

        <div className="sizes">
          {produto.tamanhos.map(tamanho => (
            <label key={tamanho.ml} className="size-option">

              <input
                type="radio"
                name="tamanho"
                onChange={() => setTamanhoSelecionado(tamanho)}
              />

              <span>
                {tamanho.ml}ml - R$ {tamanho.preco.toFixed(2)}
              </span>

            </label>
          ))}
        </div>

        <p className="selected">
          {tamanhoSelecionado
            ? `Selecionado: ${tamanhoSelecionado.ml}ml`
            : "Selecione um tamanho"}
        </p>

       <button
  className="add-btn"
  onClick={() => {

    if (!tamanhoSelecionado) {
      alert("Selecione um tamanho");
      return;
    }

   addToCart({
    produtoId: produto.id,
    nome: produto.nome,
    tamanho: tamanhoSelecionado.ml,
    preco: tamanhoSelecionado.preco
  });

    onClose();
  }}
>
  Adicionar ao Carrinho
</button>

      </div>

    </div>
  );
}

export default ProductModal;