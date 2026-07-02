import bcrypt from "bcrypt";

export const hashCardNumberMiddleware = async (req, res, next) => {
  if (!req.body || !req.body.cardNumber) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    if (req.body.cardNumber) {
      req.body.cardNumber = await bcrypt.hash(req.body.cardNumber, salt);
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Encryption error during data processing" });
  }
};

