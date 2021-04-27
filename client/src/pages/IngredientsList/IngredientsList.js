import React, { useEffect, useState } from "react";
import { IngredientsListMock } from "../../mocks";
import { Spin } from "antd";
import "antd/dist/antd.css";
import "./IngredientsList.css";
import IngredientCard from "../../componets/IngredientCard/IngredientCard";

const IngredientsList = () => {
  const [loading, setLoading] = useState(true);
  const [ingredientsList, setIngredientsList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const list = await fetch("/api/ingredients");

        const jsonedList = await list.json();
        console.log(jsonedList);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIngredientsList(IngredientsListMock);
      } catch ({ message }) {
        console.log(message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="ingredients-list-container">
      {loading && <Spin size="large" spinning />}
      {ingredientsList.map(({ name, image, id }) => (
        <IngredientCard key={id} image={image} id={id} name={name} />
      ))}
    </div>
  );
};

export default IngredientsList;
