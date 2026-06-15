import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

function Checkout() {

  const { cartItems } = useContext(CartContext);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [pagamento, setPagamento] = useState("");

  // ✔ Carregar cliente salvo
  useEffect(() => {
    const clienteSalvo = localStorage.getItem("cliente");

    if (clienteSalvo) {
      const dados = JSON.parse(clienteSalvo);

      setNome(dados.nome || "");
      setTelefone(dados.telefone || "");
      setEndereco(dados.endereco || "");
      setNumero(dados.numero || "");
      setComplemento(dados.complemento || "");
    }
  }, []);

  // ✔ Salvar automaticamente enquanto digita
  useEffect(() => {
    localStorage.setItem(
      "cliente",
      JSON.stringify({
        nome,
        telefone,
        endereco,
        numero,
        complemento
      })
    );
  }, [nome, telefone, endereco, numero, complemento]);

  // ✔ Total do carrinho
 const total = cartItems.reduce(
  (acc, item) => acc + item.preco * item.quantidade,
  0
);

  // ✔ Enviar pedido WhatsApp
  const enviarPedido = () => {

    const itensPedido = cartItems
      .map(
        item =>
          `• ${item.nome} - ${item.tamanho}ml - R$ ${item.preco.toFixed(2)}`
      )
      .join("\n");

    const mensagem = `
🍧 Pedido César Açaí

${itensPedido}

💰 Total: R$ ${total.toFixed(2)}

👤 Cliente: ${nome}
📞 Telefone: ${telefone}

📍 Endereço:
${endereco}, ${numero}

🏠 Complemento:
${complemento}

💳 Pagamento:
${pagamento}
`;

    const numeroLoja = "5531985082137";

    const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
  };

  return (
    <div>
      <h1>Finalizar Pedido</h1>

      <h2>Resumo do Pedido</h2>

      {cartItems.map((item, index) => (
        <div key={index}>
          <p>
            {item.nome} - {item.tamanho}ml
          </p>

          <p>R$ {item.preco.toFixed(2)}</p>
        </div>
      ))}

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

      <button onClick={enviarPedido}>
        Enviar Pedido
      </button>
    </div>
  );
}

export default Checkout;