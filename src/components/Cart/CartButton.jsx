import { use } from "react";
import { CartContext } from "../../store/cart-context";

export default function CartButton({ onOpenModal }) {
  const ctx = use(CartContext);

  return (
    <button className="button cursor-pointer" onClick={onOpenModal}>
      Cart {ctx.items.length > 0 && <span>({ctx.items.length})</span>}
    </button>
  );
}
