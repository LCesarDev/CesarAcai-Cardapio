import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Checkout.css";

function Checkout() {

  const { cartItems, clearCart } = useContext(CartContext);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [pagamento, setPagamento] = useState("");

  // 🟢 CARREGAR DADOS SALVOS (1 vez)
  useEffect(() => {
  const clienteSalvo = localStorage.getItem("cliente_atual");

  if (clienteSalvo) {
    const dados = JSON.parse(clienteSalvo);

    setNome(dados.nome || "");
    setTelefone(dados.telefone || "");
    setEndereco(dados.endereco || "");
    setNumero(dados.numero || "");
    setComplemento(dados.complemento || "");
  }
}, []);

  // 🔵 SALVAR AUTOMATICAMENTE
  useEffect(() => {

  // só salva se tiver pelo menos nome ou telefone
  if (!nome && !telefone) return;

  const cliente = {
    nome,
    telefone,
    endereco,
    numero,
    complemento
  };

  localStorage.setItem("cliente_atual", JSON.stringify(cliente));

}, [nome, telefone, endereco, numero, complemento]);

  // 💰 TOTAL CORRETO
  const total = cartItems.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  // 📲 ENVIAR PEDIDO
  const enviarPedido = () => {

    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const itensPedido = cartItems
      .map(
        item =>
          `• ${item.nome} - ${item.tamanho}ml x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}`
      )
      .join("\n");

   const mensagem = "teste";

const url = `https://api.whatsapp.com/send?phone=${numeroLoja}&text=${encodeURIComponent(mensagem)}`;

window.location.href = url;

  };

  return (
    <div className="checkout-container">
      <h1>Finalizar Pedido</h1>

      <h2>Resumo do Pedido</h2>

     <div className="checkout-summary">

{cartItems.map((item, index) => (
  <div key={index} className="checkout-item">
          <p>
            {item.nome} - {item.tamanho}ml x{item.quantidade}
          </p>

          <p>
            R$ {(item.preco * item.quantidade).toFixed(2)}
          </p>
        </div>
      ))}

      </div>

      <h3>Total: R$ {total.toFixed(2)}</h3>

      <hr />

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Número"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Complemento"
        value={complemento}
        onChange={(e) => setComplemento(e.target.value)}
      />

      <br /><br />

      <h3>Forma de pagamento</h3>

      <label>
        <input
          type="radio"
          name="pagamento"
          value="Pix"
          onChange={(e) => setPagamento(e.target.value)}
        />
        Pix
      </label>

      <br />

      <label>
        <input
          type="radio"
          name="pagamento"
          value="Dinheiro"
          onChange={(e) => setPagamento(e.target.value)}
        />
        Dinheiro
      </label>

      <br />

      <label>
        <input
          type="radio"
          name="pagamento"
          value="Cartão"
          onChange={(e) => setPagamento(e.target.value)}
        />
        Cartão
      </label>

      <br /><br />

    <button
  className="checkout-button"
  onClick={enviarPedido}
>
  📲 Enviar Pedido no WhatsApp
</button>
    </div>
  );
}

export default Checkout;