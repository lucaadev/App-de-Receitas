import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../Context/context';
import Header from '../Components/Header';
import { foodsApiMount, foodsApiCategory } from '../Services/ingredientsApi';

export default function Foods() {
  const { recipes } = useContext(Context);
  const [foodsMount, setFoodsMount] = useState();
  const [redirectId, setRedirectId] = useState(false);
  const [foodCategory, setFoodCategory] = useState('');

  function handleFoodCategory() {
    foodsApiCategory().then((dataCategory) => setFoodCategory(dataCategory.meals));
  }

  function handleFoods() {
    foodsApiMount().then((data) => setFoodsMount(data.meals));
  }

  function handleRedirect() {
    if (recipes && recipes.length === 1) {
      return setRedirectId(true);
    }
  }
  const TWELVE = 12;
  const FIVE = 5;
  useEffect(() => {
    handleFoods();
    handleFoodCategory();
  }, []);
  useEffect(() => {
    handleRedirect();
    if (recipes === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  });
  return (
    <div>
      <Header
        title="Foods"
      />
      { foodCategory && foodCategory.slice(0, FIVE).map(({ strCategory }) => (
        <button
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
        >
          { strCategory }
        </button>
      )) }
      { recipes && recipes.slice(0, TWELVE).map((recipe, index) => (
        <div
          width="100px"
          key={ recipe.idMeal }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            width="100px"
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>
            { recipe.strMeal }
          </p>
        </div>
      ))}
      { recipes === ''
        && foodsMount
        && foodsMount.slice(0, TWELVE).map((food, index) => (
          <div
            width="100px"
            key={ food.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              width="100px"
              src={ food.strMealThumb }
              alt={ food.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              { food.strMeal }
            </p>
          </div>
        ))}
      { redirectId && <Redirect to={ `/foods/${recipes[0].idMeal}` } /> }
    </div>
  );
}
