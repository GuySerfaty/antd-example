import React from "react";
import { useParams } from "react-router-dom";
const OneIngredient = () => {
  const params = useParams();

  console.log("object", params);

  return <div></div>;
};

export default OneIngredient;
