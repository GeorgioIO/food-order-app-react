import { CartContextProvider } from "./store/cart-context";
import Header from "./components/Header";
import Meals from "./components/Meals/Meals";
import UserProgressContextProvider from "./store/user-progress-context";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import CheckoutResult from "./components/Checkout/CheckoutResult";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
        <CheckoutResult />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
