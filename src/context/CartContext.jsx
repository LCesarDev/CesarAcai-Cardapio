import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 💾 salvar sempre que mudar o carrinho
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✔ ADICIONAR ITEM
  function addToCart(item) {

    setCartItems(prev => {

      const existente = prev.find(
        p =>
          p.produtoId === item.produtoId &&
          p.tamanho === item.tamanho
      );

      if (existente) {
        return prev.map(p =>
          p.produtoId === item.produtoId &&
          p.tamanho === item.tamanho
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        );
      }

      return [
        ...prev,
        { ...item, quantidade: 1 }
      ];
    });
  }

  // ✔ REMOVER ITEM
  function removeFromCart(produtoId, tamanho) {
    setCartItems(prev =>
      prev.filter(
        item =>
          !(item.produtoId === produtoId && item.tamanho === tamanho)
      )
    );
  }

  // ✔ ALTERAR QUANTIDADE
  function changeQuantity(produtoId, tamanho, delta) {
    setCartItems(prev =>
      prev.map(item => {

        if (
          item.produtoId === produtoId &&
          item.tamanho === tamanho
        ) {

          const novaQtd = item.quantidade + delta;

          if (novaQtd <= 0) return null;

          return {
            ...item,
            quantidade: novaQtd
          };
        }

        return item;
      }).filter(Boolean)
    );
  }

  // ✔ LIMPAR CARRINHO
  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}