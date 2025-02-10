import React from 'react';
import CardRecipe from './CardRecipe';
import '../styles/ListaReceitas.css'; 

const ListRecipes = ({ receitas }) => {
  return (
    <div className="list-receita">
      
        {receitas.map((item) => (
          <CardRecipe key={item.id} receita={item} />
        ))}
     
    </div>
  );
};

export default ListRecipes;
