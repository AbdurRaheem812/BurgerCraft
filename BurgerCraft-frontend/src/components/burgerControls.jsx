import React from "react";

const INGREDIENT_PRICES = {
  patty: { name: "Patty", price: 200 },
  cheeseSlice: { name: "Cheese Slice", price: 150 },
  latice: { name: "Latice", price: 50 },
  jalapenos: { name: "Jalapenos", price: 300 },
};

function BurgerControls({ ingredients, setIngredients, totalPrice, setTotalPrice, onShowForm }) {
  
  const handleAddIngredient = (type) => {
    const cost = INGREDIENT_PRICES[type].price;
    setTotalPrice((prevPrice) => prevPrice + cost);
    setIngredients((prevIngredients) => [...prevIngredients, type]);
  };

  const handleRemoveIngredient = (type) => {
    if (!ingredients.includes(type)) return;

    const cost = INGREDIENT_PRICES[type].price;
    setIngredients((prevIngredients) => {
      const updated = [...prevIngredients];
      const lastIndex = updated.lastIndexOf(type);
      updated.splice(lastIndex, 1);
      return updated;
    });
    setTotalPrice((prevPrice) => prevPrice - cost);
  };

  const handleCheckoutSubmission = () => {
    const formattedIngredients = Object.keys(INGREDIENT_PRICES)
    .map( (type) => {
      const count = ingredients.filter((item) => item === type).length;
      return {
        name: INGREDIENT_PRICES[type].name,
        quantity: count,
        price: INGREDIENT_PRICES[type].price,
      };
    
    })
    .filter((item) => item.quantity > 0);
    onShowForm(formattedIngredients);
  }
  return (
    <>
      <h3 className="h5 text-muted fw-bold border-bottom pb-3 mb-4 text-center">
        Customize Your Burger
      </h3>

      {Object.entries(INGREDIENT_PRICES).map(([type, config]) => {
        const count = ingredients.filter((item) => item === type).length;

        return (
          <div key={type} className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded-4 bg-light shadow-sm">
            <div>
              <strong className="d-block text-dark fs-5">{config.name}</strong>
              <span className="text-success fw-bold">Rs. {config.price}</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-danger rounded-circle fw-bold d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: "36px", height: "36px", fontSize: "18px" }}
                onClick={() => handleRemoveIngredient(type)}
                disabled={count === 0}
              >
                -
              </button>
              <span className="fw-bold fs-5 text-dark" style={{ minWidth: "20px", textAlign: "center" }}>
                {count}
              </span>
              <button
                className="btn btn-success rounded-circle fw-bold d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: "36px", height: "36px", fontSize: "18px" }}
                onClick={() => handleAddIngredient(type)}
              >
                +
              </button>
            </div>
          </div>
        );
      })}

      <div className="text-center border-top pt-3 mt-2">
        <div className="badge bg-success fs-3 px-4 py-2 shadow-sm rounded-pill w-100">
          Total Price: Rs. {totalPrice}
        </div>
      </div>

      <div className="text-center border-top pt-3 mt-3">
        <button
          className="btn btn-success btn-lg px-4 py-2 shadow-sm rounded-pill w-100 fw-bold"
          onClick={handleCheckoutSubmission}
          disabled={ingredients.length === 0}
        >
          Place Your Order 🚀
        </button>
      </div>
    </>
  );
}

export default BurgerControls;