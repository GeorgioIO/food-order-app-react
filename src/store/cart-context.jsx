import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addToCart: (meal) => {},
  editCart: (id, qty) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // TODO : ADD TO CART

    const updatedCart = [...state.items];

    const existingCartItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === action.payload.id,
    );

    const existingCartItem = updatedCart[existingCartItemIndex];

    // Item in cart
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedCart[existingCartItemIndex] = updatedItem;
    } else {
      updatedCart.push({
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        quantity: 1,
      });
    }

    return { items: updatedCart };
  }

  if (action.type === "UPDATE_ITEM") {
    // TODO: Update item

    let updatedCart = [...state.items];

    const existingCartItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === action.payload.id,
    );

    const existingCartItem = updatedCart[existingCartItemIndex];

    const newQuantity = existingCartItem.quantity + action.payload.qty;

    if (newQuantity === 0) {
      updatedCart = updatedCart.filter((item) => item.id !== action.payload.id);
    } else {
      updatedCart[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: newQuantity,
      };
    }

    return { items: updatedCart };
  }

  if (action.type === "CLEAR_CART") {
    return { items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  function handleAddItemToCart(meal) {
    dispatchCartAction({ type: "ADD_ITEM", payload: { ...meal } });
  }

  // function handleDeleteItemFromCart(id) {
  //   dispatchCartAction({ type: "DELETE_ITEM", payload: id });
  // }

  function handleUpdateCartItem(id, qty) {
    dispatchCartAction({ type: "UPDATE_ITEM", payload: { id, qty } });
  }

  function handleClearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const ctxValue = {
    items: cartState.items,
    addToCart: handleAddItemToCart,
    editCart: handleUpdateCartItem,
    clearCart: handleClearCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
