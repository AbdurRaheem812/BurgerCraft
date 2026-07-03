import Card from "../models/Card.js";

export const saveCard = async (cardData) => {
  const card = new Card(cardData);
  return await card.save();
};