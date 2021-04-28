import React, { useEffect, useState } from "react";
import IngredientCard from "../../componets/IngredientCard/IngredientCard";
import Container from "../../componets/Container";

const Footer = () => (
  <div style={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center' }}>
    <h2>THIS IS THE BEST FOOTER IN 2020</h2>
  </div>
)

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
    <>
      <Container loading={loading}>
        {ingredientsList.map(({ name, image, id }) => (
          <IngredientCard key={id} image={image} id={id} name={name} />
        ))}
      </Container>
      <Footer />
    </>
  );
};

export default IngredientsList;
