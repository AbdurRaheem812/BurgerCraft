import React from "react";

function OrderReceipt({ formattedIngredients, totalPrice, onConfirmPayment, onCancel }) {
  return (
    <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-4">
        
      <div className="bg-success text-white text-center py-4">
        <h3 className="mb-1 fw-bold">🧾 BurgerCraft Receipt</h3>
      </div>


      <div className="card-body p-4 bg-light">
        <div className="border-dashed-bottom pb-3 mb-3">
          <h5 className="fw-bold text-dark mb-3">Items Ordered:</h5>
          
          {formattedIngredients.map((item, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <span className="fw-bold text-dark">{item.name}</span>
                <span className="text-muted small d-block">
                  Rs. {item.price} × {item.quantity}
                </span>
              </div>
              <span className="fw-bold text-success fs-5">
                Rs. {item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>


        <div className="d-flex justify-content-between text-muted small mb-2">
          <span>Base Bun & Service Charge</span>
          <span>Rs. 150</span>
        </div>


        <div className="d-flex justify-content-between align-items-center border-top border-dark pt-3 mt-3">
          <span className="fs-5 fw-bold text-dark">Total Payable:</span>
          <span className="badge bg-success fs-4 px-3 py-2 rounded-pill shadow-sm">
            Rs. {totalPrice}
          </span>
        </div>
      </div>


      <div className="card-footer bg-white p-3 d-flex gap-2">
        <button className="btn btn-outline-secondary w-50 rounded-pill fw-bold" onClick={onCancel}>
          ← Go Back
        </button>
        <button className="btn btn-success w-50 rounded-pill fw-bold shadow-sm" onClick={onConfirmPayment}>
          Proceed to Pay 💳
        </button>
      </div>


      <style>{`
        .border-dashed-bottom {
          border-bottom: 2px dashed #ccc;
        }
      `}</style>
    </div>
  );
}

export default OrderReceipt;