import { memo, useState } from "react";
import dynamic from "next/dynamic";

import styles from "../styles/Home.module.css";
import { AddToWishListProps } from "./AddToWishList";

// Lazy load
const AddToWishList = dynamic<AddToWishListProps>(
  () => import("./AddToWishList").then((mod) => mod.AddToWishList),
  { loading: () => <div>Loading...</div> }
);

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
  const [isWishList, setIsWishList] = useState(false);

  function addToWishList(id: number) {
    console.log(`Added to wish list: ${id}`);
    onRequestClose();
  }

  function onRequestClose() {
    setIsWishList(false);
  }

  return (
    <div className={styles.card}>
      <h3>{product.name}</h3>
      <small>{product.priceFormatted}</small>
      <button onClick={() => setIsWishList(true)}>Wish it!</button>

      {isWishList && (
        <AddToWishList
          product={product}
          onRequestClose={onRequestClose}
          addToWishList={addToWishList}
        />
      )}
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
