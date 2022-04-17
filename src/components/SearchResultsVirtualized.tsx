import { useMemo } from "react";
import { List, AutoSizer, ListRowRenderer } from "react-virtualized";

import styles from "../styles/Home.module.css";
import { ProductItem } from "./ProductItem";

type Product = {
  id: number;
  name: string;
  price: number;
  priceFormatted: string;
};

interface SearchResultsProps {
  results: Product[];
}

export function SearchResultsVirtualized({ results }: SearchResultsProps) {
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

  // code that renders the items in the list
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    const product = results[index];

    return (
      <div key={key} style={style}>
        <ProductItem data={product} />
      </div>
    );
  };

  return (
    <>
      <div>
        Total: <strong>{totalPrice}</strong>
      </div>

      <div className={styles.grid}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowCount={results.length}
              rowHeight={20}
              overscanRowCount={3}
              rowRenderer={rowRenderer}
            ></List>
          )}
        </AutoSizer>
      </div>
    </>
  );
}
