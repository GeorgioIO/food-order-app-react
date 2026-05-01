import { useEffect, useState } from "react";
import Meal from "./Meal";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function loadMeals() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/meals");
        const fetchedMeals = await response.json();

        if (!response.ok) {
          throw new Error("Failed to load meals.");
        }

        setMeals(fetchedMeals);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch meals" });
      }
      setIsFetching(false);
    }
    loadMeals();
  }, []);

  return (
    <>
      {isFetching && <p>Fetching meals...</p>}
      {!isFetching && error && <div className="error">{error.message}</div>}
      {!isFetching && !error && meals.length > 0 && (
        <ul id="meals">
          {meals.map((meal) => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </ul>
      )}
    </>
  );
}
