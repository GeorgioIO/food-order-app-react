import { currencyFormatter } from "../../utils/formatting";
import { use } from "react";
import { CartContext } from "../../store/cart-context";

export default function CartItem({ item }) {
  const { editCart } = use(CartContext);

  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => editCart(item.id, -1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => editCart(item.id, +1)}>+</button>
      </p>
    </li>
  );
}
