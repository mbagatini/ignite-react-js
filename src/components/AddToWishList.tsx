type Product = {
  id: number;
  name: string;
  price: number;
};

interface AddToWishListProps {
  product: Product;
  addToWishList: (productId: number) => void;
  onRequestClose: () => void;
}

export function AddToWishList({
  product,
  addToWishList,
  onRequestClose,
}: AddToWishListProps) {
  return (
    <div>
      <span>Add to wish list?</span>
      <button onClick={() => addToWishList(product.id)}>Yes</button>
      <button onClick={() => onRequestClose()}>No</button>
    </div>
  );
}
