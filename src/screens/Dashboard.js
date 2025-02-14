import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import Button from "../components/Button.js";
import SignBtn from "../components/SignBtn.js";
import ListRecipes from "../components/ListRecipes.js";

const Dashboard = () => {
  return (
    <div className="container-dash">
      <h1 className="titulo-home">Pedidos</h1>
      <div className="botoesContainer">
        <SignBtn title="Lançar pedido"></SignBtn>
        <Button title="Marketing"></Button>
        <Button title="Cardápio"></Button>
      </div>

      <input
        type="text"
        placeholder="Pesquisar pedido..."
        className="input-dash"
      />

      <div className="container-cliente">
        <div className="header-cliente">
          <p className="titulo-container-cliente">Cliente</p>
        </div>
        <p>Tipo de pedido</p>
      </div>
    </div>
  );
};

export default Dashboard;
