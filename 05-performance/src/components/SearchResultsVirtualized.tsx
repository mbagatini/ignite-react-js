import { useMemo } from "react";
import { Grid, GridCellRenderer, ColumnSizer } from "react-virtualized";

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

  const columnCount = 3;

  // code that renders the items in the list
  const cellRenderer: GridCellRenderer = ({
    columnIndex,
    key,
    rowIndex,
    style,
  }) => {
    const index = columnCount * rowIndex + columnIndex;
    if (index > results.length - 1) return null;

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

      <ColumnSizer columnCount={columnCount} width={1032}>
        {({ adjustedWidth, getColumnWidth, registerChild }) => (
          <Grid
            ref={registerChild}
            width={adjustedWidth}
            height={600}
            columnWidth={getColumnWidth}
            columnCount={columnCount}
            rowCount={Math.ceil(results.length / columnCount)}
            rowHeight={160}
            overscanRowCount={3}
            cellRenderer={cellRenderer}
          ></Grid>
        )}
      </ColumnSizer>
    </>
  );
}
