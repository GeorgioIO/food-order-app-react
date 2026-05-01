import { useState, use } from "react";
import logoImg from "../assets/logo.jpg";
import CartButton from "./Cart/CartButton";
import CartModal from "./Cart/Cart";
import { UserProgressContext } from "../store/user-progress-context";

export default function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userProgressCtx = use(UserProgressContext);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Hamburger on a plate" />
        <h1>REACTFOOD</h1>
      </div>
      <CartButton onOpenModal={handleShowCart} />
    </header>
  );
}
