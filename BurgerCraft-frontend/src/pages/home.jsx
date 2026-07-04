import { useState } from "react";
import "../styles/home.css";
import BurgerOrderForm from "../components/burgerOrderForm.jsx";
import BurgerVisualizer from "../components/burgerVisualizer.jsx";
import BurgerControls from "../components/burgerControls.jsx";
import OrderReceipt from "../components/orderReceipt.jsx"; 

const BASE_PRICE = 150;

function Home({ token }) { 
  const [ingredients, setIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);
  
  
  const [step, setStep] = useState("controls"); 
  const [formattedIngredients, setFormattedIngredients] = useState([]);

  const resetOrder = () => {
    setIngredients([]);
    setTotalPrice(BASE_PRICE);
    setStep("controls");
  };

  
  const handleShowReceipt = (data) => {
    setFormattedIngredients(data);
    setStep("receipt");
  };

  return (
    <div className="container-fluid py-5 min-vh-100 bg-light d-flex flex-column justify-content-center">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-dark m-0">🍔 BurgerCraft Studio 🍔</h1>
      </div>

      <div className="row justify-content-center align-items-start g-5 px-md-5">
        
        
        <BurgerVisualizer ingredients={ingredients} />


        <div className="col-lg-5 col-md-10">
          <div
            className="card shadow-sm p-4 bg-white"
            style={{
              width: "100%",
              maxWidth: "450px",
              borderRadius: "24px",
              position: "sticky",
              top: "40px",
              zIndex: 100,
            }}
          >
            
            {step === "controls" && (
              <BurgerControls
                ingredients={ingredients}
                setIngredients={setIngredients}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                onShowForm={handleShowReceipt}
              />
            )}


            {step === "receipt" && (
              <OrderReceipt
                formattedIngredients={formattedIngredients}
                totalPrice={totalPrice}
                onCancel={() => setStep("controls")}
                onConfirmPayment={() => setStep("checkout")}
              />
            )}


            {step === "checkout" && (
              <BurgerOrderForm
                formattedIngredients={formattedIngredients} 
                totalPrice={totalPrice}
                userToken={token}
                onClose={() => setStep("receipt")} 
                onSuccess={resetOrder}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;