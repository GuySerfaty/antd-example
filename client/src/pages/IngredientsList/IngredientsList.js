import React, { useEffect, useState } from "react";
import IngredientCard from "../../componets/IngredientCard/IngredientCard";
import Container from "../../componets/Container";

const IngredientsList = () => {
  const [loading, setLoading] = useState(true);
  const [ingredientsList, setIngredientsList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const list = await fetch("/api/ingredients");
        const jsonedList = await list.json();
        setIngredientsList(jsonedList);
      } catch ({ message }) {
        console.log(message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container loading={loading}>
      {ingredientsList.map(({ name, image, id }) => (
        <IngredientCard key={id} image={image} id={id} name={name} />
      ))}
    </Container>
  );
};

export default IngredientsList;
