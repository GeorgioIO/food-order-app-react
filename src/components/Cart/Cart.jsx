import { createPortal } from "react-dom";
import { useEffect, useRef, use } from "react";
import Modal from "../Modal";
import { CartContext } from "../../store/cart-context";
import { currencyFormatter } from "../../utils/formatting";
import { UserProgressContext } from "../../store/user-progress-context";
import CartItem from "./CartItem";
import Button from "../Button";
import { calculateCartTotal } from "../../utils/utilities";

export default function Cart() {
  const { items } = use(CartContext);
  const userProgressCtx = use(UserProgressContext);
  let cartIsEmpty = items.length === 0;

  const cartTotal = calculateCartTotal(items);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleShowCheckout() {
    userProgressCtx.showCheckout();
  }

  let content = <p>You cart is currently empty.</p>;

  if (!cartIsEmpty) {
    content = (
      <>
        <ul>
          {" "}
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}{" "}
        </ul>{" "}
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      </>
    );
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      {content}
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button
          className={`button ${cartIsEmpty ? "unclickable" : ""}`}
          onClick={handleShowCheckout}
          disabled={cartIsEmpty}
        >
          Go to Checkout
        </Button>
      </p>
    </Modal>
  );
}
