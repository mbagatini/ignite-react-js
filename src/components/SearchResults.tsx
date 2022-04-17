import styles from "../styles/Home.module.css";
import { ProductItem } from "./ProductItem";

type Product = {
  id: number;
  name: string;
  price: number;
};

interface SearchResultsProps {
  results: Product[];
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className={styles.grid}>
      {results.map((product: Product) => (
        <ProductItem key={product.id} data={product} />
      ))}
    </div>
  );
}
