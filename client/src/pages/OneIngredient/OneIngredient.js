import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CocktailCard from "../../componets/CocktailCard/CocktailCard";
import Container from "../../componets/Container";

const OneIngredient = () => {
  const [loading, setLoading] = useState(true);
  const [cocktails, setCocktails] = useState([]);

  const params = useParams();
  useEffect(() => {
    (async () => {
      try {
        const cocktailsData = await fetch(
          `/api/cocktails?ingredient=${params.id}`
        );
        const jsonedCocktails = await cocktailsData.json();
        setCocktails(jsonedCocktails);
      } catch ({ message }) {
        console.log(message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  console.log("object", params);

  return (
    <Container loading={loading}>
      {cocktails.map(({ name, image, id }) => (
        <CocktailCard name={name} image={image} id={id} key={id} />
      ))}
    </Container>
  );
};

export default OneIngredient;
