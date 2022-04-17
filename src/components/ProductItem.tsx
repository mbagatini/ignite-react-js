import styles from "../styles/Home.module.css";

type Product = {
  id: number;
  name: string;
  price: number;
};

interface ProductItemProps {
  data: Product;
}

export function ProductItem({ data: product }: ProductItemProps) {
  return (
    <div key={product.id} className={styles.card}>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
}
