import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const FIRE_API_URL = process.env.REACT_APP_FIRE_URL;

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMeals = async () => {
    setIsLoading(true);
    const request = await fetch(`${FIRE_API_URL}/meals.json`, {});

    if (!request.ok) {
      throw new Error('Error fetching the data');
    }

    const data = await request.json();
    const parsedData = [];

    for (const key in data) {
      parsedData.push({
        id: key,
        ...data[key],
      });
    }

    setMeals(parsedData);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      fetchMeals();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }, []);

  if (isLoading) {
    return (
      <section>
        <Card>Loading...</Card>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <Card>{error}</Card>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        {meals.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ))}
      </Card>
    </section>
  );
};

export default AvailableMeals;
