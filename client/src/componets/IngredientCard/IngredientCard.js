import React from "react";
import { Card } from "antd";
import "./IngredientCard.css";
import { useHistory } from "react-router-dom";
const { Meta } = Card;

const IngredientCard = ({ image, name, id }) => {
  const history = useHistory();
  return (
    <Card
      onClick={() => history.push(`/ingredient/${id}`)}
      hoverable
      className="card"
      cover={<img alt={name} src={image} />}
    >
      <Meta description={name} />
    </Card>
  );
};

export default IngredientCard;
