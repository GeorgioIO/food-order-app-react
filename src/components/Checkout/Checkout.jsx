import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import { use, useActionState } from "react";
import { CartContext } from "../../store/cart-context";
import { UserProgressContext } from "../../store/user-progress-context";
import {
  isValidEmail,
  isValidPostalCode,
  isEmpty,
} from "../../utils/validation";
import { calculateCartTotal } from "../../utils/utilities";
import { currencyFormatter } from "../../utils/formatting";

async function addOrder(order, showResult) {
  try {
    const response = await fetch(
      "https://food-order-app-react-g63r.onrender.com/orders",
      {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      return {
        success: false,
        message: response.message,
      };
    }

    return { success: true };
  } catch (error) {
    return { success: false, message: "Could not connect to server" };
  }
}

async function submitOrderAction(
  items,
  showResult,
  clearCart,
  prevState,
  formData,
) {
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const street = formData.get("street");
  const postalCode = formData.get("postalCode");
  const city = formData.get("city");

  let errors = {};

  if (isEmpty(fullName)) {
    errors.fullName = "Fullname is required.";
  }

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email.";
  }

  if (isEmpty(street)) {
    errors.street = "Street is required.";
  }

  if (!isValidPostalCode(postalCode)) {
    errors.postalCode = "Please enter a valid postal code.";
  }

  if (isEmpty(city)) {
    errors.city = "City is required";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      enteredValues: {
        fullName,
        email,
        street,
        postalCode,
        city,
      },
    };
  }

  // Submit to backend
  const orderIsSubmitted = await addOrder({
    order: {
      items,
      customer: { fullName, email, street, postalCode, city },
    },
  });

  if (orderIsSubmitted.success) {
    clearCart();
  }
  showResult(orderIsSubmitted.success);

  return { errors: null };
}

export default function Checkout() {
  const { items, clearCart } = use(CartContext);
  const { progress, hideCheckout, showResult } = use(UserProgressContext);

  const boundSubmitAction = submitOrderAction.bind(
    null,
    items,
    showResult,
    clearCart,
  );

  const [formState, formAction, submitPending] = useActionState(
    boundSubmitAction,
    {
      errors: null,
    },
  );

  const cartTotal = calculateCartTotal(items);

  function handleCloseCheckout() {
    hideCheckout();
  }

  return (
    <Modal open={progress === "checkout"}>
      <h2 className="modal-title">Checkout</h2>
      <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

      <form action={formAction}>
        <Input
          label="Full Name"
          id="fullName"
          name="fullName"
          type="text"
          placeholder="John Doe"
          error={formState.errors?.fullName}
          defaultValue={formState.enteredValues?.fullName}
        />

        <Input
          label="E-Mail Address"
          id="email"
          name="email"
          type="email"
          placeholder="test@gmail.com"
          error={formState.errors?.email}
          defaultValue={formState.enteredValues?.email}
        />

        <Input
          label="Street"
          id="street"
          type="text"
          name="street"
          error={formState.errors?.street}
          defaultValue={formState.enteredValues?.street}
        />

        <div className="control-row">
          <Input
            label="Postal Code"
            id="postal"
            type="text"
            name="postalCode"
            error={formState.errors?.postalCode}
            defaultValue={formState.enteredValues?.postalCode}
          />
          <Input
            label="City"
            id="city"
            type="text"
            name="city"
            error={formState.errors?.city}
            defaultValue={formState.enteredValues?.city}
          />
        </div>
        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button className="button" disabled={submitPending}>
            {submitPending ? "Submitting..." : "Submit Order"}
          </Button>
        </p>
      </form>
    </Modal>
  );
}
