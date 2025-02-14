import React from 'react';
import CardRecipe from './CardRecipe';
import '../styles/ListRecipes.css'; 

const ListRecipes = ({ recipes }) => {
  return (
    <div className="list-recipe">
      
        {recipes.map((item) => (
          <CardRecipe key={item.id} recipe={item} />
        ))}
     
    </div>
  );
};

export default ListRecipes;
