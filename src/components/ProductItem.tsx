import { memo } from "react";

import styles from "../styles/Home.module.css";

type Product = {
  id: number;
  name: string;
  price: number;
  priceFormatted: string;
};

interface ProductItemProps {
  data: Product;
}

function ProductItemComponent({ data: product }: ProductItemProps) {
  return (
    <div className={styles.card}>
      <h3>{product.name}</h3>
      <small>{product.priceFormatted}</small>
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  // Function to check if the props have changed - rerender
  (prevProps, nextProps) => {
    return Object.is(prevProps.data, nextProps.data);
  }
);
