import { use } from "react";
import { CartContext } from "../../store/cart-context";

export default function CartButton({ onOpenModal }) {
  const ctx = use(CartContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalCartItems + item.quantity;
  }, 0);

  return (
    <button className="button cursor-pointer" onClick={onOpenModal}>
      Cart ({totalCartItems})
    </button>
  );
}
