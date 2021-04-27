import React from "react";
import { Card } from "antd";
import "./CocktailCard.css";
import { useHistory } from "react-router-dom";
const { Meta } = Card;

const CocktailCard = ({ image, name }) => {
  return (
    <Card
      hoverable
      className="cocktail-card"
      cover={<img alt={name} src={image} />}
    >
      <Meta description={name} />
    </Card>
  );
};

export default CocktailCard;
