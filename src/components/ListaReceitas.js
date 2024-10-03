import React from 'react';
import CardReceita from './CardReceita';
import '../styles/ListaReceitas.css'; // Importe os estilos CSS

const ListaReceitas = ({ receitas }) => {
  return (
    <div className="list-receita">
      <div className="flat-list-receita">
        {receitas.map((item) => (
          <CardReceita key={item.id} receita={item} />
        ))}
      </div>
    </div>
  );
};

export default ListaReceitas;
