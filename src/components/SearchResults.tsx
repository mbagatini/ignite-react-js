import { useMemo } from "react";
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
  // memoize
  const totalPrice = useMemo(() => {
    const total = results.reduce((total, product) => {
      return total + product.price;
    }, 0);

    return Intl.NumberFormat("us-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(total);
  }, [results]);

  return (
    <>
      <div>
        Total: <strong>{totalPrice}</strong>
      </div>

      <div className={styles.grid}>
        {results.map((product: Product) => (
          <ProductItem key={product.id} data={product} />
        ))}
      </div>
    </>
  );
}
