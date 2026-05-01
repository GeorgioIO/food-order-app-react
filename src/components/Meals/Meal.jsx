import { use } from "react";
import { CartContext } from "../../store/cart-context";
import Button from "../Button";

export default function Meal({ meal }) {
  const { addToCart } = use(CartContext);

  const { id, name, price, description, image } = meal;

  return (
    <li className="meal-item">
      <article>
        <img
          src={`https://food-order-app-react-g63r.onrender.com/${image}`}
          alt={description}
        />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">${price}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button
            className="button"
            onClick={() => {
              addToCart({ id, name, price });
            }}
          >
            Add to Cart
          </Button>
        </p>
      </article>
    </li>
  );
}
