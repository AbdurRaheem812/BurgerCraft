import { saveCard, getCardsByUserId, deleteCardById } from "../services/cardServices.js";

export const addCardController = async (req, res) => {
  try {
    const cardData = {
      ...req.body,
      userId: req.user.id, 
    };
    
    const card = await saveCard(cardData);
    res.status(201).json({ message: "Card saved successfully!", cardId: card._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};