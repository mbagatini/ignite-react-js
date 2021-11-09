import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  async function handleGetProductStock(productId: number) {
    const sotck = await api.get(`/stock/${productId}`);
    return sotck.data.amount;
  }

  const addProduct = async (productId: number) => {
    try {
      const newCart = [...cart];
      const productExists = newCart.find((p) => p.id === productId);

      const response = await api.get(`/products/${productId}`);
      const product: Product = response.data;

      if (!product) {
        throw new Error("Produto não encontrado");
      }

      // Estoque
      const stockAmount = await handleGetProductStock(productId);
      const currentAmount = productExists ? productExists.amount : 0;

      if (stockAmount < currentAmount + 1) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      if (productExists) {
        // Atualiza a quantidade do produto por referência ao array
        productExists.amount += 1;
      } else {
        newCart.push({ ...product, amount: 1 });
      }

      setCart(newCart);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(newCart));
    } catch {
      toast.error("Erro na adição do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const index = cart.findIndex((product) => product.id === productId);

      if (index === -1) {
        throw new Error("Produto não encontrado no carrinho");
      }

      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(newCart));
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) {
        return;
      }

      const newCart = [...cart];
      const productExists = newCart.find((product) => product.id === productId);

      if (!productExists) {
        throw new Error("Produto não encontrado no carrinho");
      }

      // Estoque
      const stockAmount = await handleGetProductStock(productId);

      if (stockAmount < amount) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      productExists.amount = amount;

      localStorage.setItem("@RocketShoes:cart", JSON.stringify(newCart));
      setCart(newCart);
    } catch {
      toast.error("Erro na alteração de quantidade do produto");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
